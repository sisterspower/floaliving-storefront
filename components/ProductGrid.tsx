import ProductCard from './ProductCard';
import ScrollRow from './ScrollRow';
import type {Product} from '@/lib/products';
import type {Locale} from '@/lib/i18n';

export default function ProductGrid({title,products,locale}:{title:string;products:Product[];locale:Locale}){
 return (
  <section className="mx-auto max-w-[1440px] px-4 py-10 md:px-[60px] md:py-16">
   <h2 className="mb-6 text-[13px] tracking-[0.18em] md:mb-8">{title}</h2>
   <ScrollRow>
    {products.map(p=><div key={p.id} className="min-w-0 shrink-0 basis-[calc((100%-12px)/2)] snap-start md:basis-[calc((100%-72px)/4)]"><ProductCard product={p} locale={locale}/></div>)}
   </ScrollRow>
  </section>
 );
}
