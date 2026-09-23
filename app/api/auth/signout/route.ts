import {NextRequest,NextResponse} from 'next/server';
import {clearSessionCookie} from '@/lib/session';

export async function POST(req:NextRequest){
 await clearSessionCookie();
 const back=req.nextUrl.searchParams.get('redirect')||'/';
 return NextResponse.redirect(new URL(back,req.nextUrl.origin),303);
}
