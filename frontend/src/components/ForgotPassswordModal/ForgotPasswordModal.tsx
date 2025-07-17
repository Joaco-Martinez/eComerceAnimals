'use client';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { forgotPassword } from '../../service/userService';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
});

type FormData = yup.InferType<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCodeSent: (email: string) => void;
}

export default function ForgotPasswordModal({ isOpen, onClose, onCodeSent }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email }: FormData) => {
    try {
      await forgotPassword(email);
      toast.success('Código enviado a tu email');
      reset();
      onCodeSent(email); 
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || 'Error al enviar el código');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-black/30 px-4">
        <div className="bg-white w-full max-w-md rounded-2xl p-6">
          <div className="text-lg font-semibold text-center mb-4">
            Restablecer contraseña
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium">Email</label>
              <input
                {...register('email')}
                type="email"
                placeholder="Ingresá tu email"
                className="w-full mt-1 p-2 bg-gray-100 rounded"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded-full bg-[#a18c89] text-white font-medium"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar código'}
            </button>
          </form>

          <button
            type="button"
            className="w-full mt-4 py-2 rounded-full border border-gray-300 text-[#a18c89] font-medium"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Dialog>
  );
}
