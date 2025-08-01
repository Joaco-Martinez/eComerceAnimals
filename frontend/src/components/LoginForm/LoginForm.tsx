/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { loginUser, getCurrentUser } from '../../service/authService';
import Cookies from 'js-cookie';
import { useAuthContext } from '../../context/authContext';
import {mergeAnonCart} from '../../service/userService';
import ForgotPasswordModal from '../ForgotPassswordModal/ForgotPasswordModal';
import { useRouter } from 'next/navigation';
import ResetPasswordModal from '../ShopNow/ResetPasswordModal/ResetPasswordModal';
const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});

type FormData = yup.InferType<typeof schema>;

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const router = useRouter();
  const { SaveUserData } = useAuthContext();
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [emailForReset, setEmailForReset] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
  try {
    await loginUser({
      email: data.email,
      password: data.password,
    });

    const user = await getCurrentUser(); 
    
    
    if (!user) {
      return
    }

    SaveUserData({ user });
    toast.success("Inicio de sesión exitoso");

    const anoncartId = Cookies.get("AnonCart_id");
    if (anoncartId) {
      mergeAnonCart(anoncartId);
    }

    if (onLoginSuccess) {
      onLoginSuccess();
    } else {
      router.push('/');
    }
  } catch (error: any) {
    toast.error(
      error?.message
        ? `Error al iniciar sesión: ${error.message}`
        : "Error al iniciar sesión"
    );
  }
};

  return (
    <div className="max-w-md mx-auto rounded-3xl shadow-lg p-8 bg-white">
      <h2 className="text-center text-xl font-semibold mb-6">Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            {...register('email')}
            placeholder="Ingresá tu email"
            className="w-full mt-1 p-2 bg-gray-100 rounded"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Contraseña</label>
          <input
            type="password"
            {...register('password')}
            placeholder="Ingresá tu contraseña"
            className="w-full mt-1 p-2 bg-gray-100 rounded"
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          <div className="text-right mt-1">
    <button
    type="button"
    onClick={() => setShowForgotModal(true)}
    className="text-sm text-[#a18c89] hover:underline"
  >
    ¿Olvidaste tu contraseña?
  </button>
</div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 py-2 rounded-full bg-[#a18c89] text-white font-medium"
        >
          {isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        ¿No tenés cuenta?{' '}
        <a href="/register" className="text-[#a18c89] font-medium hover:underline">
          Registrate aquí
        </a>
      </p>

      <button
        type="button"
        className="w-full mt-6 py-2 rounded-full border border-gray-300 text-[#a18c89] font-medium"
        onClick={() => window.history.back()}
      >
        ← Volver atrás
      </button>
      <ForgotPasswordModal
  isOpen={showForgotModal}
  onClose={() => setShowForgotModal(false)}
  onCodeSent={(email) => {
    setEmailForReset(email);
    setShowForgotModal(false);
    setShowResetModal(true);
  }}
/>
<ResetPasswordModal
  isOpen={showResetModal}
  onClose={() => setShowResetModal(false)}
  defaultEmail={emailForReset}
/>
    </div>
  );
}
