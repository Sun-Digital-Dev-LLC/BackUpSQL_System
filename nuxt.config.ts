// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth'],
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: 'authjs'
    },
    globalMiddleware: true
  },
  runtimeConfig: {
    auth: {
      secret: process.env.AUTH_SECRET
    }
  }
})