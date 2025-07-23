"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../src/context/authContext";
import { getAddress, createAddress, deleteAddress  } from "@/service/addressService";
import { Plus, Trash2 } from "lucide-react";
import NewAddressModal from "@/components/NewAddressModal/NewAddressModal";
import { NewAddressInput } from "@/service/addressService";
import { Address } from "../../../../../interfaces/Types";
import DeleteAddressModal from "@/components/DeleteAddressModal/DeleteAddressModal";
import toast from "react-hot-toast";


export default function AddressesPage() {
  const { user } = useAuthContext();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (user) {
        const addresses = await getAddress();
        setAddresses(addresses);
      }
    };
    fetchAddresses();
  }, [user]);


  const handleQuestionAddress = (id: string) => {
  setAddressToDelete(id);
  setShowDeleteModal(true);
};

const handleDeleteAddress = async () => {
  if (!addressToDelete) return;
    
  try {
    await deleteAddress(addressToDelete as string);
    const updated = await getAddress();
    setAddresses(updated);
  } catch (err) {
    console.error("Error al eliminar dirección", err);
  } finally {
    toast.success("Dirección eliminada");
    setAddressToDelete(null);
    setShowDeleteModal(false);
  }
};
  const handleAddAddress = async (values: NewAddressInput) => {
    try {
      await createAddress(values);
      const updated: Address[] = await getAddress();
      setAddresses(updated);

      // opcional: seleccionar automáticamente la nueva dirección
      const nueva = updated.find(
        (addr) =>
          addr.nombre.toLowerCase() === values.nombre.toLowerCase() &&
          addr.apellido.toLowerCase() === values.apellido.toLowerCase() &&
          addr.calle.toLowerCase() === values.calle.toLowerCase() &&
          addr.postalCode === values.postalCode
      );
      if (nueva) console.log("📦 Dirección agregada:", nueva.userId);

      setIsModalOpen(false);
    } catch (err) {
      console.error("Error al agregar dirección:", err);
    }
  };

  if (!user)
    return (
      <p className="text-center text-[#2C4B4D]">
        Iniciá sesión para ver tus direcciones
      </p>
    );

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Agregar dirección */}
      <div className="mb-6">
        {addresses.length < 3 ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2C4B4D] text-white rounded-lg shadow-md hover:bg-[#203637] transition"
          >
            <Plus className="w-4 h-4" />
            Agregar dirección
          </button>
        ) : (
          <p className="text-sm text-red-600 bg-red-100 px-4 py-2 rounded-lg w-fit">
            Solo podés tener 3 direcciones. Eliminá una para agregar una nueva.
          </p>
        )}
      </div>

      {/* Lista de direcciones */}
      <div className="grid sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="relative border border-[#C4BFAB] bg-[#F9F8F3] p-5 rounded-xl shadow-sm"
          >
            <p className="font-semibold text-[#2C4B4D]">
              {addr.nombre} {addr.apellido}
            </p>
            <p className="text-sm text-[#534f4f]">
              {addr.calle} - {addr.localidad}, {addr.provincia}
            </p>
            <p className="text-xs text-gray-600">
              CP: {addr.postalCode} - Tel: {addr.telefono}
            </p>

            <div className="absolute top-3 right-3 flex gap-2">
              <button
                title="Eliminar"
                onClick={() => handleQuestionAddress(addr.id!)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de nueva dirección */}
      <NewAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialName=""
        initialSurname=""
        onSubmit={handleAddAddress}
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
