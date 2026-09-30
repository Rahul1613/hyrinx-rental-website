import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/checkout', '/order/success'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Amazonbot'],
        allow: ['/', '/websites', '/pricing', '/how-it-works', '/faq', '/categories/', '/tools/', '/vs/', '/llms.txt'],
        disallow: ['/admin/', '/api/', '/checkout', '/order/success'],
      },
    ],
    sitemap: 'https://hyrinx.in/sitemap.xml',
    host: 'https://hyrinx.in',
  }
}
