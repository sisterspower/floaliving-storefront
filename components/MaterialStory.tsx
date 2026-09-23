import ResponsiveImage from './ResponsiveImage';

export default function MaterialStory({title,body,imageSrc,imageAlt}:{title:string;body:string;imageSrc:string;imageAlt:string}){
 return (
  <section className="mx-4 mt-10 flex flex-col md:mx-[60px] md:mt-16 md:min-h-[440px] md:flex-row">
   <div className="aspect-[4/3] md:aspect-auto md:w-[64%]">
    <ResponsiveImage src={imageSrc} alt={imageAlt} className="h-full w-full object-cover"/>
   </div>
   <div className="flex flex-col justify-center px-6 py-8 md:w-[36%] md:p-[56px]">
    <h2 className="text-[32px] font-normal leading-tight">{title}</h2>
    <p className="mt-4 text-[15px] leading-6">{body}</p>
   </div>
  </section>
 );
}
