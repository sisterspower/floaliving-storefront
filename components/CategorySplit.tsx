import Link from 'next/link';
import ResponsiveImage from './ResponsiveImage';

export default function CategorySplit({items}:{items:{href:string;label:string;shopNow:string;image:string;alt:string}[]}){
 return (
  <section className="mx-auto max-w-[1440px] px-4 pt-10 md:px-[60px] md:pt-16">
   <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
    {items.map(it=>
     <Link key={it.href} href={it.href} className="link relative block aspect-[4/5] overflow-hidden md:aspect-[4/3]">
      <ResponsiveImage src={it.image} alt={it.alt} className="h-full w-full object-cover"/>
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-paper/90 px-4 py-3">
       <span className="block text-[26px] font-normal leading-none md:text-[30px]">{it.label}</span>
       <span className="mt-1 block text-xs">{it.shopNow} →</span>
      </div>
     </Link>
    )}
   </div>
  </section>
 );
}
