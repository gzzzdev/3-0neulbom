// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit'

const resolver = createResolver(import.meta.url)

const isDevelop = (process.env as any).NUXT_PUBLIC_NODE_ENV == 'DEVELOP';
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  extends: [
    isDevelop ?
      ['../base', { install: true, meta: { name: 'base', } }] :
      ['github:gzzzdev/base', { auth: (process.env as any).GITHUB_BASE_TOKEN, install: true, meta: { name: 'base', } }]
  ],
  // alias: {
  //   '#base': isDevelop ? resolver.resolve('../base')
  //     : resolver.resolve('node_modules/.nuxt/layers/base')
  // },
  modules: ['@pinia/nuxt', '@nuxt/content', '@nuxt/image'],
  // modules: ['@pinia/nuxt', '@nuxt/content', '@nuxt/image', '@nuxt/ui'],
  dir: { public: '_myData/public', },
  pinia: {
    storesDirs: []
  },
  // devServer: { port: 3003 },
  devServer: { port: 3000 },
  // nitro: {
  //   externals: {
  //     inline: ['better-sqlite3']
  //   }
  // }
})