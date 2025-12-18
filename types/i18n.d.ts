import uk from '../locales/uk.json'

type MessageSchema = typeof uk

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}
