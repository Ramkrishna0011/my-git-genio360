/**
 * Access token is held in memory only — never written to localStorage/sessionStorage,
 * per the "no secrets in local storage" security rule. It is naturally cleared on a full
 * page reload; the HttpOnly, backend-owned refresh-token cookie is what re-establishes a
 * session across reloads (a rehydrate call can be added when that endpoint exists).
 */
let accessToken: string | null = null;

export const tokenStore = {
  get: (): string | null => accessToken,
  set: (token: string | null): void => {
    accessToken = token;
  },
  clear: (): void => {
    accessToken = null;
  },
};
