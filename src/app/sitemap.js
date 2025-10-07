export default function sitemap() {
  const baseUrl = process.env.WEB_ADDRESS;
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: `${baseUrl}/usa`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/canada`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    }
  ];
}