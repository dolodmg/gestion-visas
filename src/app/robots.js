export default function robots() {
    const baseUrl = process.env.WEB_ADDRESS;
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/checkout/', '/payment/']
        },
        sitemap: `${baseUrl}/sitemap.xml` 
    };
}