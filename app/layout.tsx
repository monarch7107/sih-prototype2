import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = { title: 'LearnVerse AI', description: 'Your intelligent learning universe' }
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html> }
