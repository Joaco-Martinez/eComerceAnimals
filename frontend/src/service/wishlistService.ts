import apiService from './apiService';

export const getWishlist = async () => {
  return apiService.get('/wishlist');
};

export const toggleWishlistItem = async (productId: string) => {
  return apiService.post('/wishlist/toggle', { productId });
};
