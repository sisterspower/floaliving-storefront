import Header from './Header';import{CartProvider}from'./CartContext';import type{Locale}from'@/lib/i18n';
export default function Shell({locale,children}:{locale:Locale;children:React.ReactNode}){return <CartProvider><Header locale={locale}/>{children}</CartProvider>}
