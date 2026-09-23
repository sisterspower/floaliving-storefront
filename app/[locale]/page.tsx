import Hero from '@/components/Hero';
import CategorySplit from '@/components/CategorySplit';
import ProductGrid from '@/components/ProductGrid';
import EditorialBanner from '@/components/EditorialBanner';
import MaterialStory from '@/components/MaterialStory';
import FloaStories from '@/components/FloaStories';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import {dict,localeFrom,routes} from '@/lib/i18n';
import {products} from '@/lib/products';

export default async function Page({params}:{params:Promise<{locale:string}>}){
 const {locale:raw}=await params;
 const locale=localeFrom(raw),t=dict[locale],r=routes[locale];
 return (
  <main>
   <Hero
    title={<>THE ROBE<br/>COLLECTION</>}
    ctaLabel={t.discover}
    ctaHref={r.robes}
    imageSrc="/images/floa/hero-robe-collection.jpeg"
    imageAlt="FLOALIVING striped robe editorial"
   />
   <CategorySplit
    items={[
     {href:r.robes,label:t.robes,shopNow:t.shopNow,image:'/images/floa/category-robes.jpg',alt:'Robes'},
     {href:r.towels,label:t.towels,shopNow:t.shopNow,image:'/images/floa/category-towels.jpg',alt:'Towels'},
    ]}
   />
   <ProductGrid
    title={t.newCollection}
    products={products.filter(p=>p.category==='robes')}
    locale={locale}
   />
   <EditorialBanner
    title={t.slower}
    ctaLabel={t.discoverWorld}
    ctaHref={r.world}
    imageSrc="/images/floa/editorial-slower-mornings.jpg"
    imageAlt="Slow mornings editorial"
   />
   <MaterialStory
    title={t.made}
    body={t.madeCopy}
    imageSrc="/images/floa/material-wave-trim-closeup.jpg"
    imageAlt="FLOALIVING terry fabric detail"
   />
   <FloaStories
    title={t.stories}
    stories={[
     {image:'/images/floa/story-amsterdam.jpg',title:'A Morning in Amsterdam'},
     {image:'/images/floa/material-wave-trim-closeup.jpg',title:'Behind the Stripe'},
     {image:'/images/floa/story-denizli-to-amsterdam.jpg',title:'From Denizli to Amsterdam'},
    ]}
   />
   <Newsletter title={t.stay} body={t.stayCopy}/>
   <Footer/>
  </main>
 );
}
