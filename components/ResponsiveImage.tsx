function mobileSrc(src:string){const i=src.lastIndexOf('.');return src.slice(0,i)+'-mobile'+src.slice(i)}
export default function ResponsiveImage({src,alt,className}:{src:string;alt:string;className?:string}){
 return <picture><source media="(max-width:767px)" srcSet={mobileSrc(src)}/><img src={src} alt={alt} className={className}/></picture>;
}
