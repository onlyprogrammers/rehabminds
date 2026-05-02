import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ignoustudyguide.com'),
  title: {
    default: 'IGNOU Study Guide – Assignments, Notes & Grade Cards',
    template: '%s | IGNOU Study Guide',
  },
  description:
    'IGNOU Study Guide is the #1 platform for IGNOU students. Access solved assignments, study notes, previous year question papers, grade cards, and career guidance — all in one place. Trusted by 50,000+ students.',
  generator: 'IGNOU Study Guide',
  applicationName: 'IGNOU Study Guide',
  keywords: [
    'IGNOU',
    'IGNOU assignments',
    'IGNOU solved assignments',
    'IGNOU study materials',
    'IGNOU notes',
    'IGNOU books',
    'IGNOU question papers',
    'IGNOU previous year question papers',
    'IGNOU term end exam papers',
    'IGNOU grade card',
    'IGNOU career guidance',
    'IGNOU BCA assignments',
    'IGNOU BA solved assignments',
    'IGNOU MCA notes',
    'IGNOU study guide',
    'IGNOU help',
    'IGNOU online',
    'indira gandhi national open university',
    'IGNOU exam preparation',
    'IGNOU synopsis help',
  ],
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'IGNOU Study Guide', url: 'https://ignoustudyguide.com' }],
  openGraph: {
    title: 'IGNOU Study Guide – Assignments, Notes & Grade Cards',
    description:
      'Access IGNOU solved assignments, previous year question papers, study notes, grade cards, and career guidance — all in one portal. Trusted by 50,000+ students.',
    type: 'website',
    siteName: 'IGNOU Study Guide',
    locale: 'en_IN',
    url: 'https://ignoustudyguide.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IGNOU Study Guide – Assignments, Notes & Grade Cards',
    description:
      'Access IGNOU solved assignments, study notes, grade cards, and career guidance in one portal. Trusted by 50,000+ students.',
    site: '@ignoustudyguide',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
