import ProductCard from './ProductCard';
import {dict,type Locale} from '@/lib/i18n';
import {products,type Product} from '@/lib/products';

export default function CollectionPage({category,locale}:{category:Product['category'];locale:Locale}){
 const t=dict[locale];
 const items=products.filter(p=>p.category===category);
 const title=category==='robes'?t.robes:t.towels;

 return (
  <main className="container">
   <header className="collection-head">
    <p className="eyebrow">FLOALIVING</p>
    <h1 className="section-title">{title}</h1>
   </header>
   <div className="collection-meta">
    <span>{items.length} products</span>
    <span>FILTER + &nbsp;&nbsp; SORT +</span>
   </div>
   <div className="grid">
    {items.map(p=><ProductCard key={p.id} product={p} locale={locale}/>)}
   </div>
   <div style={{height:90}}/>
  </main>
 );
}
