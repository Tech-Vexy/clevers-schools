import { organizationSchema, websiteSchema, courseSchema } from '@/lib/schema';

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            organizationSchema,
            websiteSchema,
            courseSchema
          ]
        })
      }}
    />
  );
}