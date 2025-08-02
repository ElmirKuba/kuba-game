declare namespace NodeJS {
  interface ProcessEnv {
    ACCESS_KEY_JWT: string;
    REFRESH_KEY_JWT: string;
    ACCESS_TOKEN_LIFETIME: string;
    REFRESH_TOKEN_LIFETIME: string;
  }
}
