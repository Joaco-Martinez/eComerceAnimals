import { prisma } from '../db/db';
import { hashPassword, comparePassword, generateToken, verifyToken } from '../utils/auth';
import { sendNotificationEmail } from './notificacion.service';
export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email ya registrado');

  const hashedPassword = await hashPassword(password);

  // 🔐 Generamos código de verificación y vencimiento (15 min)
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const codeExpires = new Date(Date.now() + 1000 * 60 * 15);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      emailVerificationCode: code,
      emailVerificationExpires: codeExpires,
      cart: {
        create: {},
      },
    },
    include: { cart: true },
  });

  // ✉️ Enviamos email con el código
  await sendNotificationEmail(
    email,
    'Verificá tu correo',
    `Tu código de verificación es: ${code}`,
    `<p>Hola ${name},</p><p>Tu código de verificación es:</p><h2>${code}</h2><p>Este código vence en 15 minutos.</p>`
  );

  const token = generateToken(user.id);
  return { user, token };
};

export const verifyEmailCode = async (email: string, code: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.isEmailVerified) throw new Error('Usuario no encontrado o ya verificado');
  if (user.emailVerificationCode !== code) throw new Error('Código incorrecto');
  if (user.emailVerificationExpires && user.emailVerificationExpires < new Date()) {
    await prisma.user.delete({ where: { id: user.id } });
    throw new Error('El código expiró. Registrate de nuevo.');
  }

  await prisma.user.update({
    where: { email },
    data: {
      isEmailVerified: true,
      emailVerificationCode: null,
      emailVerificationExpires: null,
    },
  });

  return { message: 'Correo verificado con éxito' };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Credenciales inválidas');

  const validPassword = await comparePassword(password, user.password);
  if (!validPassword) throw new Error('Credenciales inválidas');

  const token = generateToken(user.id);
  return { user, token };
};

export const getUserFromToken = async (token: string) => {
  const payload = verifyToken(token);
  if (!payload) throw new Error('Token inválido');

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    include: {
      cart: {
        include: {
          items: { include: { product: true } },
        },
      },
    },
  });

  if (!user) throw new Error('Usuario no encontrado');
  return user;
};
