import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from "morgan";
import productRoutes from './routes/products.Routes';
import { prisma } from './db/db';
import userRoutes from './routes/user.Routes';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/Auth.Routes';
import cartRoutes from './routes/cart.Routes';
import paymentsRouter from './routes/mercadoPago.Routes';
import orderRoutes from './routes/order.Routes';
import categoryRoutes from "./routes/category.Routes";
import addressRoutes from './routes/address.Routes';
import mercadoPagoRoutes from "./routes/mercadoPago.Routes";
import { swaggerUiHandler, swaggerUiSetup } from './swaggerConfig';
import stockNotificationRoutes from "./routes/stockNotification.Routes";
dotenv.config();

export const app = express();
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:4001'],
  credentials: true
}));
app.use(express.json());


app.use(morgan("dev"));

import { Request, Response } from 'express';



app.get('/', (_req, res) => {
  res.send('E-Commerce Backend funcionando!');
});
app.use('/api', swaggerUiHandler, swaggerUiSetup);
app.use('/payments', paymentsRouter);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use("/mercadopago", mercadoPagoRoutes)
app.use("/categories", categoryRoutes);
app.use("/stock-notifications", stockNotificationRoutes);
app.use('/addresses', addressRoutes);
const PORT = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
