import { SITE_NAME } from '@/lib/constants';

export default function MetaTags() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
      <meta name="format-detection" content="telephone=no"/>
      <meta name="apple-mobile-web-app-title" content={SITE_NAME}/>
      <meta property="og:url" content="https://schoolresources.clevers.co.ke/"/>
      <meta property="og:type" content="website"/>
      <meta property="og:title" content=" Clevers Schools Resources |Educational Resources & Learning Materials"/>
      <meta property="og:description" content="Access comprehensive educational materials including IGCSE past papers, Cambridge resources, and expert-curated lesson plans."/>
      <meta property="og:image" content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v4/schoolresources.clevers.co.ke/Educational%20Resources%20%26%20Learning%20Materials%20%7C%20Clevers%20Schools%20Resources/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fimages%2F00c04736-f8c5-4a09-b83c-a6f52cd88c8e.png%3Ftoken%3DPyxSLfScD8z7EO540307NMKn2dxEFv0KsFVu2HATSkg%26height%3D500%26width%3D500%26expires%3D33267314625/og.png"/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta property="twitter:domain" content="schoolresources.clevers.co.ke"/>
      <meta property="twitter:url" content="https://schoolresources.clevers.co.ke/"/>
      <meta name="twitter:title" content="Educational Resources & Learning Materials | Clevers Schools Resources"/>
      <meta name="twitter:description" content="Access comprehensive educational materials including IGCSE past papers, Cambridge resources, and expert-curated lesson plans."/>
      <meta name="twitter:image" content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v4/schoolresources.clevers.co.ke/Educational%20Resources%20%26%20Learning%20Materials%20%7C%20Clevers%20Schools%20Resources/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fimages%2F00c04736-f8c5-4a09-b83c-a6f52cd88c8e.png%3Ftoken%3DPyxSLfScD8z7EO540307NMKn2dxEFv0KsFVu2HATSkg%26height%3D500%26width%3D500%26expires%3D33267314625/og.png"/>
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data:; img-src 'self' https: data: blob:; font-src 'self' https: data:;" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
      <link rel="preload" href="/fonts/GeistVF.woff" as="font" type="font/woff" crossOrigin="anonymous"/>
      <link rel="preload" href="/fonts/GeistMonoVF.woff" as="font" type="font/woff" crossOrigin="anonymous"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link rel="dns-prefetch" href="https://fonts.googleapis.com"/>
    </>
  );
}