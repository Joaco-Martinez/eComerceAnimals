'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { X } from 'lucide-react';

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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialName: string;
  initialSurname: string;
  onSubmit: (values: NewAddressInput) => void;
}

const validationSchema = yup.object().shape({
  postalCode: yup.string().required('El código postal es obligatorio'),
  nombre: yup.string().required('El nombre es obligatorio'),
  apellido: yup.string().required('El apellido es obligatorio'),
  telefono: yup.string().required('El teléfono es obligatorio'),
  dni: yup.string().required('El DNI es obligatorio'),
  provincia: yup.string().required('La provincia es obligatoria'),
  localidad: yup.string().required('La localidad es obligatoria'),
  calle: yup.string().required('La calle y número son obligatorios'),
  piso: yup.string(),
});

export default function NewAddressModal({ isOpen, onClose, initialName, initialSurname, onSubmit }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
        {/* Botón cerrar */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={22} />
        </button>

        {/* Título */}
        <h2 className="text-xl font-semibold text-[#2C4B4D] text-center mb-6">
          Nueva dirección de envío
        </h2>

        <Formik
          initialValues={{
            postalCode: '',
            nombre: initialName || '',
            apellido: initialSurname || '',
            telefono: '',
            dni: '',
            provincia: '',
            localidad: '',
            calle: '',
            piso: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 text-sm">
              <div>
                <Field name="postalCode" placeholder="Código postal" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4BFAB] transition-all" />
                <ErrorMessage name="postalCode" component="p" className="text-xs text-red-500 mt-1" />
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Field name="nombre" placeholder="Nombre" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4BFAB] transition-all" />
                  <ErrorMessage name="nombre" component="p" className="text-xs text-red-500 mt-1" />
                </div>
                <div>
                  <Field name="apellido" placeholder="Apellido" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4BFAB] transition-all" />
                  <ErrorMessage name="apellido" component="p" className="text-xs text-red-500 mt-1" />
                </div>
              </div>

              <Field name="telefono" placeholder="Teléfono" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4BFAB] transition-all" />
              <ErrorMessage name="telefono" component="p" className="text-xs text-red-500 mt-1" />

              <Field name="dni" placeholder="DNI" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4BFAB] transition-all" />
              <ErrorMessage name="dni" component="p" className="text-xs text-red-500 mt-1" />

              <Field name="provincia" placeholder="Provincia" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4BFAB] transition-all" />
              <ErrorMessage name="provincia" component="p" className="text-xs text-red-500 mt-1" />

              <Field name="localidad" placeholder="Localidad" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4BFAB] transition-all" />
              <ErrorMessage name="localidad" component="p" className="text-xs text-red-500 mt-1" />

              <Field name="calle" placeholder="Calle y número" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4BFAB] transition-all" />
              <ErrorMessage name="calle" component="p" className="text-xs text-red-500 mt-1" />

              <Field name="piso" placeholder="Piso, depto (opcional)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4BFAB] transition-all" />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-2 rounded-full bg-[#a18c89] text-white font-medium hover:bg-[#8d7571] transition-colors"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar dirección'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
