import type {MetadataRoute} from 'next';
import {locales,routes} from '@/lib/i18n';
import {products} from '@/lib/products';

export default function sitemap():MetadataRoute.Sitemap{
 const base=process.env.NEXT_PUBLIC_SITE_URL||'https://floaliving.com';
 const staticPaths=locales.flatMap(l=>Object.values(routes[l]));
 const productPaths=products
  .filter(p=>p.category==='robes')
  .flatMap(p=>locales.map(l=>`${routes[l].robes}/${p.handle}`));

 return [...staticPaths,...productPaths].map(path=>({url:base+path,lastModified:new Date()}));
}
