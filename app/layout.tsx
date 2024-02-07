'use client'

import './globals.css'
import { Jura, Tajawal } from 'next/font/google'

import Cookies from 'js-cookie'

import { siteTitle, siteDescription } from './static-texts'


const juraFont = Jura({ 
  subsets: ['latin'],
  weight: ['400']
});

const tajawalFont = Tajawal({
  subsets: ['arabic'],
  weight: ['400']
});


function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentFont = Cookies.get('translateTo') === 'En' ?
    tajawalFont.className : juraFont.className

  return (
    <html lang="en">
      <head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription}/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
      </head>
      <body className={currentFont}>{children}</body>
    </html>
  )
}

export default RootLayout