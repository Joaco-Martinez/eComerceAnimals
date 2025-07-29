import { prisma } from '../db/db';
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  format,
  endOfDay,
  getDaysInMonth
} from 'date-fns';
import { es } from 'date-fns/locale';
export const getOverviewStatsService = async () => {
  const paidOrders = await prisma.order.findMany({
    where: {
      status: { in: ['paid', 'shipped', 'delivered'] },
    },
    include: {
      items: true,
    },
  });

  const totalRevenue = paidOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalOrders = paidOrders.length;

  const totalUnits = paidOrders.reduce(
    (acc, o) => acc + o.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  return {
    totalRevenue,
    totalOrders,
    avgTicket: totalOrders > 0 ? +(totalRevenue / totalOrders).toFixed(2) : 0,
    avgProductsPerOrder: totalOrders > 0 ? +(totalUnits / totalOrders).toFixed(2) : 0,
  };
};

export const getPetTypeSalesService = async () => {
  const result = await prisma.orderItem.findMany({
    include: {
      product: {
        select: {
          petType: true,
        },
      },
      order: {
        select: { status: true },
      },
    },
  });

  const filtered = result.filter((item) =>
    ['paid', 'shipped', 'delivered'].includes(item.order.status)
  );

  const petTypeCount: Record<string, number> = {};

  for (const item of filtered) {
    const type = item.product.petType;
    petTypeCount[type] = (petTypeCount[type] || 0) + item.quantity;
  }

  // ✅ Convertimos el objeto en array
  const formatted = Object.entries(petTypeCount).map(([petType, cantidad]) => ({
    petType,
    cantidad,
  }));

  return formatted;
};

export const getTopCategoriesSalesService = async () => {
  const orderItems = await prisma.orderItem.findMany({
    include: {
      product: {
        select: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      order: {
        select: {
          status: true,
        },
      },
    },
  });

  const filtered = orderItems.filter((item) =>
    ['paid', 'shipped', 'delivered'].includes(item.order.status)
  );

  const categoryCount: Record<string, { name: string; quantity: number }> = {};

  for (const item of filtered) {
    const categoryId = item.product.category.id;
    const categoryName = item.product.category.name;
    if (!categoryCount[categoryId]) {
      categoryCount[categoryId] = { name: categoryName, quantity: 0 };
    }
    categoryCount[categoryId].quantity += item.quantity;
  }

  // Convertir en array ordenado
  return Object.entries(categoryCount)
    .map(([id, data]) => ({ categoryId: id, ...data }))
    .sort((a, b) => b.quantity - a.quantity);
};

export const getTopColorsSalesService = async () => {
  const items = await prisma.orderItem.findMany({
    include: {
      order: {
        select: { status: true },
      },
    },
  });

  const filtered = items.filter((item) =>
    ['paid', 'shipped', 'delivered'].includes(item.order.status)
  );

  const colorCount: Record<string, number> = {};

  for (const item of filtered) {
    const color = item.color;
    colorCount[color] = (colorCount[color] || 0) + item.quantity;
  }

  return Object.entries(colorCount)
    .map(([color, quantity]) => ({ color, quantity }))
    .sort((a, b) => b.quantity - a.quantity);
};

export const getTopSizesSalesService = async () => {
  const items = await prisma.orderItem.findMany({
    include: {
      order: {
        select: { status: true },
      },
    },
  });

  const filtered = items.filter((item) =>
    ['paid', 'shipped', 'delivered'].includes(item.order.status)
  );

  const sizeCount: Record<string, number> = {};

  for (const item of filtered) {
    const size = item.size;
    sizeCount[size] = (sizeCount[size] || 0) + item.quantity;
  }

  return Object.entries(sizeCount)
    .map(([size, quantity]) => ({ size, quantity }))
    .sort((a, b) => b.quantity - a.quantity);
};


export const getPaymentMethodsStatsService = async () => {
  const pagos = await prisma.payment.findMany({
    where: { status: 'paid' },
  });

  const metodoCount: Record<string, number> = {};

  for (const pago of pagos) {
    const metodo = pago.method;
    metodoCount[metodo] = (metodoCount[metodo] || 0) + 1;
  }

  return Object.entries(metodoCount).map(([method, count]) => ({
    method,
    count,
  }));
};


export const getTopProductsSalesService = async () => {
  const items = await prisma.orderItem.findMany({
    include: {
      order: {
        select: { status: true },
      },
      product: {
        select: {
          id: true,
          name: true,
          images: { take: 1 },
        },
      },
    },
  });

  const filtered = items.filter((item) =>
    ['paid', 'shipped', 'delivered'].includes(item.order.status)
  );

  const productCount: Record<
    string,
    { name: string; quantity: number; imageUrl?: string }
  > = {};

  for (const item of filtered) {
    const { id, name, images } = item.product;
    if (!productCount[id]) {
      productCount[id] = {
        name,
        quantity: 0,
        imageUrl: images[0]?.url ?? null,
      };
    }
    productCount[id].quantity += item.quantity;
  }

  return Object.entries(productCount)
    .map(([productId, data]) => ({ productId, ...data }))
    .sort((a, b) => b.quantity - a.quantity);
};


export const getOrdersByStatusService = async () => {
  const orders = await prisma.order.groupBy({
    by: ['status'],
    _count: {
      status: true,
    },
  });

  return orders.map((o) => ({
    status: o.status,
    count: o._count.status,
  }));
};


export const getUnconvertedProductsSerrvice = async () => {
  const views = await prisma.productView.groupBy({
    by: ['productId'],
    _count: { productId: true },
  });

  const ventas = await prisma.orderItem.groupBy({
    by: ['productId'],
    _sum: { quantity: true },
  });

  const ventasMap = new Map(
    ventas.map((v) => [v.productId, v._sum.quantity ?? 0])
  );

  // Filtrar productos sin ventas y ordenar por vistas descendente
  const unconverted = views
    .filter((v) => (ventasMap.get(v.productId) ?? 0) === 0)
    .sort((a, b) => b._count.productId - a._count.productId);

  const result = await prisma.product.findMany({
    where: {
      id: { in: unconverted.map((u) => u.productId) },
    },
    select: {
      id: true,
      name: true,
      images: { take: 1 },
    },
  });

  return unconverted.map((u) => {
    const prod = result.find((p) => p.id === u.productId);
    return {
      productId: prod?.id ?? u.productId,
      name: prod?.name ?? 'Producto desconocido',
      views: u._count.productId,
      imageUrl: prod?.images[0]?.url ?? null,
    };
  });
};

export const registerProductViewService = async (productId: string, userId?: string | null) => {
  await prisma.productView.create({
    data: {
      productId,
      userId: userId ?? null,
    },
  });
};


export const getEarningsByYearService = async (year: number) => {
  const months = Array.from({ length: 12 }, (_, i) => i); // 0 (enero) a 11 (diciembre)

  const earnings = await Promise.all(
    months.map(async (month) => {
      const start = new Date(year, month, 1);
      const end = endOfMonth(start);

      const result = await prisma.order.aggregate({
        where: {
          status: 'paid',
          createdAt: {
            gte: start,
            lte: end,
          },
        },
        _sum: { totalAmount: true },
      });

      return {
        mes: month + 1, // Para mostrar como "1 = enero"
        total: result._sum.totalAmount ?? 0,
      };
    })
  );

  return earnings;
};

export const getEarningsByMonthService = async (year: number, month: number) => {
  const days = Array.from({ length: getDaysInMonth(new Date(year, month - 1)) }, (_, i) => i + 1);

  const earnings = await Promise.all(
    days.map(async (day) => {
      const start = new Date(year, month - 1, day, 0, 0, 0);
      const end = endOfDay(start);

      const result = await prisma.order.aggregate({
        where: {
          status: 'paid',
          createdAt: {
            gte: start,
            lte: end,
          },
        },
        _sum: { totalAmount: true },
      });

      return {
        dia: day,
        total: result._sum.totalAmount ?? 0,
      };
    })
  );

  return earnings;
};