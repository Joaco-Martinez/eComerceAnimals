"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { subsStock } from "@/service/stockService";

type Props = {
  productName: string;
  productId: string;
  isOpen: boolean;
  onClose: () => void;
};

// Schema de validación con Yup
const schema = yup.object({
  email: yup
    .string()
    .email("Email inválido")
    .matches(/@gmail\.com$/, "Debe ser un correo de Gmail")
    .required("El email es obligatorio"),
});

export default function NotifyStockModal({ productName, isOpen, onClose, productId }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
  });

  if (!isOpen) return null;

  const onSubmit = async (data: { email: string }) => {
    await subsStock(data.email, productId);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl max-w-sm w-full p-6 text-center shadow-lg relative">
        <div className="border-2 border-[#c4bfab] p-4">
          {/* Logo */}
          <Image
            src="/punkypetpositivopng.png"
            alt="Punky Pet"
            width={200}
            height={100}
            className="mx-auto mb-2"
          />

          {/* Título */}
          <h2 className="text-[#918283] text-sm font-medium mb-1">
            Dejanos tu email y te avisaremos cuando este producto vuelva a ingresar:
          </h2>

          {/* Nombre del producto */}
          <h3 className="text-lg font-bold text-[#3b3b3b] mb-4">{productName}</h3>

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              placeholder="Ingresá tu Gmail"
              {...register("email")}
              className={`w-full px-4 py-2 border rounded-full text-sm mb-2 ${
                errors.email ? "border-red-400" : "border-gray-300"
              } focus:outline-none`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mb-2">{errors.email.message}</p>
            )}

            <button
              type="submit"
              className="bg-[#918283] hover:bg-[#7e6f67] text-white px-4 py-2 rounded-full text-sm w-full"
            >
              Avisame cuando haya stock
            </button>
          </form>

          {/* Cerrar */}
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
