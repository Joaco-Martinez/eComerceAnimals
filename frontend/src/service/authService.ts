import apiService from "./apiService";

export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  return await apiService.post("/auth/register", userData, false,  false, true);
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  return await apiService.post("/auth/login", credentials, false, false, true);
};

export const logoutUser = async () => {
  return await apiService.post("/auth/logout", {}, true, true, false);
};

export const getCurrentUser = async () => {
  return await apiService.get("/auth/me", true, false, false);
};

export const verifyEmailCode = async (email: string, code: string) => {
  return await apiService.post("/auth/verify-email", { email, code }, false,);
};