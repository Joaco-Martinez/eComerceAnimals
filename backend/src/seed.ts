import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hasheamos contraseñas
  const password = await bcrypt.hash('123456', 10);

  // Crear usuarios
  const joaco = await prisma.user.upsert({
    where: { email: 'joaco.martinez1480@gmail.com' },
    update: {},
    create: {
      name: 'Joaco Martínez',
      email: 'joaco.martinez1480@gmail.com',
      password,
      role: 'customer',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ecommerce.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@ecommerce.com',
      password,
      role: 'admin',
    },
  });

  // Crear categorías
  const category = await prisma.category.upsert({
    where: { name: 'Accesorios' },
    update: {},
    create: {
      name: 'Accesorios',
      description: 'Productos para mascotas',
    },
  });

  // Crear productos
  await prisma.product.createMany({
    data: [
      {
        name: 'Collar de cuero',
        description: 'Collar resistente para perros medianos',
        price: 1999.99,
        stock: 50,
        categoryId: category.id,
      },
      {
        name: 'Juguete mordedor',
        description: 'Juguete de goma para limpieza dental',
        price: 899.5,
        stock: 100,
        categoryId: category.id,
      },
    ],
  });

  console.log('✅ Seeder completado con éxito');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seeder:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
