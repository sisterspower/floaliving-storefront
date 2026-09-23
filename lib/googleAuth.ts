import {createRemoteJWKSet,jwtVerify} from 'jose';

// --- Required environment variables (set in .env.local, never commit) ---
// GOOGLE_CLIENT_ID       OAuth 2.0 Client ID from Google Cloud Console
// GOOGLE_CLIENT_SECRET   OAuth 2.0 Client secret for the same client
// GOOGLE_REDIRECT_URI    Must exactly match an "Authorized redirect URI" on that
//                        client, e.g. "http://localhost:3000/api/auth/google/callback"
//                        (Google allows http://localhost for local testing — unlike
//                        Apple it does not require a live HTTPS domain to develop against)

const AUTHORIZE_URL='https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_URL='https://oauth2.googleapis.com/token';
const JWKS=createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));

function env(name:string):string{
 const v=process.env[name];
 if(!v)throw new Error(`Missing required env var: ${name}`);
 return v;
}

export function googleAuthorizeUrl(state:string):string{
 const params=new URLSearchParams({
  client_id:env('GOOGLE_CLIENT_ID'),
  redirect_uri:env('GOOGLE_REDIRECT_URI'),
  response_type:'code',
  scope:'openid email profile',
  state,
 });
 return `${AUTHORIZE_URL}?${params.toString()}`;
}

export type GoogleIdentity={sub:string;email?:string;emailVerified?:boolean;name?:string};

// Exchanges the one-time `code` Google redirected back with for an id_token,
// verifies its signature against Google's public keys, and returns the
// caller's stable Google user id (`sub`), email and display name.
export async function exchangeGoogleCode(code:string):Promise<GoogleIdentity>{
 const res=await fetch(TOKEN_URL,{
  method:'POST',
  headers:{'Content-Type':'application/x-www-form-urlencoded'},
  body:new URLSearchParams({
   client_id:env('GOOGLE_CLIENT_ID'),
   client_secret:env('GOOGLE_CLIENT_SECRET'),
   code,
   grant_type:'authorization_code',
   redirect_uri:env('GOOGLE_REDIRECT_URI'),
  }),
 });
 if(!res.ok)throw new Error(`Google token exchange failed: ${res.status} ${await res.text()}`);
 const {id_token}=await res.json() as {id_token:string};

 const {payload}=await jwtVerify(id_token,JWKS,{issuer:['https://accounts.google.com','accounts.google.com'],audience:env('GOOGLE_CLIENT_ID')});
 return {
  sub:payload.sub!,
  email:typeof payload.email==='string'?payload.email:undefined,
  emailVerified:payload.email_verified===true,
  name:typeof payload.name==='string'?payload.name:undefined,
 };
}
