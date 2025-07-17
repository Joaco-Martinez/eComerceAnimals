import { prisma } from '../db/db';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const getAllUsers = async () => prisma.user.findMany();

export const updateUserPassword = async (id: string, newPassword: string) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return prisma.user.update({
    where: { id },
    data: {
      password: hashedPassword,
      resetPasswordCode: null,
      resetPasswordExpiresAt: null,
    },
  });
};

export const deleteUser = async (id: string) =>
  prisma.user.delete({ where: { id } });

export const generateResetCode = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Usuario no encontrado');

  const code = crypto.randomInt(100000, 999999).toString(); // código de 6 dígitos
  const expiration = new Date(Date.now() + 1000 * 60 * 10); // 10 min

  await prisma.user.update({
    where: { email },
    data: {
      resetPasswordCode: code,
      resetPasswordExpiresAt: expiration,
    },
  });

  return { code, email };
};

export const resetPasswordWithCode = async (
  email: string,
  code: string,
  newPassword: string
) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.resetPasswordCode !== code || !user.resetPasswordExpiresAt)
    throw new Error('Código inválido');

  if (user.resetPasswordExpiresAt < new Date())
    throw new Error('Código expirado');

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  return prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      resetPasswordCode: null,
      resetPasswordExpiresAt: null,
    },
  });
};
