export default function ServiceSchema({ name, description, price }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "ArgenVisa"
    },
    "areaServed": "AR",
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "USD"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}