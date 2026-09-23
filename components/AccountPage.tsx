'use client';
import {dict,routes,type Locale} from '@/lib/i18n';
import type {Session} from '@/lib/session';

const notReady=()=>alert('Phase 2: connect this to real account authentication.');

export default function AccountPage({locale,session,authError}:{locale:Locale;session:Session|null;authError?:boolean}){
 const t=dict[locale];

 if(session){
  return (
   <main className="grid min-h-[calc(100vh-56px)] place-items-center md:min-h-[calc(100vh-76px)]">
    <div className="max-w-[360px] px-6 text-center">
     <p className="text-xs tracking-[0.08em] text-muted">{t.signedInAs}</p>
     <p className="mt-2 text-lg">{session.email||session.sub}</p>
     <form action={`/api/auth/signout?redirect=${encodeURIComponent(routes[locale].home)}`} method="post" className="mt-8">
      <button type="submit" className="h-12 w-full border border-line text-xs tracking-[0.08em]">{t.signOut}</button>
     </form>
    </div>
   </main>
  );
 }

 return (
  <main className="grid min-h-[calc(100vh-56px)] grid-cols-1 md:min-h-[calc(100vh-76px)] md:grid-cols-2">
   <div className="relative hidden md:block">
    <img src="/images/floa/product-stripe-robe-brown-pink.jpg" alt="FLOALIVING" className="h-full w-full object-cover grayscale"/>
    <div className="absolute bottom-10 left-8 text-[26px] italic text-white">FLOALIVING</div>
   </div>

   <div className="flex flex-col justify-center px-6 py-16 md:px-16">
    <div className="max-w-[420px]">
     {authError&&<p className="mb-6 bg-ivory p-4 text-xs leading-5 text-ink">{t.authError}</p>}
     <h1 className="text-[13px] font-semibold uppercase leading-relaxed tracking-[0.06em]">{t.accountHeading}</h1>

     <form className="mt-10" onSubmit={e=>{e.preventDefault();notReady()}}>
      <label className="block text-xs tracking-[0.08em] text-muted">{t.emailLabel}</label>
      <input type="email" required className="mt-2 w-full border-b border-ink bg-transparent pb-2 text-sm focus:outline-none"/>
      <button type="submit" className="mt-8 h-12 w-full bg-ink text-xs tracking-[0.08em] text-white">{t.continueBtn}</button>
     </form>

     <div className="mt-12">
      <h2 className="text-xs tracking-[0.08em]">{t.orContinueWith}</h2>
      <p className="mt-3 text-xs leading-5 text-muted">
       {t.socialConsent} <a href="#" className="underline text-ink">{t.privacyPolicy}</a>
      </p>
      <div className="mt-4 flex flex-col gap-3">
       <button onClick={notReady} className="h-12 border border-line text-xs tracking-[0.05em]">{t.continueWithFacebook}</button>
       <button onClick={notReady} className="h-12 border border-line text-xs tracking-[0.05em]">{t.continueWithApple}</button>
       <a href={`/api/auth/google?locale=${locale}`} className="flex h-12 items-center justify-center border border-line text-xs tracking-[0.05em] no-underline text-inherit">{t.continueWithGoogle}</a>
      </div>
     </div>

     <div className="mt-10 bg-ivory p-4 text-xs leading-5 text-muted">
      {t.guestOrdersPre} <a href="#" className="underline text-ink">{t.hereWord}</a>{t.guestOrdersPost}
     </div>
    </div>
   </div>
  </main>
 );
}
