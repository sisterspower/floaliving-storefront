export default function Newsletter({title,body}:{title:string;body:string}){
 return (
  <section className="mx-auto max-w-[1440px] border-y border-line px-4 py-10 md:px-[60px] md:py-12">
   <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.1fr] md:items-end md:gap-16">
    <div>
     <h2 className="text-[24px] font-normal leading-[28px] md:text-[28px] md:leading-[32px]">{title}</h2>
     <p className="mt-2 text-[15px] leading-6">{body}</p>
    </div>
    <input placeholder="Email address" className="h-12 w-full border-0 border-b border-ink bg-transparent text-sm placeholder:text-muted"/>
   </div>
  </section>
 );
}
