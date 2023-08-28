// tokenManager.ts

const ACCESS_TOKEN_KEY = "access_token";

export const setAccessToken = (newToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, newToken); // Save to local storage
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY); // Retrieve from local storage
};

export const clearAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY); // Remove from local storage
};
