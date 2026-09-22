import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'FLOALIVING', description: 'A brighter home for slower days.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
