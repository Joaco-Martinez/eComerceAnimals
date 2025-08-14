// import { prisma } from './db/db'; // ajustá la ruta si lo tenés en otro lado
// import bcrypt from 'bcrypt';

// async function main() {
//   const hashedPassword = await bcrypt.hash('Moreno16', 10);

//   await prisma.user.upsert({
//     where: { email: 'mascotiendavgbpets@gmail.com' },
//     update: {},
//     create: {
//       name: 'Punky Pet admin',
//       email: 'mascotiendavgbpets@gmail.com',
//       password: hashedPassword,
//       role: 'admin', // ⚠️ Asegurate de tener un enum o string válido
//       isEmailVerified: true,
//     },
//   });

//   console.log('✅ Usuario admin creado');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(() => {
//     prisma.$disconnect();
//   });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function main() {
  await prisma.image.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  // Crear usuarios
  const hashedPassword = await bcrypt.hash("123456", 10);

  const joaco = await prisma.user.create({
    data: {
      name: "Joaco",
      email: "joaco.martinez1480@gmail.com",
      password: hashedPassword,
      role: "customer",
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  // Crear direcciones para Joaco
  await prisma.address.createMany({
    data: [
      {
        userId: joaco.id,
        postalCode: "1405",
        nombre: "Joaco",
        apellido: "Martínez",
        telefono: "1123456789",
        dni: "12345678",
        provincia: "Buenos Aires",
        localidad: "Buenos Aires",
        calle: "Av. Siempre Viva 123",
        piso: "3B",
      },
      {
        userId: joaco.id,
        postalCode: "1900",
        nombre: "Joaco",
        apellido: "Martínez",
        telefono: "1198765432",
        dni: "12345678",
        provincia: "Buenos Aires",
        localidad: "La Plata",
        calle: "Calle Falsa 456",
        piso: "PB",
      },
    ],
    skipDuplicates: true,
  });

  const createdCategories = await prisma.category.createMany({
    data: [
      { name: "Alimentos", description: `Todo lo esencial en alimentos para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/pngtree-kids-toys-png-image_13394244_kmyer4", petType: "both" },
  { name: "Juguetes", description: `Todo lo esencial en juguetes para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/pngtree-pets-accessories-pet-accessory-veterinary-png-image_6063863_iixn2o", petType: "dog" },
  { name: "Pelotas", description: `Todo lo esencial en pelotas para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/Premium-Cordero-RP-75kg-Perfil-2-OLD-1_kealtl", petType: "dog" },
  { name: "Rascadores", description: `Todo lo esencial en rascadores para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/pngtree-kids-toys-png-image_13394244_kmyer4", petType: "cat" },
  { name: "Collares", description: `Todo lo esencial en collares para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/pngtree-pets-accessories-pet-accessory-veterinary-png-image_6063863_iixn2o", petType: "both" },
  { name: "Correas", description: `Todo lo esencial en correas para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/Premium-Cordero-RP-75kg-Perfil-2-OLD-1_kealtl", petType: "dog" },
  { name: "Camas", description: `Todo lo esencial en camas para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/pngtree-kids-toys-png-image_13394244_kmyer4", petType: "both" },
  { name: "Ropa", description: `Todo lo esencial en ropa para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/pngtree-pets-accessories-pet-accessory-veterinary-png-image_6063863_iixn2o", petType: "both" },
  { name: "Snacks", description: `Todo lo esencial en snacks para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/Premium-Cordero-RP-75kg-Perfil-2-OLD-1_kealtl", petType: "both" },
  { name: "Higiene", description: `Todo lo esencial en higiene para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/pngtree-kids-toys-png-image_13394244_kmyer4", petType: "both" },
  { name: "Shampoo", description: `Todo lo esencial en shampoo para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/pngtree-pets-accessories-pet-accessory-veterinary-png-image_6063863_iixn2o", petType: "both" },
  { name: "Salud", description: `Todo lo esencial en salud para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/Premium-Cordero-RP-75kg-Perfil-2-OLD-1_kealtl", petType: "both" },
  { name: "Antipulgas", description: `Todo lo esencial en antipulgas para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/pngtree-kids-toys-png-image_13394244_kmyer4", petType: "both" },
  { name: "Cepillos", description: `Todo lo esencial en cepillos para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/pngtree-pets-accessories-pet-accessory-veterinary-png-image_6063863_iixn2o", petType: "both" },
  { name: "Viajes", description: `Todo lo esencial en viajes para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/Premium-Cordero-RP-75kg-Perfil-2-OLD-1_kealtl", petType: "both" },
  { name: "Bebederos", description: `Todo lo esencial en bebederos para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/pngtree-kids-toys-png-image_13394244_kmyer4", petType: "both" },
  { name: "Paseo", description: `Todo lo esencial en paseo para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/pngtree-pets-accessories-pet-accessory-veterinary-png-image_6063863_iixn2o", petType: "dog" },
  { name: "Botas", description: `Todo lo esencial en botas para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/Premium-Cordero-RP-75kg-Perfil-2-OLD-1_kealtl", petType: "dog" },
  { name: "Invierno", description: `Todo lo esencial en invierno para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/pngtree-kids-toys-png-image_13394244_kmyer4", petType: "both" },
  { name: "Transportadoras", description: `Todo lo esencial en transportadoras para el bienestar de tu mascota.`, image: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/pngtree-pets-accessories-pet-accessory-veterinary-png-image_6063863_iixn2o", petType: "both" }
    ],
  });

  const categories = await prisma.category.findMany();


  // Crear productos
  await prisma.product.create({
  data: {
    name: "Juguetes Premium 1",
    description: `Juguetes de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 5911, shippingCost: 1500,
    stock: 0,
    weight: 0.3,
    size: ["XL"],
    color: ["#000000", "#0000FF"],
    sku: "SKU-PWB6SL-1",
    categoryId: categories[0].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Pelotas Premium 2",
    description: `Pelotas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 6022,
    stock: 5, shippingCost: 2500,
    weight: 0.35,
    size: ["L", "S", "XL"],
    color: ["#000000", "#FF0000"],
    sku: "SKU-38JAQQ-2",
    categoryId: categories[1].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Rascadores Premium 3",
    description: `Rascadores de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 6133,
    stock: 35,
    weight: 0.4, shippingCost: 1500,
    size: ["L", "M"],
    color: ["#0000FF"],
    sku: "SKU-U8RJDU-3",
    categoryId: categories[2].id,
    petType: "cat",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Collares Premium 4",
    description: `Collares de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 6244,
    stock: 10,
    weight: 0.45, shippingCost: 1500,
    size: ["XL", "M", "L"],
    color: ["#008000", "#000000", "#FF0000"],
    sku: "SKU-EU2A3Y-4",
    categoryId: categories[3].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Correas Premium 5",
    description: `Correas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 6355,
    stock: 31, shippingCost: 1500,
    weight: 0.5,
    size: ["M", "S"],
    color: ["#FFFFFF", "#FFFF00", "#FF0000"],
    sku: "SKU-3X41NB-5",
    categoryId: categories[4].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Camas Premium 6",
    description: `Camas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 6466, shippingCost: 1500,
    stock: 37,
    weight: 0.55,
    size: ["S", "L"],
    color: ["#000000", "#FF0000", "#FFFFFF"],
    sku: "SKU-972G4K-6",
    categoryId: categories[5].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Ropa Premium 7",
    description: `Ropa de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 6577,
    stock: 26,
    weight: 0.6, shippingCost: 1500,
    size: ["S", "L", "XL"],
    color: ["#FFFF00", "#FFFFFF"],
    sku: "SKU-ICONEK-7",
    categoryId: categories[6].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Snacks Premium 8",
    description: `Snacks de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 6688,
    stock: 10, shippingCost: 1500,
    weight: 0.25,
    size: ["L", "S", "M"],
    color: ["#000000"],
    sku: "SKU-2VM1UY-8",
    categoryId: categories[7].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Higiene Premium 9",
    description: `Higiene de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 6799,
    stock: 10, shippingCost: 1500,
    weight: 0.3,
    size: ["S", "XL"],
    color: ["#008000", "#000000"],
    sku: "SKU-E3OQG6-9",
    categoryId: categories[8].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Shampoo Premium 10",
    description: `Shampoo de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 6910,
    stock: 14, shippingCost: 1500,
    weight: 0.35,
    size: ["L", "S"],
    color: ["#FFFFFF"],
    sku: "SKU-PE6PKH-10",
    categoryId: categories[9].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Salud Premium 11",
    description: `Salud de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 7021,
    stock: 38,
    weight: 0.4, shippingCost: 1500,
    size: ["XL"],
    color: ["#0000FF", "#008000"],
    sku: "SKU-85YZKH-11",
    categoryId: categories[10].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Antipulgas Premium 12",
    description: `Antipulgas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 7132,
    stock: 25, shippingCost: 1500,
    weight: 0.45,
    size: ["L", "S", "XL"],
    color: ["#FFFFFF", "#FF0000"],
    sku: "SKU-ACWJ7Y-12",
    categoryId: categories[11].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Cepillos Premium 13",
    description: `Cepillos de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 7243,
    stock: 25,
    weight: 0.5, shippingCost: 1500,
    size: ["M"],
    color: ["#FFFFFF", "#000000", "#FF0000"],
    sku: "SKU-0SHY7R-13",
    categoryId: categories[12].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Viajes Premium 14",
    description: `Viajes de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 7354,
    stock: 32, shippingCost: 1500,
    weight: 0.55,
    size: ["L", "S"],
    color: ["#FF0000", "#FFFF00"],
    sku: "SKU-TWNVWC-14",
    categoryId: categories[13].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Bebederos Premium 15",
    description: `Bebederos de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 7465,
    stock: 25,
    weight: 0.6, shippingCost: 1500,
    size: ["M"],
    color: ["#000000", "#0000FF", "#FF0000"],
    sku: "SKU-9O8ROT-15",
    categoryId: categories[14].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Paseo Premium 16",
    description: `Paseo de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 7576,
    stock: 35,
    weight: 0.25, shippingCost: 1500,
    size: ["L", "M"],
    color: ["#0000FF", "#008000"],
    sku: "SKU-CSKCAI-16",
    categoryId: categories[15].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Botas Premium 17",
    description: `Botas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 7687, shippingCost: 1500,
    stock: 22,
    weight: 0.3,
    size: ["L", "M"],
    color: ["#008000", "#0000FF"],
    sku: "SKU-FMKOWC-17",
    categoryId: categories[16].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Invierno Premium 18",
    description: `Invierno de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 7798,
    stock: 42,
    weight: 0.35, shippingCost: 1500,
    size: ["XL", "M", "S"],
    color: ["#FF0000", "#FFFFFF", "#0000FF"],
    sku: "SKU-EYVPYK-18",
    categoryId: categories[17].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Transportadoras Premium 19",
    description: `Transportadoras de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 7909,
    stock: 32, shippingCost: 1500,
    weight: 0.4,
    size: ["L", "XL"],
    color: ["#FFFF00"],
    sku: "SKU-VAQDZD-19",
    categoryId: categories[18].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Alimentos Premium 20",
    description: `Alimentos de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 8020,
    stock: 37,
    weight: 0.45, shippingCost: 1500,
    size: ["XL"],
    color: ["#FF0000"],
    sku: "SKU-W2YHY5-20",
    categoryId: categories[19].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Juguetes Premium 21",
    description: `Juguetes de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 8131,
    stock: 39,
    weight: 0.5, shippingCost: 1500,
    size: ["M", "L", "XL"],
    color: ["#FFFFFF", "#0000FF", "#FFFF00"],
    sku: "SKU-VLQTHZ-21",
    categoryId: categories[0].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Pelotas Premium 22",
    description: `Pelotas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 8242,
    stock: 17,
    weight: 0.55, shippingCost: 1500,
    size: ["L", "S"],
    color: ["#FFFF00", "#008000"],
    sku: "SKU-DJNNES-22",
    categoryId: categories[1].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Rascadores Premium 23",
    description: `Rascadores de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 8353,
    stock: 22,
    weight: 0.6, shippingCost: 1500,
    size: ["S", "L"],
    color: ["#FFFFFF", "#FFFF00", "#008000"],
    sku: "SKU-0MG8XE-23",
    categoryId: categories[2].id,
    petType: "cat",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Collares Premium 24",
    description: `Collares de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 8464,
    stock: 16,
    weight: 0.25, shippingCost: 1500,
    size: ["XL"],
    color: ["#FFFF00"],
    sku: "SKU-S5ZYY3-24",
    categoryId: categories[3].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Correas Premium 25",
    description: `Correas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 8575,
    stock: 44, shippingCost: 1500,
    weight: 0.3,
    size: ["M", "L", "XL"],
    color: ["#008000", "#000000", "#FFFF00"],
    sku: "SKU-Y7P26Y-25",
    categoryId: categories[4].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Camas Premium 26",
    description: `Camas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 8686,
    stock: 28,
    weight: 0.35,
    size: ["L"], shippingCost: 1500,
    color: ["#000000", "#FFFFFF", "#FF0000"],
    sku: "SKU-G1TWFV-26",
    categoryId: categories[5].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Ropa Premium 27",
    description: `Ropa de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 8797,
    stock: 37,
    weight: 0.4, shippingCost: 1500,
    size: ["S"],
    color: ["#FF0000"],
    sku: "SKU-UEOXFC-27",
    categoryId: categories[6].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Snacks Premium 28",
    description: `Snacks de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 8908,
    stock: 32, shippingCost: 1500,
    weight: 0.45,
    size: ["L", "M"],
    color: ["#FFFFFF", "#008000"],
    sku: "SKU-4CQS4V-28",
    categoryId: categories[7].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Higiene Premium 29",
    description: `Higiene de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 9019, shippingCost: 1500,
    stock: 10,
    weight: 0.5,
    size: ["S", "XL"],
    color: ["#FFFF00", "#000000", "#FF0000"],
    sku: "SKU-895GKP-29",
    categoryId: categories[8].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Shampoo Premium 30",
    description: `Shampoo de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 9130,
    stock: 29, shippingCost: 1500,
    weight: 0.55,
    size: ["M", "L"],
    color: ["#FFFFFF", "#FF0000"],
    sku: "SKU-3XI85W-30",
    categoryId: categories[9].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Salud Premium 31",
    description: `Salud de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 9241,
    stock: 33, shippingCost: 1500,
    weight: 0.6,
    size: ["XL", "L", "S"],
    color: ["#008000", "#000000"],
    sku: "SKU-HUN8S8-31",
    categoryId: categories[10].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Antipulgas Premium 32",
    description: `Antipulgas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 9352,
    stock: 36, shippingCost: 1500,
    weight: 0.25,
    size: ["S", "XL"],
    color: ["#FFFFFF", "#008000"],
    sku: "SKU-YLYB85-32",
    categoryId: categories[11].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Cepillos Premium 33",
    description: `Cepillos de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 9463,
    stock: 40, shippingCost: 1500,
    weight: 0.3,
    size: ["L"],
    color: ["#008000", "#000000", "#FFFFFF"],
    sku: "SKU-Q6DI7C-33",
    categoryId: categories[12].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Viajes Premium 34",
    description: `Viajes de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 9574,
    stock: 21,
    weight: 0.35, shippingCost: 1500,
    size: ["XL", "S"],
    color: ["#FFFF00"],
    sku: "SKU-L122HF-34",
    categoryId: categories[13].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Bebederos Premium 35",
    description: `Bebederos de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 9685,
    stock: 37, shippingCost: 1500,
    weight: 0.4,
    size: ["L", "S", "M"],
    color: ["#000000", "#FF0000"],
    sku: "SKU-M2LQ5B-35",
    categoryId: categories[14].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Paseo Premium 36",
    description: `Paseo de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 9796,
    stock: 22, shippingCost: 1500,
    weight: 0.45,
    size: ["XL"],
    color: ["#000000", "#008000"],
    sku: "SKU-HSE9ND-36",
    categoryId: categories[15].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Botas Premium 37",
    description: `Botas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 9907,
    stock: 25, shippingCost: 1500,
    weight: 0.5,
    size: ["L"],
    color: ["#0000FF", "#FF0000", "#FFFFFF"],
    sku: "SKU-P7ZMEI-37",
    categoryId: categories[16].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Invierno Premium 38",
    description: `Invierno de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 10018,
    stock: 18, shippingCost: 1500,
    weight: 0.55,
    size: ["L", "M"],
    color: ["#FFFFFF", "#000000", "#0000FF"],
    sku: "SKU-HTE4DV-38",
    categoryId: categories[17].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Transportadoras Premium 39",
    description: `Transportadoras de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 10129,
    stock: 15, shippingCost: 1500,
    weight: 0.6,
    size: ["XL"],
    color: ["#FFFF00"],
    sku: "SKU-BMK61N-39",
    categoryId: categories[18].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Alimentos Premium 40",
    description: `Alimentos de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 10240,
    stock: 28, shippingCost: 1500,
    weight: 0.25,
    size: ["XL"],
    color: ["#FF0000", "#0000FF", "#FFFF00"],
    sku: "SKU-1LGN5D-40",
    categoryId: categories[19].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Juguetes Premium 41",
    description: `Juguetes de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 10351, shippingCost: 1500,
    stock: 12,
    weight: 0.3,
    size: ["XL", "S"],
    color: ["#000000", "#0000FF"],
    sku: "SKU-EY6AJ0-41",
    categoryId: categories[0].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Pelotas Premium 42",
    description: `Pelotas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 10462,
    stock: 23, shippingCost: 1500,
    weight: 0.35,
    size: ["XL"],
    color: ["#FFFFFF", "#0000FF"],
    sku: "SKU-41KVNQ-42",
    categoryId: categories[1].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Rascadores Premium 43",
    description: `Rascadores de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 10573,
    stock: 10, shippingCost: 1500,
    weight: 0.4,
    size: ["XL", "M"],
    color: ["#000000"],
    sku: "SKU-HIR8L1-43",
    categoryId: categories[2].id,
    petType: "cat",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Collares Premium 44",
    description: `Collares de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 10684,
    stock: 28, shippingCost: 1500,
    weight: 0.45,
    size: ["M"],
    color: ["#FFFFFF"],
    sku: "SKU-6M8BL9-44",
    categoryId: categories[3].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Correas Premium 45",
    description: `Correas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 10795,
    stock: 28, shippingCost: 1500,
    weight: 0.5,
    size: ["XL", "S", "L"],
    color: ["#0000FF"],
    sku: "SKU-O6OZ1J-45",
    categoryId: categories[4].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Camas Premium 46",
    description: `Camas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 10906,
    stock: 33, shippingCost: 1500,
    weight: 0.55,
    size: ["S", "M", "L"],
    color: ["#FFFF00", "#008000", "#0000FF"],
    sku: "SKU-BWJS9T-46",
    categoryId: categories[5].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Ropa Premium 47",
    description: `Ropa de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 11017,
    stock: 29, shippingCost: 1500,
    weight: 0.6,
    size: ["XL", "M"],
    color: ["#000000"],
    sku: "SKU-R7JTBW-47",
    categoryId: categories[6].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Snacks Premium 48",
    description: `Snacks de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 11128, shippingCost: 1500,
    stock: 35,
    weight: 0.25,
    size: ["S"],
    color: ["#FFFFFF", "#FFFF00", "#008000"],
    sku: "SKU-76VA5Q-48",
    categoryId: categories[7].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Higiene Premium 49",
    description: `Higiene de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 11239,
    stock: 34,
    weight: 0.3, shippingCost: 1500,
    size: ["M", "XL", "L"],
    color: ["#0000FF", "#000000", "#FFFF00"],
    sku: "SKU-JQVQ5L-49",
    categoryId: categories[8].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Shampoo Premium 50",
    description: `Shampoo de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 11350,
    stock: 26, shippingCost: 1500,
    weight: 0.35,
    size: ["M"],
    color: ["#FFFFFF"],
    sku: "SKU-HO1NX8-50",
    categoryId: categories[9].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Salud Premium 51",
    description: `Salud de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 11461,
    stock: 44, shippingCost: 1500,
    weight: 0.4,
    size: ["S", "XL", "M"],
    color: ["#FF0000", "#000000", "#0000FF"],
    sku: "SKU-GOTTM5-51",
    categoryId: categories[10].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Antipulgas Premium 52",
    description: `Antipulgas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 11572,
    stock: 16,
    weight: 0.45, shippingCost: 1500,
    size: ["XL", "S"],
    color: ["#000000", "#0000FF"],
    sku: "SKU-ZW29T8-52",
    categoryId: categories[11].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Cepillos Premium 53",
    description: `Cepillos de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 11683,
    stock: 31, shippingCost: 1500,
    weight: 0.5,
    size: ["XL", "S", "L"],
    color: ["#000000", "#FF0000", "#FFFFFF"],
    sku: "SKU-B2QNTR-53",
    categoryId: categories[12].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Viajes Premium 54",
    description: `Viajes de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 11794,
    stock: 41, shippingCost: 1500,
    weight: 0.55,
    size: ["XL"],
    color: ["#008000"],
    sku: "SKU-0CAF80-54",
    categoryId: categories[13].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Bebederos Premium 55",
    description: `Bebederos de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 11905,
    stock: 46,
    weight: 0.6, shippingCost: 1500,
    size: ["M", "S", "L"],
    color: ["#FFFFFF", "#FFFF00", "#0000FF"],
    sku: "SKU-KRT8EJ-55",
    categoryId: categories[14].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Paseo Premium 56",
    description: `Paseo de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 12016,
    stock: 49, shippingCost: 1500,
    weight: 0.25,
    size: ["XL"],
    color: ["#FF0000"],
    sku: "SKU-Y24570-56",
    categoryId: categories[15].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Botas Premium 57",
    description: `Botas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 12127,
    stock: 50, shippingCost: 1500,
    weight: 0.3,
    size: ["S"],
    color: ["#008000", "#FF0000"],
    sku: "SKU-QZ0SAQ-57",
    categoryId: categories[16].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Invierno Premium 58",
    description: `Invierno de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 12238,
    stock: 44, shippingCost: 1500,
    weight: 0.35,
    size: ["L", "XL"],
    color: ["#FFFF00", "#FFFFFF"],
    sku: "SKU-RFXX3K-58",
    categoryId: categories[17].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Transportadoras Premium 59",
    description: `Transportadoras de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 12349,
    stock: 39, shippingCost: 1500,
    weight: 0.4,
    size: ["M"],
    color: ["#000000"],
    sku: "SKU-HAKDUH-59",
    categoryId: categories[18].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Alimentos Premium 60",
    description: `Alimentos de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 12460,
    stock: 14, shippingCost: 1500,
    weight: 0.45,
    size: ["M", "XL", "S"],
    color: ["#008000", "#000000", "#FFFF00"],
    sku: "SKU-WMBYG6-60",
    categoryId: categories[19].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Juguetes Premium 61",
    description: `Juguetes de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 12571,
    stock: 23, shippingCost: 1500,
    weight: 0.5,
    size: ["M", "S"],
    color: ["#008000"],
    sku: "SKU-2UM98Y-61",
    categoryId: categories[0].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Pelotas Premium 62",
    description: `Pelotas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 12682,
    stock: 42,
    weight: 0.55, shippingCost: 1500,
    size: ["M", "L", "XL"],
    color: ["#FFFF00", "#000000", "#008000"],
    sku: "SKU-9TQTEY-62",
    categoryId: categories[1].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Rascadores Premium 63",
    description: `Rascadores de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 12793,
    stock: 42,
    weight: 0.6,
     shippingCost: 1500,
    size: ["XL", "M", "L"],
    color: ["#0000FF", "#FFFF00"],
    sku: "SKU-VISCMX-63",
    categoryId: categories[2].id,
    petType: "cat",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Collares Premium 64",
    description: `Collares de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 12904,
    stock: 11,
     shippingCost: 1500,
    weight: 0.25,
    size: ["L", "XL"],
    color: ["#008000", "#0000FF", "#FF0000"],
    sku: "SKU-XK0NL1-64",
    categoryId: categories[3].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Correas Premium 65",
    description: `Correas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 13015,
     shippingCost: 1500,
    stock: 22,
    weight: 0.3,
    size: ["XL", "M", "L"],
    color: ["#0000FF"],
    sku: "SKU-Z6V7X4-65",
    categoryId: categories[4].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Camas Premium 66",
    description: `Camas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 13126,
    stock: 45,
    weight: 0.35,
    size: ["M", "S"],
    color: ["#FFFF00"],
     shippingCost: 1500,
    sku: "SKU-WOSHRA-66",
    categoryId: categories[5].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Ropa Premium 67",
    description: `Ropa de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 13237,
    stock: 23,
     shippingCost: 1500,
    weight: 0.4,
    size: ["S", "M"],
    color: ["#008000"],
    sku: "SKU-S8WOFI-67",
    categoryId: categories[6].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Snacks Premium 68",
    description: `Snacks de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 13348,
     shippingCost: 1500,
    stock: 14,
    weight: 0.45,
    size: ["L", "S", "M"],
    color: ["#FFFF00", "#0000FF", "#008000"],
    sku: "SKU-11YE0J-68",
    categoryId: categories[7].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Higiene Premium 69",
    description: `Higiene de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 13459,
    stock: 43,
     shippingCost: 1500,
    weight: 0.5,
    size: ["L", "S"],
    color: ["#0000FF", "#FF0000", "#FFFF00"],
    sku: "SKU-BDKHQK-69",
    categoryId: categories[8].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Shampoo Premium 70",
    description: `Shampoo de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 13570,
    stock: 30,
     shippingCost: 1500,
    weight: 0.55,
    size: ["S"],
    color: ["#000000", "#008000"],
    sku: "SKU-8S5VB2-70",
    categoryId: categories[9].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Salud Premium 71",
    description: `Salud de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 13681,
     shippingCost: 1500,
    stock: 11,
    weight: 0.6,
    size: ["S"],
    color: ["#FFFFFF", "#000000"],
    sku: "SKU-3IB914-71",
    categoryId: categories[10].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Antipulgas Premium 72",
    description: `Antipulgas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 13792,
     shippingCost: 1500,
    stock: 46,
    weight: 0.25,
    size: ["M", "L"],
    color: ["#FFFF00", "#008000"],
    sku: "SKU-VPCPB8-72",
    categoryId: categories[11].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Cepillos Premium 73",
    description: `Cepillos de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 13903,
    stock: 24,
     shippingCost: 1500,
    weight: 0.3,
    size: ["M"],
    color: ["#0000FF", "#FFFFFF", "#FF0000"],
    sku: "SKU-DM37SK-73",
    categoryId: categories[12].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Viajes Premium 74",
    description: `Viajes de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 14014,
     shippingCost: 1500,
    stock: 12,
    weight: 0.35,
    size: ["XL", "S"],
    color: ["#0000FF", "#000000", "#008000"],
    sku: "SKU-59PY1Y-74",
    categoryId: categories[13].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Bebederos Premium 75",
    description: `Bebederos de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 14125,
     shippingCost: 1500,
    stock: 30,
    weight: 0.4,
    size: ["XL", "L", "S"],
    color: ["#000000"],
    sku: "SKU-JGNNR0-75",
    categoryId: categories[14].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Paseo Premium 76",
    description: `Paseo de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 14236,
     shippingCost: 1500,
    stock: 24,
    weight: 0.45,
    size: ["XL", "L", "M"],
    color: ["#008000", "#FFFF00"],
    sku: "SKU-GUB895-76",
    categoryId: categories[15].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Botas Premium 77",
    description: `Botas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 14347,
    stock: 38,
    weight: 0.5,
     shippingCost: 1500,
    size: ["XL", "L", "M"],
    color: ["#FF0000", "#0000FF", "#FFFFFF"],
    sku: "SKU-Y9Q4KJ-77",
    categoryId: categories[16].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Invierno Premium 78",
    description: `Invierno de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 14458,
     shippingCost: 1500,
    stock: 19,
    weight: 0.55,
    size: ["M", "L"],
    color: ["#0000FF"],
    sku: "SKU-40OU3F-78",
    categoryId: categories[17].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Transportadoras Premium 79",
    description: `Transportadoras de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 14569,
    stock: 14,
     shippingCost: 1500,
    weight: 0.6,
    size: ["L"],
    color: ["#0000FF", "#000000"],
    sku: "SKU-DH2KH9-79",
    categoryId: categories[18].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Alimentos Premium 80",
    description: `Alimentos de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 14680,
    stock: 26,
     shippingCost: 1500,
    weight: 0.25,
    size: ["XL", "M"],
    color: ["#0000FF"],
    sku: "SKU-H519U2-80",
    categoryId: categories[19].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Juguetes Premium 81",
    description: `Juguetes de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 14791,
    stock: 40,
    weight: 0.3,
     shippingCost: 1500,
    size: ["L"],
    color: ["#000000"],
    sku: "SKU-OHXVOF-81",
    categoryId: categories[0].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Pelotas Premium 82",
    description: `Pelotas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 14902,
     shippingCost: 1500,
    stock: 17,
    weight: 0.35,
    size: ["S", "L"],
    color: ["#0000FF", "#FFFFFF"],
    sku: "SKU-I1TDF4-82",
    categoryId: categories[1].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Rascadores Premium 83",
    description: `Rascadores de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 15013,
     shippingCost: 1500,
    stock: 27,
    weight: 0.4,
    size: ["L"],
    color: ["#FF0000", "#0000FF"],
    sku: "SKU-Y9HFNO-83",
    categoryId: categories[2].id,
    petType: "cat",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Collares Premium 84",
    description: `Collares de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 15124,
     shippingCost: 1500,
    stock: 24,
    weight: 0.45,
    size: ["XL", "M"],
    color: ["#FF0000", "#0000FF"],
    sku: "SKU-45FO7Q-84",
    categoryId: categories[3].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Correas Premium 85",
    description: `Correas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 15235,
    stock: 46,
    weight: 0.5,
     shippingCost: 1500,
    size: ["L"],
    color: ["#008000", "#FF0000"],
    sku: "SKU-7TLMYL-85",
    categoryId: categories[4].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Camas Premium 86",
    description: `Camas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 15346,
    stock: 33,
     shippingCost: 1500,
    weight: 0.55,
    size: ["S"],
    color: ["#FFFFFF", "#000000"],
    sku: "SKU-SBD45S-86",
    categoryId: categories[5].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Ropa Premium 87",
    description: `Ropa de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 15457,
    stock: 35,
    weight: 0.6,
     shippingCost: 1500,
    size: ["XL", "M", "S"],
    color: ["#FF0000"],
    sku: "SKU-DR3FX3-87",
    categoryId: categories[6].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Snacks Premium 88",
    description: `Snacks de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 15568,
    stock: 34,
     shippingCost: 1500,
    weight: 0.25,
    size: ["S", "XL"],
    color: ["#0000FF", "#000000"],
    sku: "SKU-9CKHY8-88",
    categoryId: categories[7].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Higiene Premium 89",
    description: `Higiene de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 15679,
    stock: 33,
     shippingCost: 1500,
    weight: 0.3,
    size: ["XL"],
    color: ["#FFFFFF"],
    sku: "SKU-JUER1R-89",
    categoryId: categories[8].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Shampoo Premium 90",
    description: `Shampoo de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 15790,
    stock: 48,
    weight: 0.35,
     shippingCost: 1500,
    size: ["XL", "L", "S"],
    color: ["#008000", "#FFFF00"],
    sku: "SKU-B3OYX5-90",
    categoryId: categories[9].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Salud Premium 91",
    description: `Salud de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 15901,
    stock: 42,
     shippingCost: 1500,
    weight: 0.4,
    size: ["M"],
    color: ["#FF0000", "#FFFF00"],
    sku: "SKU-JR4DTB-91",
    categoryId: categories[10].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Antipulgas Premium 92",
    description: `Antipulgas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 16012,
    stock: 37,
     shippingCost: 1500,
    weight: 0.45,
    size: ["M", "S", "XL"],
    color: ["#008000"],
    sku: "SKU-Y46AZL-92",
    categoryId: categories[11].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Cepillos Premium 93",
    description: `Cepillos de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 16123,
     shippingCost: 1500,
    stock: 44,
    weight: 0.5,
    size: ["S", "M", "XL"],
    color: ["#000000", "#008000", "#FF0000"],
    sku: "SKU-43CL7N-93",
    categoryId: categories[12].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Viajes Premium 94",
    description: `Viajes de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 16234,
    stock: 23,
    weight: 0.55,
     shippingCost: 1500,
    size: ["M"],
    color: ["#008000", "#0000FF"],
    sku: "SKU-XCV3TG-94",
    categoryId: categories[13].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Bebederos Premium 95",
    description: `Bebederos de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 16345,
    stock: 34,
     shippingCost: 1500,
    weight: 0.6,
    size: ["M"],
    color: ["#0000FF", "#000000"],
    sku: "SKU-J8INLJ-95",
    categoryId: categories[14].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Paseo Premium 96",
    description: `Paseo de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 16456,
    stock: 10,
    weight: 0.25,
    size: ["XL"],
     shippingCost: 1500,
    color: ["#008000", "#0000FF", "#000000"],
    sku: "SKU-1LR5GS-96",
    categoryId: categories[15].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Botas Premium 97",
    description: `Botas de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 16567,
    stock: 44,
    weight: 0.3,
     shippingCost: 1500,
    size: ["M"],
    color: ["#FFFFFF"],
    sku: "SKU-CFHUKP-97",
    categoryId: categories[16].id,
    petType: "dog",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Invierno Premium 98",
    description: `Invierno de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 16678,
    stock: 41,
     shippingCost: 1500,
    weight: 0.35,
    size: ["L"],
    color: ["#0000FF", "#008000", "#000000"],
    sku: "SKU-BQ656J-98",
    categoryId: categories[17].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_1_bhkdxp" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Transportadoras Premium 99",
    description: `Transportadoras de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 16789,
    stock: 19,
     shippingCost: 1500,
    weight: 0.4,
    size: ["M", "L", "XL"],
    color: ["#FFFFFF", "#FFFF00", "#008000"],
    sku: "SKU-TF97IX-99",
    categoryId: categories[18].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/71XRDqMQQvL._AC_SL1500__zb9gx4" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
      ],
    },
  },
});
await prisma.product.create({
  data: {
    name: "Alimentos Premium 100",
    description: `Alimentos de alta calidad para mascotas exigentes. Ideal para mejorar su bienestar diario.`,
    price: 16900,
    shippingCost: 1500,
    stock: 34,
    weight: 0.45,
    size: ["M", "XL"],
    color: ["#000000"],
    sku: "SKU-4SC22T-100",
    categoryId: categories[19].id,
    petType: "both",
    images: {
      create: [
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/images_2_leasda" },
        { url: "https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/2520714_l_im1qzs" },
      ],
    },
  },
});

  console.log("✅ Seed completado con UUID reales y relaciones consistentes.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
