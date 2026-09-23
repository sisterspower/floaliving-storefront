export default function AnnouncementBar({text}:{text:string}){
 return (
  <div className="flex h-7 md:h-8 items-center justify-center bg-ink px-4 md:px-[60px] text-center text-[10px] md:text-[11px] tracking-[0.12em] md:tracking-[0.14em] text-white">
   {text}
  </div>
 );
}
