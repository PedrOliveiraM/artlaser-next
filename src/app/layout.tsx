import type { Metadata } from 'next'

import './globals.css'

import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Artlaser Crr',
  description: 'Catálogo Online Artlaser',
  icons: './favicon.ico',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'auto',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" className={inter.className}>
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  )
}
