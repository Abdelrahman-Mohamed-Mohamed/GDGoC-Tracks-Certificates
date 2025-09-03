declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    SMTP_HOST?: string;
    SMTP_PORT?: string;
    SMTP_USER?: string;
    SMTP_PASS?: string;
    EMAIL_FROM?: string;
    APP_BASE_URL?: string;
    SEED_LEAD_EMAIL?: string;
    SEED_LEAD_PASSWORD?: string;
    SEED_LEAD_NAME?: string;
  }
}

