
import { Analytics } from "@vercel/analytics/react";
import { metadata } from '@/lib/metadata';
import { SITE_URL } from '@/lib/constants';
import { geistSans, geistMono } from './components/Fonts';
import { SpeedInsights } from "@vercel/speed-insights/next"
import MetaTags from './components/MetaTags';
import StructuredData from './components/StructuredData';
import AppLayout from "./components/AppLayout";
import Footer from "./components/Footer";
import AuthProvider from "@/providers";
import "./globals.css";
export { metadata };
import PaymentCheck from '@/app/components/PaymentCheck';



const SITE_NAME = 'Clevers Schools Resources';
const SITE_DESCRIPTION = 'Access official IGCSE past papers, Cambridge resources, and Edexcel materials. Expert-curated lesson plans and teaching resources for international curriculum schools in Kenya.';

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "Clevers Schools",
    url: SITE_URL,
    logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/image.png`,
        contentUrl: `${SITE_URL}/image.png`,
        width: "112",
        height: "112",
        alternateName: "Clevers Schools Logo"
    },
    sameAs: [
        "https://www.facebook.com/cleversschools",
        "https://twitter.com/oritz_sir",

    ],
    contactPoint: [{
        "@type": "ContactPoint",
        telephone: "+25425449122",
        contactType: "customer service",
        areaServed: "KE",
        availableLanguage: ["en", "sw"],
        hoursAvailable: "Mo-Fr 08:00-17:00 EAT"
    }],
    address: {
        "@type": "PostalAddress",
        addressCountry: "KE",
        addressRegion: "Nairobi",
        addressLocality: "Nairobi",
        postalCode: "00100",
        streetAddress: "Your Street Address"
    }
};

// Website Schema optimized for Google Search
const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
        "@id": `${SITE_URL}/#organization`
    },
    potentialAction: [{
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
    }],
    inLanguage: ["en-KE", "sw-KE"]
};

// BreadcrumbList Schema for better navigation structure
const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/#breadcrumb`,
    itemListElement: [{
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL
    },
    {
        "@type": "ListItem",
        position: 2,
        name: "KCSE",
        item: `${SITE_URL}/kcse`
    },
    {
        "@type": "ListItem",
        position: 3,
        name: "IGCSE",
        item: `${SITE_URL}/igcse`
    },
    {
        "@type": "ListItem",
        position: 4,
        name: "AS/A Level",
        item: `${SITE_URL}/igcse/cambridge/A-Level`
    },
    {
        "@type": "ListItem",
        position: 5,
        name: "Junior Secondary",
        item: `${SITE_URL}/junior`
    },
    {
        "@type": "ListItem",
        position: 5,
        name: "senior Secondary",
        item: `${SITE_URL}/senior`
    },
    {
        "@type": "ListItem",
        position: 5,
        name: "elementary school",
        item: `${SITE_URL}/elementary`
    }
],
   
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const paid = true;
  

  return (
    <PaymentCheck paid={paid}>
    <AuthProvider>
      <html 
        lang="en" 
        className="h-full"
        suppressHydrationWarning
      >
        <head>
        <link rel="icon" href="/favicon.ico"/>
          <MetaTags />
          <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify([
                                organizationSchema,
                                websiteSchema,
                                breadcrumbSchema
                            ])
                        }}
                    />
          <StructuredData />
        </head>
        <body 
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full bg-pink-100`}
        >
         
          <AppLayout>{children}</AppLayout>
          <Analytics />
          <div className="max-w-screen-xl mx-auto">
          <Footer />
          </div>
          <SpeedInsights />
        </body>
      </html>
    </AuthProvider>
  </PaymentCheck>
  );
}