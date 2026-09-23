import {SignJWT,createRemoteJWKSet,jwtVerify,importPKCS8} from 'jose';

// --- Required environment variables (set in .env.local, never commit) ---
// APPLE_CLIENT_ID     Services ID, e.g. "com.floaliving.web"
// APPLE_TEAM_ID       10-character Apple Developer Team ID
// APPLE_KEY_ID        10-character Key ID for the "Sign in with Apple" private key
// APPLE_PRIVATE_KEY   Contents of the downloaded AuthKey_XXXXXXXXXX.p8 file
// APPLE_REDIRECT_URI  Must exactly match a "Return URL" registered on the Services ID,
//                     e.g. "https://yourdomain.com/api/auth/apple/callback"

const AUTHORIZE_URL='https://appleid.apple.com/auth/authorize';
const TOKEN_URL='https://appleid.apple.com/auth/token';
const JWKS=createRemoteJWKSet(new URL('https://appleid.apple.com/auth/keys'));

function env(name:string):string{
 const v=process.env[name];
 if(!v)throw new Error(`Missing required env var: ${name}`);
 return v;
}

export function appleAuthorizeUrl(state:string):string{
 const params=new URLSearchParams({
  client_id:env('APPLE_CLIENT_ID'),
  redirect_uri:env('APPLE_REDIRECT_URI'),
  response_type:'code',
  scope:'name email',
  response_mode:'form_post', // required by Apple whenever scopes are requested
  state,
 });
 return `${AUTHORIZE_URL}?${params.toString()}`;
}

// Apple requires the client secret to be a short-lived JWT signed with your
// "Sign in with Apple" private key (ES256), not a static string.
async function createClientSecret():Promise<string>{
 const key=await importPKCS8(env('APPLE_PRIVATE_KEY'),'ES256');
 return new SignJWT({})
  .setProtectedHeader({alg:'ES256',kid:env('APPLE_KEY_ID')})
  .setIssuer(env('APPLE_TEAM_ID'))
  .setIssuedAt()
  .setExpirationTime('5m')
  .setAudience('https://appleid.apple.com')
  .setSubject(env('APPLE_CLIENT_ID'))
  .sign(key);
}

export type AppleIdentity={sub:string;email?:string;emailVerified?:boolean};

// Exchanges the one-time `code` Apple posted back for an id_token, then
// verifies its signature against Apple's public keys and returns the
// caller's stable Apple user id (`sub`) and email.
export async function exchangeAppleCode(code:string):Promise<AppleIdentity>{
 const clientSecret=await createClientSecret();
 const res=await fetch(TOKEN_URL,{
  method:'POST',
  headers:{'Content-Type':'application/x-www-form-urlencoded'},
  body:new URLSearchParams({
   client_id:env('APPLE_CLIENT_ID'),
   client_secret:clientSecret,
   code,
   grant_type:'authorization_code',
   redirect_uri:env('APPLE_REDIRECT_URI'),
  }),
 });
 if(!res.ok)throw new Error(`Apple token exchange failed: ${res.status} ${await res.text()}`);
 const {id_token}=await res.json() as {id_token:string};

 const {payload}=await jwtVerify(id_token,JWKS,{issuer:'https://appleid.apple.com',audience:env('APPLE_CLIENT_ID')});
 return {
  sub:payload.sub!,
  email:typeof payload.email==='string'?payload.email:undefined,
  emailVerified:payload.email_verified==='true'||payload.email_verified===true,
 };
}
