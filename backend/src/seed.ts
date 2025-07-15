// prisma/seed.ts
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

  // Fotos para categorías (pueden repetirse)
  const categoryImages = [
    "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/pngtree-kids-toys-png-image_13394244_kmyer4",
    "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/pngtree-pets-accessories-pet-accessory-veterinary-png-image_6063863_iixn2o",
    "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/Premium-Cordero-RP-75kg-Perfil-2-OLD-1_kealtl"
  ];

  // Crear categorías únicas con imagen
  const categoryNames = [
    "Alimentos ", "Juguetes ", "Accesorios ", "Camas ",
    "Indumentaria ", "Snacks ", "Salud ", " Antipulgas",
    "Shampoo ", "Collares ", "Transportadoras", "Bebederos",
    "Cepillos ", "Invierno", "Botas ", "Pelotas ",
    "Mordedores", "Correas ", "Premios ", "Galletitas"
  ];

  await prisma.category.createMany({
  data: categoryNames.map((name, i) => ({
    name,
    description: `Productos de la categoría ${name}`,
    image: categoryImages[i % categoryImages.length], // usa "image" si ese es el campo
  })),
  skipDuplicates: true,
});

  // Obtener las categorías recién creadas
  const categories = await prisma.category.findMany();

  // Crear productos relacionados a las categorías
  const productData = categories.map((cat, i) => ({
    name: `Producto ${i + 1} - ${cat.name}`,
    description: `Este es un producto relacionado con la categoría ${cat.name.toLowerCase()}.`,
    price: 1000 + i * 100,
    stock: 15 + i,
    categoryId: cat.id,
  }));

  await prisma.product.createMany({
    data: productData,
  });

  console.log("✅ Seeder completado con 20 categorías y 20 productos con imágenes en categorías.");
}

main()
  .catch((e) => {
    console.error("❌ Error en el seeder:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
