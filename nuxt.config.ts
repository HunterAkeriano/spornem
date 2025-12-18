export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/styles/main.scss', '@vuepic/vue-datepicker/dist/main.css'],
  components: [
    {
      path: '~/components',
      extensions: ['vue'],
      pathPrefix: false
    }
  ],
  app: {
    head: {
      title: 'Спорньом',
      meta: [
        { name: 'description', content: 'Публічні спори у спокійних морських відтінках' },
        { name: 'theme-color', content: '#0b3d91' }
      ]
    }
  },

  modules: ['@nuxtjs/i18n'],

  i18n: {
    vueI18n: './i18n.config.ts',
    langDir: 'locales',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'uk', name: 'Українська', file: 'uk.json' }
    ],
    lazy: true,
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

})
