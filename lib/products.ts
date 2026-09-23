import type {Locale} from './i18n';

export type Money={amount:number;currencyCode:'EUR'};

export type Variant={
 id:string;
 sku:string;
 selectedOptions:{name:'Colour'|'Size';value:string}[];
 price:Money;
 availableForSale:boolean;
 quantityAvailable:number;
 barcode?:string;
};

export type Product={
 id:string;
 handle:string;
 category:'robes'|'towels';
 title:Record<Locale,string>;
 description:Record<Locale,string>;
 images:string[];
 options:{name:'Colour'|'Size';values:string[]}[];
 variants:Variant[];
 metafields:{material:string;fit:string;care:string};
};

const description={
 en:'Premium cotton textile designed for slow mornings and everyday rituals.',
 nl:'Premium katoenen textiel ontworpen voor rustige ochtenden en dagelijkse rituelen.',
 tr:'Sakin sabahlar ve günlük ritüeller için tasarlanmış premium pamuklu tekstil.',
};

function makeProduct(
 id:string,handle:string,category:Product['category'],
 en:string,nl:string,tr:string,img:string,price:number,
 colors:string[],sizes:string[],
):Product{
 const variants=colors.flatMap(c=>sizes.map((s,i)=>({
  id:`gid://shopify/ProductVariant/${id}-${c}-${s}`,
  sku:`FLOA-${id}-${c.replace(/\W/g,'').slice(0,4).toUpperCase()}-${s.replace(/\W/g,'').toUpperCase()}`,
  selectedOptions:[{name:'Colour' as const,value:c},{name:'Size' as const,value:s}],
  price:{amount:price,currencyCode:'EUR' as const},
  availableForSale:!(i===2&&c.includes('Navy')),
  quantityAvailable:i===0?8:i===1?3:0,
 })));
 return {
  id,handle,category,
  title:{en,nl,tr},
  description,
  images:[img,img],
  options:[{name:'Colour',values:colors},{name:'Size',values:sizes}],
  variants,
  metafields:{
   material:'100% cotton · terry interior · velour exterior',
   fit:sizes.includes('One Size')?'Relaxed one-size fit':'Relaxed fit',
   care:'Machine wash at 30°C. Wash with similar colours.',
  },
 };
}

export const products:Product[]=[
 makeProduct('RB-BP','stripe-robe-burgundy-pink','robes','Stripe Robe — Burgundy / Pink','Gestreepte badjas — Bordeaux / Roze','Çizgili Bornoz — Bordo / Pembe','/images/floa/product-stripe-robe-burgundy-pink.jpg',129,['Burgundy / Pink'],['S','M','L']),
 makeProduct('RB-NC','stripe-robe-navy-cream','robes','Stripe Robe — Navy / Cream','Gestreepte badjas — Navy / Crème','Çizgili Bornoz — Lacivert / Krem','/images/floa/product-stripe-robe-navy-cream.jpg',129,['Navy / Cream'],['S','M','L']),
 makeProduct('RB-MC','stripe-robe-multicolour','robes','Stripe Robe — Multicolour','Gestreepte badjas — Multicolour','Çizgili Bornoz — Çok Renkli','/images/floa/product-stripe-robe-multicolour.jpg',139,['Multicolour'],['One Size']),
 makeProduct('RB-SP','wave-robe-soft-pink','robes','Wave Robe — Soft Pink','Wave badjas — Zachtroze','Dalga Desenli Bornoz — Pudra Pembe','/images/floa/product-wave-robe-soft-pink.jpg',129,['Soft Pink'],['One Size']),
 makeProduct('RB-BRP','stripe-robe-brown-pink','robes','Stripe Robe — Brown / Pink','Gestreepte badjas — Bruin / Roze','Çizgili Bornoz — Kahverengi / Pembe','/images/floa/product-stripe-robe-brown-pink.jpg',129,['Brown / Pink'],['S','M','L']),
 makeProduct('TW-LT','stripe-towel-lilac-turquoise','towels','Stripe Towel — Lilac / Turquoise','Gestreepte handdoek — Lila / Turquoise','Çizgili Havlu — Lila / Turkuaz','/images/towel-lilac.svg',49,['Lilac / Turquoise'],['One Size']),
 makeProduct('TW-NC','stripe-towel-navy-cream','towels','Stripe Towel — Navy / Cream','Gestreepte handdoek — Navy / Crème','Çizgili Havlu — Lacivert / Krem','/images/towel-navy.svg',49,['Navy / Cream'],['One Size']),
];

export const getProduct=(handle:string)=>products.find(p=>p.handle===handle);
