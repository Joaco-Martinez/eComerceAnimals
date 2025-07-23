import { prisma } from '../db/db' // o donde tengas tu instancia real

export const deleteUnverifiedUsers = async () => {
  const now = new Date();

  const usersToDelete = await prisma.user.findMany({
    where: {
      isEmailVerified: false,
      emailVerificationExpires: { lt: now },
    },
    select: { id: true },
  });

  const ids = usersToDelete.map((u) => u.id);

  if (ids.length === 0) {
    console.log('No hay usuarios vencidos para eliminar.');
    return;
  }

  // Relaciones
  await prisma.notification.deleteMany({ where: { userId: { in: ids } } });
  await prisma.userCoupon.deleteMany({ where: { userId: { in: ids } } });
  await prisma.review.deleteMany({ where: { userId: { in: ids } } });
  await prisma.order.deleteMany({ where: { userId: { in: ids } } });
  await prisma.cart.deleteMany({ where: { userId: { in: ids } } });
  await prisma.address.deleteMany({ where: { userId: { in: ids } } });

  await prisma.user.deleteMany({ where: { id: { in: ids } } });

  console.log(`Usuarios eliminados: ${ids.length}`);
};

deleteUnverifiedUsers()
  .then(() => console.log('Tarea completa.'))
  .catch((err) => console.error('Error al eliminar usuarios:', err));
