'use client';
import Link from 'next/link';
import {usePathname,useRouter} from 'next/navigation';
import {useEffect,useState} from 'react';
import {dict,routes,switchLocale,type Locale} from '@/lib/i18n';
import {useCart} from './CartContext';
import AnnouncementBar from './AnnouncementBar';

export default function Header({locale}:{locale:Locale}){
 const t=dict[locale],r=routes[locale],path=usePathname(),router=useRouter(),cart=useCart();
 const[menu,setMenu]=useState(false);
 const[search,setSearch]=useState(false);
 const[scrolled,setScrolled]=useState(false);
 useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>10);onScroll();window.addEventListener('scroll',onScroll);return()=>window.removeEventListener('scroll',onScroll)},[]);
 const swap=(to:Locale)=>router.push(switchLocale(path,to));
 const navLinks=[[r.home,t.shop],[r.robes,t.robes],[r.towels,t.towels],[r.world,t.world]] as const;
 return (
  <>
   <AnnouncementBar text="FREE NL DELIVERY OVER €150 — EASY RETURNS"/>
   <header className={`sticky top-0 z-50 border-b transition-colors ${scrolled?'border-line bg-paper/95 backdrop-blur-md':'border-transparent bg-transparent'}`}>
    <div className="mx-auto grid h-14 md:h-[76px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-[60px]">
     <div className="flex items-center gap-4 md:gap-6">
      <button className="text-xl" onClick={()=>setMenu(true)} aria-label="Menu">☰</button>
      <nav className="hidden md:flex items-center gap-4 text-xs tracking-[0.08em] whitespace-nowrap">
       {navLinks.map(([href,label])=><Link key={href} className="link" href={href}>{label}</Link>)}
      </nav>
     </div>
     <Link className="link justify-self-center whitespace-nowrap text-[22px] font-semibold tracking-[0.16em]" href={r.home}>FLOALIVING</Link>
     <div className="flex items-center justify-self-end gap-4 text-xs tracking-[0.08em] whitespace-nowrap">
      <button className="hidden md:inline" onClick={()=>setSearch(true)}>{t.search}</button>
      <button className="hidden md:inline" onClick={()=>swap(locale==='en'?'nl':'en')}>{locale.toUpperCase()}</button>
      <button className="hidden md:inline">{t.account}</button>
      <button onClick={()=>cart.setOpen(true)}>{t.bag} ({cart.count})</button>
     </div>
    </div>
   </header>
   {menu&&(
    <div className="drawer-bg" onClick={()=>setMenu(false)}>
     <aside className="drawer drawer-left" onClick={e=>e.stopPropagation()}>
      <div className="drawer-head"><b>FLOALIVING</b><button onClick={()=>setMenu(false)}>✕</button></div>
      {navLinks.map(([href,label])=><Link key={href} className="link" style={{display:'block',fontSize:28,margin:'22px 0'}} href={href} onClick={()=>setMenu(false)}>{label}</Link>)}
      <Link className="link" style={{display:'block',fontSize:28,margin:'22px 0'}} href={r.journal} onClick={()=>setMenu(false)}>JOURNAL</Link>
      <button className="mt-6 text-xs tracking-[0.08em]" onClick={()=>{swap(locale==='en'?'nl':'en');setMenu(false)}}>{locale==='en'?'Switch to NL':'Switch to EN'}</button>
     </aside>
    </div>
   )}
   {search&&(
    <div className="search-overlay">
     <div className="search-box">
      <button onClick={()=>setSearch(false)}>CLOSE</button>
      <input autoFocus placeholder={t.search+'…'}/>
      <p className="muted">Shopify search adapter will connect here in Phase 2.</p>
     </div>
    </div>
   )}
   <CartDrawer locale={locale}/>
  </>
 );
}

function CartDrawer({locale}:{locale:Locale}){
 const c=useCart(),t=dict[locale];
 if(!c.open)return null;
 return (
  <div className="drawer-bg" onClick={()=>c.setOpen(false)}>
   <aside className="drawer" onClick={e=>e.stopPropagation()}>
    <div className="drawer-head"><b>{t.bag} ({c.count})</b><button onClick={()=>c.setOpen(false)}>✕</button></div>
    {c.lines.length===0?<p>Your bag is empty.</p>:c.lines.map(x=>
     <div className="cart-line" key={x.variant.id}>
      <img src={x.product.images[0]} alt=""/>
      <div>
       <div>{x.product.title[locale]}</div>
       <div className="muted">{x.variant.selectedOptions.map(o=>o.value).join(' · ')}</div>
       <button onClick={()=>c.remove(x.variant.id)}>Remove</button>
      </div>
      <div>€{x.variant.price.amount*x.qty}</div>
     </div>
    )}
    <div style={{display:'flex',justifyContent:'space-between',padding:'22px 0'}}>
     <b>Subtotal</b><b>€{c.subtotal}</b>
    </div>
    <button className="add" onClick={()=>alert('Phase 2: redirect this button to Shopify cart.checkoutUrl')}>CHECKOUT</button>
   </aside>
  </div>
 );
}
