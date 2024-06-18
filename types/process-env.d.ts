export interface EnvironmentVariables {
  PORT: number
  DATABASE_PORT: number
  DATABASE_HOST: string
  DATABASE_USER: string
  DATABASE_PASSWORD: string
  DATABASE_NAME: string
  DATABASE_URL: string
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}

declare module 'bun' {
  interface Env extends EnvironmentVariables {}
}
