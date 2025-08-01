'use client';

import { FC, useState } from 'react';
import { toast } from 'react-hot-toast';
import { verifyEmailCode } from '../../service/authService';
import { User } from '../../../interfaces/Types';
import { useRouter } from 'next/navigation';
interface Props {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerified: (user: User) => void;
}

const EmailVerificationModal: FC<Props> = ({ isOpen, onClose, email, onVerified }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  if (!isOpen) return null;

  const handleVerify = async () => {
  setLoading(true);
  try {
    const response = await verifyEmailCode(email, code); // debe devolver user

    onVerified(response.user);
    router.push('/');
    onClose();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error('Error verificando el código: ' + error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-in relative">
        <h2 className="text-xl font-semibold text-center text-[#a18c89] mb-2">
          Confirmá tu correo
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Te enviamos un código de verificación a <strong>{email}</strong>
        </p>

        <input
          type="text"
          placeholder="Código de verificación"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#a18c89]"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full mt-4 py-2 rounded-full font-medium text-white transition ${
            loading ? 'bg-[#c0b5b2]' : 'bg-[#a18c89] hover:bg-[#927b77]'
          }`}
        >
          {loading ? 'Verificando...' : 'Verificar'}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-4 text-sm text-gray-500 hover:underline text-center"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
