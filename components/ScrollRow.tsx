'use client';
import {useEffect,useRef,useState} from 'react';

export default function ScrollRow({children}:{children:React.ReactNode}){
 const ref=useRef<HTMLDivElement>(null);
 const[canLeft,setCanLeft]=useState(false);
 const[canRight,setCanRight]=useState(false);
 const update=()=>{const el=ref.current;if(!el)return;setCanLeft(el.scrollLeft>4);setCanRight(el.scrollLeft+el.clientWidth<el.scrollWidth-4)};
 useEffect(()=>{update();const el=ref.current;if(!el)return;el.addEventListener('scroll',update);window.addEventListener('resize',update);return()=>{el.removeEventListener('scroll',update);window.removeEventListener('resize',update)}},[]);
 const go=(dir:number)=>{const el=ref.current;if(!el)return;el.scrollBy({left:dir*el.clientWidth*0.9,behavior:'smooth'})};
 return (
  <div className="relative">
   {canLeft&&(
    <button aria-label="Previous" onClick={()=>go(-1)}
     className="absolute left-0 md:-left-6 top-[38%] -translate-y-1/2 z-10 flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-full border border-line bg-paper text-sm md:text-base">
     ←
    </button>
   )}
   <div ref={ref} className="flex gap-3 md:gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
    {children}
   </div>
   {canRight&&(
    <button aria-label="Next" onClick={()=>go(1)}
     className="absolute right-0 md:-right-6 top-[38%] -translate-y-1/2 z-10 flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-full border border-line bg-paper text-sm md:text-base">
     →
    </button>
   )}
  </div>
 );
}
