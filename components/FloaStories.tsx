import ResponsiveImage from './ResponsiveImage';

export default function FloaStories({title,stories}:{title:string;stories:{image:string;title:string}[]}){
 return (
  <section className="mx-auto max-w-[1440px] px-4 py-10 md:px-[60px] md:py-16">
   <h2 className="mb-6 text-[13px] tracking-[0.18em] md:mb-8">{title}</h2>
   <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
    {stories.map(s=>
     <article key={s.title}>
      <div className="aspect-[3/2] overflow-hidden">
       <ResponsiveImage src={s.image} alt={s.title} className="h-full w-full object-cover"/>
      </div>
      <h3 className="mt-3 text-base font-normal">{s.title}</h3>
      <span className="cta mt-1 inline-block text-[13px]">Read the story →</span>
     </article>
    )}
   </div>
  </section>
 );
}
