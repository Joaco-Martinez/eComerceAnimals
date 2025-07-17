import { prisma } from '../db/db';

export const createOrderFromCart = async (
  userId: string,
  addressId: string,
  couponCode?: string
) => {
  // Verificamos carrito
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart || cart.items.length === 0) throw new Error('El carrito está vacío');

  // Verificamos dirección
  const address = await prisma.address.findFirst({ where: { id: addressId, userId } });
  if (!address) throw new Error('Dirección no válida');

  // Cupón opcional
  let coupon = null;
  if (couponCode) {
    coupon = await prisma.coupon.findFirst({
      where: { code: couponCode, active: true },
    });
    if (!coupon) throw new Error('Cupón inválido');
  }

  // Total sin cupón
  let total = cart.items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  // Aplicamos cupón
  if (coupon) {
    if (coupon.discountType === 'percentage') {
      total = total - total * (coupon.value / 100);
    } else if (coupon.discountType === 'fixed') {
      total = Math.max(0, total - coupon.value);
    }
    // free_shipping no aplica descuento directo, lo podés usar en el envío si lo implementás
  }

  // Creamos orden
  const order = await prisma.order.create({
    data: {
      userId,
      addressId,
      totalAmount: total,
      couponId: coupon?.id,
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.product.price,
        })),
      },
    },
    include: {
      items: true,
    },
  });

  // Marcamos cupón como usado (si tiene límite por usuario)
  if (coupon) {
    await prisma.userCoupon.create({
      data: {
        userId,
        couponId: coupon.id,
        usedAt: new Date(),
      },
    });

    await prisma.coupon.update({
      where: { id: coupon.id },
      data: { usedCount: { increment: 1 } },
    });
  }

  for (const item of cart.items) {
    await prisma.product.update({
      where: { id: item.productId },
      data: {
        stock: {
          decrement: item.quantity,
        },
      },
    });
  }

  // Vaciamos carrito
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  return order;
};

export const getUserOrders = async (userId: string) => {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      items: { include: { product: true } },
      address: true,
      coupon: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};
