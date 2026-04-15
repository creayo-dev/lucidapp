// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lucidapp.co',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      serialize(item) {
        item.lastmod = new Date().toISOString();
        const url = item.url;
        if (url.endsWith('lucidapp.co') || url.endsWith('lucidapp.co/')) {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (url.includes('/support')) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.5;
          item.changefreq = 'yearly';
        }
        return item;
      },
    }),
  ],
});
