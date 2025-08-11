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
import orderRoutes from './routes/order.Routes';
import categoryRoutes from "./routes/category.Routes";
import addressRoutes from './routes/address.Routes';
import mercadoPagoRoutes from "./routes/pagos.Routes";
import { swaggerUiHandler, swaggerUiSetup } from './swaggerConfig';
import stockNotificationRoutes from "./routes/stockNotification.Routes";
import anonCartRoutes from './routes/anonCart.Routes';
import notifications from './routes/notificacion.Routes';
import couponRoutes from './routes/coupon.Routes'
import wishlistRoutes from './routes/wishlist.Routes';
import statsRoutes from './routes/stats.Routes';

dotenv.config();

export const app = express();
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://www.punkypet.com.ar', 'https://punkypet.com.ar', "http://localhost:3001",  "http://localhost:3000"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'DELETE','OPTIONS'],
}));
app.use(express.json());
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(morgan("dev"));

app.use((req, res, next) => {
  const start = Date.now(); 

  res.on("finish", () => {
    const duration = Date.now() - start; 
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`
    );
  });

  next();
});

  app.set('trust proxy', 1);
  
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});
app.get('/', (_req, res) => {
  res.send('E-Commerce Backend funcionando!');
});
app.use('/api', swaggerUiHandler, swaggerUiSetup);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/anon-cart', anonCartRoutes);
app.use('/coupons', couponRoutes);
app.use("/mercadopago", mercadoPagoRoutes)
app.use('/wishlist', wishlistRoutes);
app.use("/categories", categoryRoutes);
app.use("/stock-notifications", stockNotificationRoutes);
app.use("/notifications", notifications);
app.use('/addresses', addressRoutes);
app.use('/admin/stats', statsRoutes);

const PORT = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
