import Link from 'next/link';
import ResponsiveImage from './ResponsiveImage';

export default function Hero({title,ctaLabel,ctaHref,imageSrc,imageAlt}:{title:React.ReactNode;ctaLabel:string;ctaHref:string;imageSrc:string;imageAlt:string}){
 return (
  <section className="relative flex min-h-[500px] items-center overflow-hidden md:min-h-[700px]">
   <ResponsiveImage src={imageSrc} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover"/>
   <div className="absolute inset-0 bg-gradient-to-r from-ivory/90 via-ivory/45 to-transparent"/>
   <div className="relative z-10 max-w-[540px] px-6 py-8 md:px-16 md:py-20">
    <h1 className="text-[38px] font-normal leading-[1.02] tracking-[-0.025em] md:text-[clamp(40px,5.5vw,60px)] md:leading-[0.98]">{title}</h1>
    <Link href={ctaHref} className="cta mt-8 text-[15px]">{ctaLabel} →</Link>
   </div>
  </section>
 );
}
