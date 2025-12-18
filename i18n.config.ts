import type { I18nOptions } from 'vue-i18n'

export default defineI18nConfig((): I18nOptions => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  numberFormats: {
    en: { currency: { style: 'currency', currency: 'USD' } },
    uk: { currency: { style: 'currency', currency: 'UAH' } }
  }
}))
