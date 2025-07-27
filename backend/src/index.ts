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
import anonCartRoutes from './routes/anonCart.Routes';
import notifications from './routes/notificacion.Routes';
import couponRoutes from './routes/coupon.Routes'


dotenv.config();

export const app = express();
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:4001'],
  credentials: true
}));
app.use(express.json());
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(morgan("dev"));




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
app.use('/anon-cart', anonCartRoutes);
app.use('/coupons', couponRoutes);
app.use("/mercadopago", mercadoPagoRoutes)
app.use("/categories", categoryRoutes);
app.use("/stock-notifications", stockNotificationRoutes);
app.use("/notifications", notifications);
app.use('/addresses', addressRoutes);

const PORT = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
