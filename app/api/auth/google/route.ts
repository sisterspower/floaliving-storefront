import {NextRequest,NextResponse} from 'next/server';
import {randomUUID} from 'crypto';
import {googleAuthorizeUrl} from '@/lib/googleAuth';

const STATE_COOKIE='google_oauth_state';

// GET /api/auth/google?locale=tr — starts the "Sign in with Google" flow.
export async function GET(req:NextRequest){
 const locale=req.nextUrl.searchParams.get('locale')||'en';
 const csrf=randomUUID();
 const res=NextResponse.redirect(googleAuthorizeUrl(`${csrf}.${locale}`));
 // Google's callback is a normal top-level GET redirect, so a sameSite:'lax'
 // cookie (which also works over plain http on localhost) is enough.
 res.cookies.set(STATE_COOKIE,csrf,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*10});
 return res;
}
