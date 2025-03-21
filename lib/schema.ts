import { SITE_URL, SITE_NAME } from './constants';

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/image.png`,
    width: "192",
    height: "192"
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
    contactOption: "TollFree"
  }],
  address: {
    "@type": "PostalAddress",
    addressCountry: "KE",
    addressRegion: "Nairobi"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
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
  }]
};

export const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "IGCSE",
  description: "Comprehensive study materials and past papers for IGCSE students",
  provider: {
    "@id": `${SITE_URL}/#organization`
  },
};