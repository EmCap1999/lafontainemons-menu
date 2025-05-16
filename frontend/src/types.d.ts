declare global {
  interface ImportMeta {
    readonly env: {
      readonly NODE_ENV: string
      readonly FRONTEND_URL: string
      readonly BACKEND_PORT: string
      readonly POSTGRES_USER: string
      readonly POSTGRES_PASSWORD: string
      readonly POSTGRES_DB: string
      readonly POSTGRES_PORT: string
      readonly DATABASE_URL: string
      readonly [key: string]: string | boolean | undefined
    }
  }
}

export {}
