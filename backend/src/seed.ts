// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function getRandomSubset<T>(array: T[]): T[] {
  const subset = [];
  const length = Math.floor(Math.random() * array.length) + 1;
  const shuffled = array.sort(() => 0.5 - Math.random());
  for (let i = 0; i < length; i++) subset.push(shuffled[i]);
  return [...new Set(subset)];
}

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
      image: categoryImages[i % categoryImages.length],
    })),
    skipDuplicates: true,
  });

  const categories = await prisma.category.findMany();

  const sizes = ["S", "M", "L", "XL"];
  const colors = [
    "#FF0000", "#0000FF", "#008000",
    "#000000", "#FFFFFF", "#FFFF00"
  ];

  const productImages = [
    "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda",
    "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs",
    "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp",
    "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4",
  ];

  for (const [i, cat] of categories.entries()) {
    await prisma.product.create({
      data: {
        name: `Producto ${i + 1} - ${cat.name.trim()}`,
        description: `Este es un producto relacionado con la categoría ${cat.name.toLowerCase().trim()}.`,
        price: 10000 + i * 500, // ⬅️ Asegura precio mínimo de 5 dígitos (10.000+)
        stock: 15 + i,
        weight: 0.2 + i * 0.1,
        size: getRandomSubset(sizes),
        color: getRandomSubset(colors),
        sku: `SKU-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${i + 1}`,
        categoryId: cat.id,
        images: {
          create: [
            { url: productImages[i % productImages.length] },
            { url: productImages[(i + 1) % productImages.length] },
            { url: productImages[(i + 2) % productImages.length] },
          ],
        },
      },
    });
  }

  console.log("✅ Seeder completado con 20 categorías y productos con precios desde $10.000.");
}

main()
  .catch((e) => {
    console.error("❌ Error en el seeder:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
