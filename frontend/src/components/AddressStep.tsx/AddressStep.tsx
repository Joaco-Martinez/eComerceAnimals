'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useAuthContext } from '@/context/authContext';
export default function AddressStep() {
  const [method, setMethod] = useState<'domicilio' | 'sucursal'>('domicilio');
  const { user } = useAuthContext();
  const validationSchema = yup.object().shape({
    postalCode: yup.string().required('El código postal es obligatorio'),
    nombre: yup.string().required('El nombre es obligatorio'),
    apellido: yup.string().required('El apellido es obligatorio'),
    telefono: yup.string().required('El teléfono es obligatorio'),
    dni: yup.string().required('El DNI es obligatorio'),
    provincia: yup.string().required('La provincia es obligatoria'),
    localidad: yup.string().required('La localidad es obligatoria'),
    calle: yup.string().required('La calle y número son obligatorios'),
    piso: yup.string(), // opcional
  });
  console.log(user)
  const { name } = user || {};
  const [firstName, lastName] = name?.split(' ') || [];
  console.log(firstName, lastName)
  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl p-6 shadow-md">
      <h2 className="text-center font-semibold text-lg mb-4">Método de Entrega</h2>

      {/* Selector de método */}
      <div className="flex mb-3 rounded-full border border-gray-200 overflow-hidden">
        <button
          className={`flex-1 py-2 text-sm font-medium transition-colors duration-300 ${
            method === 'domicilio'
              ? 'bg-[#a18c89] text-white'
              : 'bg-white text-[#a18c89] hover:bg-[#f0e7e5]'
          }`}
          onClick={() => setMethod('domicilio')}
        >
          Envío a domicilio
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium transition-colors duration-300 ${
            method === 'sucursal'
              ? 'bg-[#a18c89] text-white'
              : 'bg-white text-[#a18c89] hover:bg-[#f0e7e5]'
          }`}
          onClick={() => setMethod('sucursal')}
        >
          Retiro en sucursal de correo
        </button>
      </div>

      <p className="text-center text-xs text-gray-600 mb-4">
        El envío puede demorar de 7 a 10 días hábiles en llegar a destino sin contar los días de producción.
      </p>

      <Formik
       enableReinitialize
        initialValues={{
          postalCode: '',
          nombre: firstName || '',
          apellido: lastName || '',
          telefono: '',
          dni: '',
          provincia: '',
          localidad: '',
          calle: '',
          piso: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Datos de dirección:', {
            ...values,
            metodo: method,
          });
          
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Código postal */}
            <div className="space-y-1 flex flex-col justify-center items-center">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <Field
                name="postalCode"
                placeholder="Ingresá tu código postal"
                className="flex-1 bg-transparent outline-none text-sm"
                />
            </div>
            <ErrorMessage name="postalCode" component="p" className="text-xs text-red-500" />
                </div>

            <p className="text-xs text-[#a18c89] text-center underline cursor-pointer">
              No conozco mi código postal
            </p>

            {/* Formulario Dirección */}
            <div className="bg-gray-100 rounded-2xl p-4 space-y-3">
              <Field name="nombre" placeholder="Nombre" value={firstName} className="w-full p-2 rounded bg-white text-sm" />
              <ErrorMessage name="nombre" component="p" className="text-xs text-red-500" />

              <Field name="apellido" placeholder="Apellido" value={lastName} className="w-full p-2 rounded bg-white text-sm" />
              <ErrorMessage name="apellido" component="p" className="text-xs text-red-500" />

              <Field name="telefono" placeholder="Número de teléfono" className="w-full p-2 rounded bg-white text-sm" />
              <ErrorMessage name="telefono" component="p" className="text-xs text-red-500" />

              <Field name="dni" placeholder="DNI" className="w-full p-2 rounded bg-white text-sm" />
              <ErrorMessage name="dni" component="p" className="text-xs text-red-500" />

              <Field name="provincia" placeholder="Provincia" className="w-full p-2 rounded bg-white text-sm" />
              <ErrorMessage name="provincia" component="p" className="text-xs text-red-500" />

              <Field name="localidad" placeholder="Localidad" className="w-full p-2 rounded bg-white text-sm" />
              <ErrorMessage name="localidad" component="p" className="text-xs text-red-500" />

              <Field name="calle" placeholder="Calle y número" className="w-full p-2 rounded bg-white text-sm" />
              <ErrorMessage name="calle" component="p" className="text-xs text-red-500" />

              <Field
                name="piso"
                placeholder="Piso, depto, etc. (opcional)"
                className="w-full p-2 rounded bg-white text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-2 rounded-full bg-[#a18c89] text-white font-medium"
            >
              {isSubmitting ? 'Guardando...' : 'Continuar con el pago'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
