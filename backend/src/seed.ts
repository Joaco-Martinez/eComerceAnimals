import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('123456', 10);

  // Crear usuarios
  await prisma.user.upsert({
    where: { email: 'joaco.martinez1480@gmail.com' },
    update: {},
    create: {
      name: 'Joaco Martínez',
      email: 'joaco.martinez1480@gmail.com',
      password,
      role: 'customer',
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@ecommerce.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@ecommerce.com',
      password,
      role: 'admin',
    },
  });

  // Crear 20 categorías únicas
  const categoryNames = [
    "Alimentos Premium", "Juguetes Interactivos", "Accesorios de Paseo", "Camas y Cuchas",
    "Indumentaria Canina", "Snacks Naturales", "Salud y Cuidado", "Productos Antipulgas",
    "Shampoo y Baño", "Collares Personalizados", "Transportadoras", "Bebederos y Comederos",
    "Cepillos y Peines", "Ropa de Invierno", "Botas y Protección", "Pelotas y Lanzadores",
    "Cuerdas y Mordedores", "Correas Retráctiles", "Premios Dentales", "Galletitas Caseras"
  ];

  await prisma.category.createMany({
    data: categoryNames.map(name => ({
      name,
      description: `Productos de la categoría ${name}`,
    })),
    skipDuplicates: true,
  });

  const allCategories = await prisma.category.findMany();

  // Crear 20 productos, cada uno con una categoría distinta
  await prisma.product.createMany({
    data: allCategories.map((cat, i) => ({
      name: `Producto ${i + 1} - ${cat.name}`,
      description: `Este es un producto relacionado con ${cat.name.toLowerCase()}.`,
      price: 1000 + i * 500,
      stock: 20 + i,
      categoryId: cat.id,
    })),
  });

  console.log('✅ Seeder completado con 20 productos y 20 categorías.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seeder:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
