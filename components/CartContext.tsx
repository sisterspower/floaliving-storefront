'use client';
import {createContext,useContext,useMemo,useState} from 'react';
import type {Product,Variant} from '@/lib/products';

type Line={product:Product;variant:Variant;qty:number};
type Cart={
 lines:Line[];
 open:boolean;
 setOpen:(v:boolean)=>void;
 add:(p:Product,v:Variant)=>void;
 remove:(id:string)=>void;
 count:number;
 subtotal:number;
};

const CartCtx=createContext<Cart|null>(null);

export function CartProvider({children}:{children:React.ReactNode}){
 const[lines,setLines]=useState<Line[]>([]);
 const[open,setOpen]=useState(false);

 const add=(product:Product,variant:Variant)=>{
  setLines(xs=>{
   const existing=xs.find(x=>x.variant.id===variant.id);
   return existing
    ?xs.map(x=>x.variant.id===variant.id?{...x,qty:x.qty+1}:x)
    :[...xs,{product,variant,qty:1}];
  });
  setOpen(true);
 };

 const remove=(id:string)=>setLines(xs=>xs.filter(x=>x.variant.id!==id));

 const value=useMemo(()=>({
  lines,
  open,
  setOpen,
  add,
  remove,
  count:lines.reduce((a,x)=>a+x.qty,0),
  subtotal:lines.reduce((a,x)=>a+x.qty*x.variant.price.amount,0),
 }),[lines,open]);

 return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export const useCart=()=>{
 const c=useContext(CartCtx);
 if(!c)throw new Error('CartProvider missing');
 return c;
};
