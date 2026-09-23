import {NextRequest,NextResponse} from 'next/server';
import {exchangeGoogleCode} from '@/lib/googleAuth';
import {createSessionCookie} from '@/lib/session';
import {routes,localeFrom} from '@/lib/i18n';

const STATE_COOKIE='google_oauth_state';

// GET /api/auth/google/callback — Google redirects here with ?code&state.
export async function GET(req:NextRequest){
 const code=req.nextUrl.searchParams.get('code');
 const state=req.nextUrl.searchParams.get('state');
 const error=req.nextUrl.searchParams.get('error');

 const [csrf,rawLocale]=state?state.split('.'):[null,null];
 const locale=localeFrom(rawLocale||'en');
 const accountUrl=new URL(routes[locale].account,req.nextUrl.origin);

 const expectedCsrf=req.cookies.get(STATE_COOKIE)?.value;
 if(error||!code||!csrf||csrf!==expectedCsrf){
  accountUrl.searchParams.set('auth_error','1');
  const res=NextResponse.redirect(accountUrl,303);
  res.cookies.delete(STATE_COOKIE);
  return res;
 }

 try{
  const identity=await exchangeGoogleCode(code);
  await createSessionCookie({provider:'google',sub:identity.sub,email:identity.email,name:identity.name});
 }catch(e){
  console.error('Google sign-in failed',e);
  accountUrl.searchParams.set('auth_error','1');
  const res=NextResponse.redirect(accountUrl,303);
  res.cookies.delete(STATE_COOKIE);
  return res;
 }

 const res=NextResponse.redirect(accountUrl,303);
 res.cookies.delete(STATE_COOKIE);
 return res;
}
