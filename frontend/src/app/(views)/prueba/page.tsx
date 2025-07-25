'use client';
import { useAuthContext } from '../../../context/authContext';
import { useEffect } from 'react';

export default function DebugAuth() {
  const { user, isAuth, ResetUserData } = useAuthContext();

  useEffect(() => {
 fetch('http://localhost:3000/auth/me', {
  method: 'GET',
  credentials: 'include'
})
  .then(res => res.json())
  .then(data => console.log('Usuario:', data));
}, []);

  return (
    <div className="p-4">
      <h2>Auth Debug</h2>
      <pre className="text-sm bg-gray-100 p-2 rounded">
        {JSON.stringify(user, null, 2)}
      </pre>
      <p>¿Está autenticado?: {isAuth ? 'Sí' : 'No'}</p>
      <button onClick={ResetUserData} className="mt-2 bg-red-500 text-white px-3 py-1 rounded">
        Logout
      </button>
    </div>
  );
}
