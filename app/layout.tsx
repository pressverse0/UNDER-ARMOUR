import type { Metadata } from 'next'
import { Barriecito, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const barriecito = Barriecito({ 
  subsets: ["latin"],
  weight: ['400'],
  variable: '--font-barriecito',
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Under Armour - The Only Way Is Through | Premium Athletic Gear & Sportswear',
  description: 'Push beyond limits with Under Armour. Shop premium athletic gear, performance apparel, and innovative sportswear. HeatGear technology, HOVR shoes, and training equipment for champions.',
  keywords: [
    'Under Armour',
    'athletic wear',
    'sportswear',
    'performance apparel',
    'training gear',
    'HeatGear',
    'HOVR shoes',
    'gym clothing',
    'athletic shoes',
    'sports equipment',
    'workout clothes',
    'running shoes',
    'basketball gear',
    'football equipment',
    'training apparel'
  ],
  authors: [{ name: 'Under Armour' }],
  creator: 'Under Armour',
  publisher: 'Under Armour',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://github.com/Mostafa-SAID7/UNDER-ARMOUR'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Under Armour - The Only Way Is Through',
    description: 'Push beyond limits. Break through barriers. Dominate every rep, every mile, every moment with Under Armour premium athletic gear.',
    url: '/',
    siteName: 'Under Armour',
    images: [
      {
        url: '/intense-athlete-training-sketch.png',
        width: 1200,
        height: 630,
        alt: 'Under Armour - Athletic Training',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Under Armour - The Only Way Is Through',
    description: 'Push beyond limits with premium athletic gear and performance apparel.',
    images: ['/intense-athlete-training-sketch.png'],
    creator: '@UnderArmour',
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
    icon: '/icon.png',
    apple: '/icon.png',
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Under Armour',
    description: 'Premium athletic gear and performance sportswear',
    url: 'https://github.com/Mostafa-SAID7/UNDER-ARMOUR',
    logo: '/icon.png',
    sameAs: [
      'https://twitter.com/UnderArmour',
      'https://www.facebook.com/UnderArmour',
      'https://www.instagram.com/underarmour',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${barriecito.variable} ${montserrat.variable} font-sans antialiased flex flex-col min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
