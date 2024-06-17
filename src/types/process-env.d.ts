interface LocalEnvs {
  PAGE_SCRAPING_URL: string
  // CHEERIO
  CHEERIO_HTML_SELECTOR: string
  // TWILIO
  TWILIO_ACCOUNT_SID: string
  TWILIO_AUTH_TOKEN: string
  TWILIO_PHONE_NUMBER: string
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends LocalEnvs {}
  }
}

declare module 'bun' {
  interface Env extends LocalEnvs {}
}
