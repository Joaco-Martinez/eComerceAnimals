'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { X } from 'lucide-react';


export interface Address {
  id: string;
  postalCode: string;
  nombre: string;
  apellido: string;
  telefono: string; // <-- CORREGIDO: antes estaba como number
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
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-center mb-4">Agregar nueva dirección</h2>

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
            onClose(); // cerrar modal después de enviar
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 text-sm">
              <div>
                <Field name="postalCode" placeholder="Código postal" className="input-field" />
                <ErrorMessage name="postalCode" component="p" className="text-xs text-red-500" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Field name="nombre" placeholder="Nombre" className="input-field" />
                  <ErrorMessage name="nombre" component="p" className="text-xs text-red-500" />
                </div>
                <div>
                  <Field name="apellido" placeholder="Apellido" className="input-field" />
                  <ErrorMessage name="apellido" component="p" className="text-xs text-red-500" />
                </div>
              </div>

              <Field name="telefono" placeholder="Teléfono" className="input-field" />
              <ErrorMessage name="telefono" component="p" className="text-xs text-red-500" />

              <Field name="dni" placeholder="DNI" className="input-field" />
              <ErrorMessage name="dni" component="p" className="text-xs text-red-500" />

              <Field name="provincia" placeholder="Provincia" className="input-field" />
              <ErrorMessage name="provincia" component="p" className="text-xs text-red-500" />

              <Field name="localidad" placeholder="Localidad" className="input-field" />
              <ErrorMessage name="localidad" component="p" className="text-xs text-red-500" />

              <Field name="calle" placeholder="Calle y número" className="input-field" />
              <ErrorMessage name="calle" component="p" className="text-xs text-red-500" />

              <Field name="piso" placeholder="Piso, depto, etc. (opcional)" className="input-field" />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-2 rounded-full bg-[#a18c89] text-white font-medium"
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
