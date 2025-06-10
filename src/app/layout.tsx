// app/layout.tsx

//import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Alokai Shopify Starter',
  description: 'React frontend integrated with Shopify',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}