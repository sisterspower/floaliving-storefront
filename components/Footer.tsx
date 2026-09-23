'use client';
import {useState} from 'react';
import {dict,type Locale} from '@/lib/i18n';

const columns=[
 ['SHOP','Robes','Towels','New In'],
 ['OUR WORLD','Our story','Journal','Materials'],
 ['HELP','Delivery','Returns','Contact'],
] as const;

const social=['Instagram','Pinterest','TikTok'];

export default function Footer({locale}:{locale:Locale}){
 const t=dict[locale];
 const[email,setEmail]=useState('');
 const[subscribed,setSubscribed]=useState(false);
 const submit=(e:React.FormEvent)=>{
  e.preventDefault();
  setSubscribed(true);
  setEmail('');
 };
 return (
  <footer className="mx-auto max-w-[1440px] px-4 pt-16 md:mt-4 md:px-[60px] md:pt-24">
   <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_2fr] md:gap-8">
    <div>
     <h2 className="max-w-[360px] text-[32px] font-semibold leading-[1.05] md:text-[38px]">{t.stay}</h2>
     <p className="mt-4 max-w-[380px] text-[15px] leading-6 text-muted">{t.stayCopy}</p>
     <form className="mt-6 flex max-w-[420px]" onSubmit={submit}>
      <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder={t.emailPlaceholder} className="h-12 w-full min-w-0 border border-line bg-transparent px-4 text-sm placeholder:text-muted"/>
      <button type="submit" className="h-12 shrink-0 bg-ink px-6 text-xs tracking-[0.08em] text-white">{t.subscribe}</button>
     </form>
     <p className="mt-3 max-w-[420px] text-xs text-muted">
      {subscribed&&<>{t.subscribed}<br/><br/></>}
      {t.newsletterNote}
     </p>
    </div>

    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
     {columns.map(([heading,...links])=>
      <div key={heading}>
       <h4 className="text-[11px] tracking-[0.12em]">{heading}</h4>
       {links.map(x=><a href="#" key={x} className="mt-3 block text-[13px] text-muted no-underline">{x}</a>)}
       {heading==='HELP'&&(
        <div className="mt-6">
         <h4 className="text-[11px] tracking-[0.12em]">{t.getInTouch}</h4>
         <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
          {social.map(s=><a href="#" key={s} className="text-[13px] text-muted no-underline">{s}</a>)}
         </div>
        </div>
       )}
      </div>
     )}
    </div>
   </div>

   <div className="mt-16 -mx-4 overflow-hidden px-4 md:mt-24 md:-mx-[60px] md:px-[60px]">
    <span className="block whitespace-nowrap text-[clamp(52px,15vw,200px)] font-extrabold leading-[0.85] tracking-tight">FLOALIVING</span>
   </div>

   <div className="flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
    <span>© {new Date().getFullYear()} FLOALIVING</span>
   </div>
  </footer>
 );
}
