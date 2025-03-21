import { Metadata } from 'next';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, KEYWORDS } from './constants';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Educational Resources & Learning Materials`,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: [...KEYWORDS],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [{
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: `${SITE_NAME} Preview`,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ortiz_sir',
    creator: '@cleversschools',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  icons: {
    icon: [
        {url: '/favicon-16x16.png', sizes: '16x16'},
      { url: '/favicon-32x32.png', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [{ rel: 'android-chrome', url: '/android-chrome-192x192.png' }],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-US': SITE_URL,
        'en-GB': SITE_URL,
    },
  },
  category: 'education',
  verification: {
    google: 'c-NwtNdGhjUcQwswqWmSYhJqZkUOnx_iZz-51S-_j3E',
    yandex: '574d409cef9d74e3',
  },
};