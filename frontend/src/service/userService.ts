import apiService from "./apiService";

export const forgotPassword = async (email: string) => {
  return await apiService.post(
    '/users/forgot-password',
    { email },        
    false,           
    true,            
    true             
  );
};

  export const mergeAnonCart = async (anonCartId: string) => {
  return await apiService.post("/cart/merge", { anonCartId }, true, false, false);
};

export const resetPassword = async (email: string, code: string, newPassword: string) => {
  return await apiService.post(
    '/users/reset-password',
    { email, code, newPassword },
    false,  
    true,     
    true    
  );
};