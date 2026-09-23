import {NextRequest,NextResponse} from 'next/server';
import {randomUUID} from 'crypto';
import {appleAuthorizeUrl} from '@/lib/appleAuth';

const STATE_COOKIE='apple_oauth_state';

// GET /api/auth/apple?locale=tr — starts the "Sign in with Apple" flow.
export async function GET(req:NextRequest){
 const locale=req.nextUrl.searchParams.get('locale')||'en';
 const csrf=randomUUID();
 const res=NextResponse.redirect(appleAuthorizeUrl(`${csrf}.${locale}`));
 // Apple's callback is a cross-site POST navigation, so this cookie must be
 // sameSite:'none' (and therefore secure) to survive the round trip.
 res.cookies.set(STATE_COOKIE,csrf,{httpOnly:true,secure:true,sameSite:'none',path:'/',maxAge:60*10});
 return res;
}
