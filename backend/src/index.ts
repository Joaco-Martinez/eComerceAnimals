import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from "morgan";
import productsRoutes from './routes/productsRoutes';
import { prisma } from './db/db';
import userRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/AuthRoutes';
import cartRoutes from './routes/cartRoutes';
import paymentsRouter from './routes/mercadoPago.routes';
import orderRoutes from './routes/orderRoutes';

import mercadoPagoRoutes from "./routes/mercadoPago.routes";
import { swaggerUiHandler, swaggerUiSetup } from './swaggerConfig';
dotenv.config();

export const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3001', 
  credentials: true
}));
app.use(express.json());


app.use(morgan("dev"));


app.get('/', (_req, res) => {
  res.send('E-Commerce Backend funcionando!');
});
app.use('/api', swaggerUiHandler, swaggerUiSetup);
app.use('/payments', paymentsRouter);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use("/mercadopago", mercadoPagoRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
