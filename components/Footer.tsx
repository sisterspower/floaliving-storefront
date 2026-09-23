export default function Footer(){
 const columns=[['SHOP','Robes','Towels','New In'],['OUR WORLD','Our story','Journal','Materials'],['HELP','Delivery','Returns','Contact']] as const;
 return (
  <footer className="mx-auto max-w-[1440px] px-4 py-10 md:px-[60px] md:py-[56px]">
   <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
    <div className="col-span-2 md:col-span-1">
     <div className="text-[22px] tracking-[0.09em] font-semibold">FLOALIVING</div>
     <p className="muted mt-2">A BRIGHTER HOME FOR SLOWER DAYS.</p>
    </div>
    {columns.map(c=>
     <div key={c[0]}>
      <h4 className="text-[11px] tracking-[0.12em]">{c[0]}</h4>
      {c.slice(1).map(x=><a href="#" key={x} className="mt-3 block text-[13px] text-muted no-underline">{x}</a>)}
     </div>
    )}
   </div>
  </footer>
 );
}
