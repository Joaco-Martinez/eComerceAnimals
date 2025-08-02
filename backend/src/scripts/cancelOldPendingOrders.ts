import { prisma } from '../db/db';
import { subHours } from 'date-fns';
import sendEmail from '../utils/sendEmail';
import mjml2html from 'mjml';

import { generateClientOrderCancelledMjmlTemplate } from '../utils/generateClientORderCancelledTemplate';
import { generateInternalOrderCancelledNotification } from '../utils/generateInnternalOrderCancelledNotification';

export const cancelOldPendingOrders = async () => {
  const expiredOrders = await prisma.order.findMany({
    where: {
      status: 'pending',
      createdAt: {
        lt: subHours(new Date(), 12),
      },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      user: true,
    },
  });

  for (const order of expiredOrders) {
    await prisma.$transaction([
      prisma.order.update({
        where: { id: order.id },
        data: { status: 'cancelled' },
      }),
      ...order.items.map((item) =>
        prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: { increment: item.quantity },
          },
        })
      ),
    ]);

    // 📩 Email al cliente
    const mjmlCliente = generateClientOrderCancelledMjmlTemplate({
      orderNumber: order.orderNumber,
      userName: order.user.name,
    });
    const { html: htmlCliente } = mjml2html(mjmlCliente);

    await sendEmail({
      to: order.user.email,
      subject: `Tu pedido #${order.orderNumber} fue cancelado automáticamente`,
      html: htmlCliente,
    });

    // 📩 Email interno a la tienda
    const mjmlInterno = generateInternalOrderCancelledNotification({
      userName: order.user.name,
      userEmail: order.user.email,
      orderNumber: order.orderNumber,
    });
    const { html: htmlInterno } = mjml2html(mjmlInterno);

    await sendEmail({
      to: 'mascotiendavgbpets@gmail.com',
      subject: `Cancelación automática de pedido #${order.orderNumber}`,
      html: htmlInterno,
    });
  }

  console.log(`[CANCELADOR] ${expiredOrders.length} pedidos cancelados automáticamente.`);
};
