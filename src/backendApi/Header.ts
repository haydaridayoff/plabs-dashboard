const header = {
  AccessToken: "",
  RefreshToken: "",
};

export const getHeader = () => {
  return header;
};

export const setHeader = (accessToken: string, refreshToken: string) => {
  header.AccessToken = accessToken;
  header.RefreshToken = refreshToken;
};

export const clearHeader = () => {
  header.AccessToken = "";
  header.RefreshToken = "";
};

export const isHeaderSet = () => {
  return header.AccessToken !== "" && header.RefreshToken !== "";
};

export const getAccessToken = () => {
  return header.AccessToken;
};

export const getRefreshToken = () => {
  return header.RefreshToken;
};

export const setAccessToken = (accessToken: string) => {
  header.AccessToken = accessToken;
};

export const setRefreshToken = (refreshToken: string) => {
  header.RefreshToken = refreshToken;
};

export const clearAccessToken = () => {
  header.AccessToken = "";
};

export const clearRefreshToken = () => {
  header.RefreshToken = "";
};

export const saveHeader = () => {
  localStorage.setItem("header", JSON.stringify(header));
};

export const loadHeader = () => {
  const headerString = localStorage.getItem("header");
  console.log("headerString: " + headerString);
  if (headerString) {
    const headerJson = JSON.parse(headerString);
    header.AccessToken = headerJson.AccessToken;
    header.RefreshToken = headerJson.RefreshToken;
  }
};

export const clearSavedHeader = () => {
  localStorage.removeItem("header");
};
