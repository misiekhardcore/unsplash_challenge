declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    ORIGIN: string;
    DATABASE_URL: string;
  }
}
