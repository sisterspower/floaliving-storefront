import Link from 'next/link';
import ResponsiveImage from './ResponsiveImage';

export default function EditorialBanner({title,ctaLabel,ctaHref,imageSrc,imageAlt}:{title:string;ctaLabel:string;ctaHref:string;imageSrc:string;imageAlt:string}){
 return (
  <section className="relative mx-4 flex min-h-[300px] items-center justify-center overflow-hidden text-center md:mx-[60px] md:min-h-[520px]">
   <ResponsiveImage src={imageSrc} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover"/>
   <div className="absolute inset-0 bg-black/15"/>
   <div className="relative z-10 text-white">
    <h2 className="text-[30px] font-normal md:text-[42px]">{title}</h2>
    <Link href={ctaHref} className="cta mt-4 inline-block text-[15px] text-white">{ctaLabel} →</Link>
   </div>
  </section>
 );
}
