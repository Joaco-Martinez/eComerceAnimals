import apiService from "./apiService";
export interface CouponInput {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  maxUses: number;
  userLimit: number;
  expirationDate: string; // ISO string
}

export const getCoupons = async () => {
    return await apiService.get("/coupons", true, false, false);
};

export const createCoupon = async (coupon: CouponInput) => {
    return await apiService.post("/coupons", coupon, true, true, true);
};

export const deleteCoupon = async (id: string) => {
    return await apiService.del(`/coupons/${id}`, true, true, true);
};