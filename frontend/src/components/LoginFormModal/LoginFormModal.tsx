'use client';

import { X } from 'lucide-react';
import LoginForm from '../LoginForm/LoginForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginFormModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md  rounded-3xl p-6 mx-4">
        {/* Botón para cerrar */}
        <button
          onClick={onClose}
          className="absolute top-10 right-8 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        
        <LoginForm onLoginSuccess={onClose}/>
      </div>
    </div>
  );
}
