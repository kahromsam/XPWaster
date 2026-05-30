import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/XPWaster/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
      manifest: {
        name: 'XP Waster',
        short_name: 'XP Waster',
        description: 'OSRS-tyylinen skill tracker',
        theme_color: '#0d0d1a',
        background_color: '#0d0d1a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/XPWaster/',
        icons: [
          {
            src: 'xpwastericon.jpg',
            sizes: '1024x1024',
            type: 'image/jpeg',
          },
          {
            src: 'xpwastericon.jpg',
            sizes: '1024x1024',
            type: 'image/jpeg',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
}))
