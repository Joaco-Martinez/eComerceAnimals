'use client';


import { useState, useEffect } from 'react';
import { getAddress } from '@/service/addressService';
import { useAuthContext } from '@/context/authContext';
import NewAddressModal from '../NewAddressModal/NewAddressModal';
import DeleteAddressModal from '../DeleteAddressModal/DeleteAddressModal';
import Loader from '../Loader/Loader';
import { useCheckoutContext } from '@/context/checkoutContext';
import {createAddress, deleteAddress} from '../../service/addressService';
export interface Address {
  id: string;
  postalCode: string;
  nombre: string;
  apellido: string;
  telefono: string;
  dni: string;
  provincia: string;
  localidad: string;
  calle: string;
  piso?: string;
}

export interface NewAddressInput {
  postalCode: string;
  nombre: string;
  apellido: string;
  telefono: string;
  dni: string;
  provincia: string;
  localidad: string;
  calle: string;
  piso?: string;
}

export default function AddressStep() {
  const [method, setMethod] = useState<'domicilio' | 'sucursal'>('domicilio');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const { setAddressId, setShippingMethod } = useCheckoutContext();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuthContext();
  const { name } = user || {};
  const [firstName, lastName] = name?.split(' ') || [];

  useEffect(() => {
    const fetchAddress = async () => {
      if (!user) return;
      try {
        const response = await getAddress();
        setAddresses(response);
        if (response.length > 0) {
          setSelectedAddressId(response[0].id);
        }
      } catch (err) {
        console.error("Error al obtener direcciones:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [user]);

  useEffect(() => {
  if (selectedAddressId) {
    setAddressId(selectedAddressId);
    setShippingMethod(method);

  }
}, [selectedAddressId, method, setAddressId, setShippingMethod]);

  const handleNewAddress = async (values: NewAddressInput) => {
    try {
      await createAddress(values); 
      const updated = await getAddress();
      setAddresses(updated);
        const nueva = updated.find((addr: Address) =>
        addr.nombre === values.nombre &&
        addr.apellido === values.apellido &&
        addr.calle === values.calle &&
        addr.postalCode === values.postalCode
      );
      if (nueva) setSelectedAddressId(nueva.id);
    } catch (err) {
      console.error("Error al agregar dirección:", err);
    }
  };

  const handleQuestionAddress = (id: string) => {
    setAddressToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteAddress = async () => {
    if (!addressToDelete) return;
    try {
      await deleteAddress(addressToDelete); 
      const updated = await getAddress();
      setAddresses(updated);
      setSelectedAddressId(updated[0]?.id || null);
    } catch (err) {
      console.error("Error al eliminar dirección", err);
    } finally {
      setAddressToDelete(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl p-6 shadow-md">
      <h2 className="text-center font-semibold text-lg mb-4">Método de Entrega</h2>

      {/* Selector de método */}
      <div className="flex mb-3 rounded-full border border-gray-200 overflow-hidden">
        {['domicilio', 'sucursal'].map((tipo) => (
          <button
            key={tipo}
            className={`flex-1 py-2 text-sm font-medium transition-colors duration-300 ${
              method === tipo
                ? 'bg-[#a18c89] text-white'
                : 'bg-white text-[#a18c89] hover:bg-[#f0e7e5]'
            }`}
            onClick={() => setMethod(tipo as 'domicilio' | 'sucursal')}
          >
            {tipo === 'domicilio' ? 'Envío a domicilio' : 'Retiro en sucursal de correo'}
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-gray-600 mb-4">
        El envío puede demorar de 7 a 10 días hábiles en llegar a destino sin contar los días de producción.
      </p>

      {/* Direcciones */}
      <div className="space-y-4">
        <p className="text-center font-semibold text-lg">Elegí tu dirección de entrega</p>

        {loading ? (
          <Loader />
        ) : addresses.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            No tenés direcciones guardadas.
          </p>
        ) : (
          addresses.map((addr) => (
            <div
  key={addr.id}
  onClick={() => setSelectedAddressId(addr.id)}
  className={`relative border p-4 rounded-2xl cursor-pointer transition-all duration-200 w-full max-w-xs shadow-sm bg-white
    ${
      selectedAddressId === addr.id
        ? 'border-[#a18c89] scale-[1.03] shadow-md'
        : 'hover:border-gray-300 hover:shadow-sm'
    }
  `}
>
  
  <button
    onClick={(e) => {
      e.stopPropagation();
      handleQuestionAddress(addr.id);
    }}
    className="absolute top-2 right-2 text-xs text-red-500 hover:text-red-700"
  >
    Eliminar
  </button>

  {/* Contenido dirección */}
  <p className="font-semibold text-sm text-[#3d3d3d] truncate">
    {addr.nombre} {addr.apellido}
  </p>
  <p className="text-xs text-[#666] truncate">
    {addr.calle} - {addr.localidad}, {addr.provincia}
  </p>
  <p className="text-xs text-[#666] truncate">
    CP: {addr.postalCode} - Tel: {addr.telefono}
  </p>
</div>
          ))
        )}

        {addresses.length < 3 ? (
          <button
            onClick={() => setShowModal(true)}
            className="w-full text-sm text-center mt-4 text-[#a18c89] underline hover:text-[#8c726e]"
          >
            + Agregar nueva dirección
          </button>
        ) : (
          <p className="text-center text-xs text-gray-500 mt-2">
            Para agregar más direcciones tenés que eliminar alguna.
          </p>
        )}
      </div>

      {/* Modal para nueva dirección */}
      <NewAddressModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialName={firstName}
        initialSurname={lastName}
        onSubmit={(values) => {
          setShowModal(false);
          handleNewAddress(values);
        }}
      />

      
      <DeleteAddressModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setAddressToDelete(null);
        }}
        onConfirm={handleDeleteAddress}
      />

    </div>
  );
}
