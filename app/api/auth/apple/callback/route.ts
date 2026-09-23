import {NextRequest,NextResponse} from 'next/server';
import {exchangeAppleCode} from '@/lib/appleAuth';
import {createSessionCookie} from '@/lib/session';
import {routes,localeFrom} from '@/lib/i18n';

const STATE_COOKIE='apple_oauth_state';

// POST /api/auth/apple/callback — Apple redirects here via response_mode=form_post.
export async function POST(req:NextRequest){
 const form=await req.formData();
 const code=form.get('code');
 const state=form.get('state');
 const error=form.get('error');

 const [csrf,rawLocale]=typeof state==='string'?state.split('.'):[null,null];
 const locale=localeFrom(rawLocale||'en');
 const accountUrl=new URL(routes[locale].account,req.nextUrl.origin);

 const expectedCsrf=req.cookies.get(STATE_COOKIE)?.value;
 if(error||!code||typeof code!=='string'||!csrf||csrf!==expectedCsrf){
  accountUrl.searchParams.set('auth_error','1');
  const res=NextResponse.redirect(accountUrl,303);
  res.cookies.delete(STATE_COOKIE);
  return res;
 }

 try{
  const identity=await exchangeAppleCode(code);
  await createSessionCookie({provider:'apple',sub:identity.sub,email:identity.email});
 }catch(e){
  console.error('Apple sign-in failed',e);
  accountUrl.searchParams.set('auth_error','1');
  const res=NextResponse.redirect(accountUrl,303);
  res.cookies.delete(STATE_COOKIE);
  return res;
 }

 const res=NextResponse.redirect(accountUrl,303);
 res.cookies.delete(STATE_COOKIE);
 return res;
}
