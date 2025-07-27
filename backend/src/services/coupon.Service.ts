// services/coupon.service.ts
import { prisma } from '../db/db';

interface CreateCouponInput {
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  maxUses: number;
  userLimit: number;
  expirationDate?: string;
}

export const getAllCoupons = async () => prisma.coupon.findMany();


export const applyCoupon = async (userId: string, code: string) => {
  const coupon = await prisma.coupon.findUnique({ where: { code } });
    console.log("couponnnnn",coupon)
  if (!coupon) throw new Error('Cupón no encontrado');

  if (!coupon.active || (coupon.expirationDate && new Date() > coupon.expirationDate)) {
    throw new Error('Este cupón ha expirado o está inactivo');
  }

  if (coupon.usedCount >= coupon.maxUses) {
    throw new Error('Este cupón ya alcanzó el límite de usos');
  }

  const alreadyUsed = await prisma.userCoupon.findFirst({
    where: { userId, couponId: coupon.id },
  });

  if (alreadyUsed) {
    throw new Error('Ya utilizaste este cupón');
  }

  // Registrar uso
  await prisma.$transaction([
    prisma.userCoupon.create({
      data: {
        userId,
        couponId: coupon.id,
        usedAt: new Date(),
      },
    }),
    prisma.coupon.update({
      where: { id: coupon.id },
      data: {
        usedCount: { increment: 1 },
      },
    }),
  ]);

  return {
    type: coupon.discountType,
    value: coupon.value,
    description: coupon.description,
    id: coupon.id,
  };
};

export const deleteCoupon = async (id: string) => {
  const existingOrders = await prisma.order.findMany({
    where: { couponId: id },
    select: { id: true },
  });

  if (existingOrders.length > 0) {
    throw new Error('No se puede eliminar: el cupón está siendo usado en órdenes existentes.');
  }

  return await prisma.coupon.delete({ where: { id } });
};


export const createCouponService = async (data: CreateCouponInput) => {
  const {
    code,
    description,
    discountType,
    value,
    maxUses,
    userLimit,
    expirationDate,
  } = data;

    const existing = await prisma.coupon.findUnique({
    where: { code },
  });

   if (existing) {
    throw new Error(`Ya existe un cupón con el código "${code}"`);
  }

  return prisma.coupon.create({
    data: {
      code,
      description,
      discountType,
      value,
      maxUses,
      userLimit,
      expirationDate: expirationDate ? new Date(expirationDate) : null,
    },
  });
};
