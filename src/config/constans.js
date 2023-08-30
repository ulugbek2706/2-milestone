export const BASE_URL = "http://localhost:8080";

export const clearLocalStorageItem = () => {
  window.location.href = "/";
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("rememberMe");
};
