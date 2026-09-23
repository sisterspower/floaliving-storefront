import {SignJWT,jwtVerify} from 'jose';
import {cookies} from 'next/headers';

// There is no backend/database yet (Phase 1, mock commerce). Until real
// Shopify Customer Accounts are wired up, the signed-in state lives entirely
// in a signed, httpOnly cookie — good enough to prove the OAuth flow works
// end to end, not meant as a production session store.

export const SESSION_COOKIE='floa_session';

function secret(){
 const s=process.env.SESSION_SECRET;
 if(!s)throw new Error('Missing required env var: SESSION_SECRET (any long random string)');
 return new TextEncoder().encode(s);
}

export type Session={provider:'apple'|'google';sub:string;email?:string;name?:string};

export async function createSessionCookie(session:Session){
 const token=await new SignJWT(session)
  .setProtectedHeader({alg:'HS256'})
  .setIssuedAt()
  .setExpirationTime('30d')
  .sign(secret());
 const jar=await cookies();
 jar.set(SESSION_COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*24*30});
}

export async function readSession():Promise<Session|null>{
 const jar=await cookies();
 const token=jar.get(SESSION_COOKIE)?.value;
 if(!token)return null;
 try{
  const {payload}=await jwtVerify(token,secret());
  return payload as unknown as Session;
 }catch{
  return null;
 }
}

export async function clearSessionCookie(){
 const jar=await cookies();
 jar.delete(SESSION_COOKIE);
}
