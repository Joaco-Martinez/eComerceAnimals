'use client';

import { jwtDecode } from 'jwt-decode';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { User } from '../../interfaces/Types';
import apiService from '../service/apiService';

// Tipado del contexto
interface AuthContextType {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  SaveUserData: (data: { user: User }) => void;
  ResetUserData: () => void;
}

// Función auxiliar para decodificar JWT desde cookie
export const decodeUserCookie = (cookieValue: string) => {
  try {
    const decoded = jwtDecode(cookieValue);
    return decoded as User;
  } catch (e) {
    console.error('No se pudo decodificar la cookie:', e);
    return null;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar el usuario automáticamente desde backend (/auth/me)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiService.get('/auth/me', true);
        setUser(res as User);
        setIsAuth(true);
      } catch (error) {
        console.log('Error al obtener el usuario', error);
        setUser(null);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  
  console.log('AuthProvider cargado', user);
  // Setea el usuario tras login o registro
  const SaveUserData = (data: { user: User }) => {
    setUser(data.user);
    setIsAuth(true);
  };

  // Limpia el estado tras logout o expiración de sesión
  const ResetUserData = () => {
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        loading,
        SaveUserData,
        ResetUserData,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de un AuthProvider');
  }
  return context;
};