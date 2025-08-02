/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import EmailVerificationModal from '../EmailVerificationModal/EmailVerificationModal';
import { registerUser } from '../../service/authService';
import { useAuthContext } from '../../context/authContext';
import { Eye, EyeOff } from 'lucide-react';

const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio'),
  apellido: yup.string().required('El apellido es obligatorio'),
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Repetí la contraseña'),
});

type FormData = yup.InferType<typeof schema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const { SaveUserData } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await registerUser({
        name: data.nombre,
        email: data.email,
        password: data.password,
      });

      if (response) {
        toast.success('Usuario registrado correctamente');
        setRegisteredEmail(data.email);
        setShowModal(true);
        reset();
      }
    } catch (error: any) {
      toast.error(
        error?.message
          ? `Error al registrarse, ${error.message}`
          : 'Error al registrarse'
      );
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-3xl shadow-lg p-8 bg-white">
      <h2 className="text-center text-xl font-semibold mb-6">Registrate</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Nombre</label>
          <input
            {...register('nombre')}
            placeholder="Ingresá tu nombre"
            className="w-full mt-1 p-2 bg-gray-100 rounded"
          />
          {errors.nombre && <p className="text-sm text-red-500">{errors.nombre.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Apellido</label>
          <input
            {...register('apellido')}
            placeholder="Ingresá tu apellido"
            className="w-full mt-1 p-2 bg-gray-100 rounded"
          />
          {errors.apellido && <p className="text-sm text-red-500">{errors.apellido.message}</p>}
        </div>

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
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Ingresá tu contraseña"
              className="w-full mt-1 p-2 bg-gray-100 rounded pr-10"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Repetir Contraseña</label>
          <div className="relative">
            <input
              type={showRepeatPassword ? 'text' : 'password'}
              {...register('repeatPassword')}
              placeholder="Repetí tu contraseña"
              className="w-full mt-1 p-2 bg-gray-100 rounded pr-10"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowRepeatPassword((prev) => !prev)}
            >
              {showRepeatPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.repeatPassword && (
            <p className="text-sm text-red-500">{errors.repeatPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 py-2 rounded-full bg-[#a18c89] text-white font-medium"
        >
          {isSubmitting ? 'Registrando...' : 'Registrarme'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        ¿tenés cuenta?{' '}
        <a href="/login" className="text-[#a18c89] font-medium hover:underline">
          Iniciá sesión
        </a>
      </p>

      <button
        type="button"
        className="w-full mt-6 py-2 rounded-full border border-gray-300 text-[#a18c89] font-medium"
        onClick={() => window.history.back()}
      >
        ← Volver atrás
      </button>

      <EmailVerificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        email={registeredEmail}
        onVerified={(user) => {
          SaveUserData({ user });
          toast.success('Correo validado y sesión iniciada');
        }}
      />
    </div>
  );
}
