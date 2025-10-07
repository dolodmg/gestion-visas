export default function OrganizationSchema() {
    const baseUrl = process.env.WEB_ADDRESS;
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ArgenVisa",
        "url": baseUrl,
        "logo": `${baseUrl}/images/logo.png`,
        "description": "Gestión profesional de visas para Estados Unidos y Canadá desde Argentina",
        "address": {
        "@type": "PostalAddress",
        "addressCountry": "AR"
        }
    };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}