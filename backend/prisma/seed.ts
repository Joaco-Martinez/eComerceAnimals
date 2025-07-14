import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Drop all data
  await prisma.$executeRawUnsafe(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);

  // Re-run migrations (esto no es necesario si hacés `db push`)
  // await prisma.$executeRawUnsafe(`...`)

  // Seed: categorías
  const categorias = await prisma.category.createMany({
    data: [
      { name: "Alimentos", description: "Comida balanceada", image: "https://dummyimage.com/656x899" },
      { name: "Juguetes", description: "Juguetes para perros", image: "https://placeimg.com/748/195/any" },
      { name: "Accesorios", description: "Collares, camas", image: "https://www.lorempixel.com/85/901" },
    ],
  });

  // Seed: productos
  const productos = await prisma.product.createMany({
    data: [
      {
        name: "Occaecati para perros",
        description: "Culpa earum magni...",
        price: 8217.3,
        stock: 39,
        weight: 1.43,
        size: "XL",
        color: "Verde",
        sku: "66608417",
        categoryId: 2,
      },
      {
        name: "Error para perros",
        description: "Quos qui eveniet...",
        price: 11686.44,
        stock: 30,
        weight: 3.75,
        size: "L",
        color: "Rojo",
        sku: "71546421",
        categoryId: 3,
      }
    ]
  });

  console.log("✅ Base de datos reseteada y poblada.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
