import {notFound} from 'next/navigation';
import CollectionPage from '@/components/CollectionPage';
import ProductDetail from '@/components/ProductDetail';
import OurWorldPage from '@/components/OurWorldPage';
import JournalPage from '@/components/JournalPage';
import AccountPage from '@/components/AccountPage';
import {localeFrom,routes} from '@/lib/i18n';
import {getProduct} from '@/lib/products';
import {readSession} from '@/lib/session';

// Every localised route (e.g. /nl/badjassen, /tr/bornozlar) is declared once
// in lib/i18n.ts's `routes` table and dispatched here — adding a new locale
// or renaming a slug never requires a new route folder.
export default async function Page({params,searchParams}:{params:Promise<{locale:string;slug:string[]}>;searchParams:Promise<{auth_error?:string}>}){
 const {locale:raw,slug}=await params;
 const locale=localeFrom(raw);
 const r=routes[locale];
 const path=`/${raw}/${slug.join('/')}`;

 if(path===r.robes)return <CollectionPage category="robes" locale={locale}/>;
 if(path===r.towels)return <CollectionPage category="towels" locale={locale}/>;
 if(path===r.world)return <OurWorldPage/>;
 if(path===r.journal)return <JournalPage/>;
 if(path===r.account){
  const [session,{auth_error}]=await Promise.all([readSession(),searchParams]);
  return <AccountPage locale={locale} session={session} authError={!!auth_error}/>;
 }

 if(path.startsWith(r.robes+'/')){
  const handle=slug[slug.length-1];
  const product=getProduct(handle);
  if(!product||product.category!=='robes')notFound();
  return <ProductDetail product={product} locale={locale}/>;
 }

 notFound();
}
