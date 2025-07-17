'use client';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { resetPassword } from '../../service/userService';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  code: yup.string().length(6, 'El código debe tener 6 dígitos').required('Código requerido'),
  newPassword: yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña requerida'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden')
    .required('Repetí la contraseña'),
});

type FormData = yup.InferType<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail: string;
}

export default function ResetPasswordModal({ isOpen, onClose, defaultEmail }: Props) {
  const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  reset,
} = useForm<FormData>({
  resolver: yupResolver(schema),
  defaultValues: {
    email: defaultEmail,
  },
});

  const onSubmit = async ({ email, code, newPassword }: FormData) => {
    try {
      await resetPassword(email, code, newPassword);
      reset();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || 'Error al actualizar contraseña');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-black/30 px-4">
        <div className="bg-white w-full max-w-md rounded-2xl p-6">
          <div className="text-lg font-semibold text-center mb-4">
            Ingresá el código y nueva contraseña
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                value={defaultEmail}
                readOnly
                className="w-full mt-1 p-2 bg-gray-100 rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Código recibido</label>
              <input
                type="text"
                {...register('code')}
                className="w-full mt-1 p-2 bg-gray-100 rounded"
              />
              {errors.code && <p className="text-sm text-red-500">{errors.code.message}</p>}
            </div>

            <div>
              <label className="block font-medium">Nueva contraseña</label>
              <input
                type="password"
                {...register('newPassword')}
                className="w-full mt-1 p-2 bg-gray-100 rounded"
              />
              {errors.newPassword && <p className="text-sm text-red-500">{errors.newPassword.message}</p>}
            </div>

            <div>
              <label className="block font-medium">Repetir contraseña</label>
              <input
                type="password"
                {...register('repeatPassword')}
                className="w-full mt-1 p-2 bg-gray-100 rounded"
              />
              {errors.repeatPassword && (
                <p className="text-sm text-red-500">{errors.repeatPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded-full bg-[#a18c89] text-white font-medium"
            >
              {isSubmitting ? 'Actualizando...' : 'Restablecer contraseña'}
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
