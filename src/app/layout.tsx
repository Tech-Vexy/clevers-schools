import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppLayout from "./components/AppLayout";
import Footer from "./components/Footer";
import AuthProvider from "@/providers";
import { Analytics } from "@vercel/analytics/react"

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
    display: "swap", // Improve font loading performance
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
    display: "swap",
});

const SITE_URL = 'https://resources.clevers.co.ke';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Clevers Schools Resources | Educational Resources & Learning Materials",
        template: "%s | Clevers Schools Resources"
    },
    description: "Access comprehensive educational materials including IGCSE past papers, Cambridge resources, Edexcel materials, and expert-curated lesson plans. Your trusted source for high-quality teaching and learning resources.",
    keywords: [
        "education resources",
        "school materials",
        "teaching resources",
        "IGCSE past papers",
        "Cambridge curriculum",
        "Edexcel materials",
        "lesson plans",
        "educational content",
        "Clevers Schools",
        "Kenya education",
        "online learning",
        "study materials",
        "exam preparation",
        "teacher resources",
        "student resources"
    ],
    authors: [
        {
            name: "Clevers Schools",
            url: "https://resources.clevers.co.ke",
        }
    ],
    creator: "Clevers Schools",
    publisher: "Clevers Schools",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    applicationName: "Clevers Schools Resources",
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
        siteName: 'Clevers Schools Resources',
        title: 'Educational Resources & Learning Materials | Clevers Schools Resources',
        description: 'Access comprehensive educational materials including IGCSE past papers, Cambridge resources, and expert-curated lesson plans.',
        images: [
            {
                url: `${SITE_URL}/images/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: 'Clevers Schools Educational Resources Platform',
                type: 'image/jpeg',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@ortiz_sir',
        creator: 'Clevers Schools',
        title: 'Educational Resources & Learning Materials | Clevers Schools',
        description: 'Access comprehensive educational materials including IGCSE past papers, Cambridge resources, and expert-curated lesson plans.',
        images: [`${SITE_URL}/images/twitter-image.jpg`],
    },
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: '32x32' },
            { url: '/image.png', type: 'image/png', sizes: '192x192' },
        ],
        apple: [
            { url: '/image.png', sizes: '180x180' },
        ],
        other: [
            {
                rel: 'mask-icon',
                url: '/safari-pinned-tab.svg',
                color: '#5bbad5',
            },
        ],
    },
    manifest: '/manifest.json',
    alternates: {
        canonical: SITE_URL,
        languages: {
            'en-US': SITE_URL,
            'en-GB': `${SITE_URL}/gb`,
        },
    },
    category: 'education',
};

// Structured Data for Organization
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Clevers Schools",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    sameAs: [
        "https://www.facebook.com/cleversschools",
        "https://twitter.com/oritz_sir",
        "https://www.linkedin.com/company/clevers-schools",
    ],
    contactPoint: {
        "@type": "ContactPoint",
        telephone: "+25425449122",
        contactType: "customer service",
        areaServed: "KE",
        availableLanguage: ["en"],
    },
};

// Structured Data for Website
const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Clevers Schools Resources",
    url: SITE_URL,
    potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            <html lang="en" className="h-full">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"/>
                <meta name="theme-color" content="#ffffff"/>
                <meta name="mobile-web-app-capable" content="yes"/>
                <meta name="msvalidate.01" content="B3A29B622D62EFA5479E475B0AD68817"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
                <meta name="format-detection" content="telephone=no"/>
                <meta name="apple-mobile-web-app-title" content="Clevers Schools Resources"/>
                <link rel="manifest" href="/manifest.json"/>
                <link rel="apple-touch-icon" href="/apple-icon.png"/>

                {/* Preconnect to external domains */}
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(organizationSchema)}}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(websiteSchema)}}
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full`}>
            <AppLayout>{children}</AppLayout>
            <Analytics />
            <Footer />
            </body>
            </html>
        </AuthProvider>
    );
}