import './globals.css'
import type { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Nunchain',
  description: 'BitNunChain — zero-cost, interaction-powered chain.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-zinc-100">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
