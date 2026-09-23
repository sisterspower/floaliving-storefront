import {notFound} from 'next/navigation';
import Shell from '@/components/Shell';
import {locales,type Locale} from '@/lib/i18n';

export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
 const {locale}=await params;
 if(!locales.includes(locale as Locale))notFound();
 return <Shell locale={locale as Locale}>{children}</Shell>;
}
