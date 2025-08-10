import * as yup from 'yup'

const hexRegex = /^([0-9A-Fa-f]{6})$/
export const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'U'] as const
export type ValidSize = typeof validSizes[number]
export const productSchema = yup.object({
  name: yup.string().required('Nombre obligatorio'),
  shippingCost: yup.number().typeError('Debe ser un número').required(),
  description: yup.string().required('Descripción obligatoria'),
  price: yup.number().typeError('Debe ser un número').required(),
  stock: yup.number().typeError('Debe ser un número').required(),
  weight: yup.number().typeError('Debe ser un número').required(),
  sizes: yup
    .array()
    .of(
      yup
        .mixed<ValidSize>()
        .oneOf(validSizes)
        .required()
    )
    .min(1)
    .required(),
  colors: yup.array().of(
    yup.string().required().test('is-hex', 'HEX sin # (ej: FF00AA)', val => !!val && !val.startsWith('#') && hexRegex.test(val))
  ).min(1, 'Al menos un color requerido').required(),
  sku: yup.string().required(),
  petType: yup.mixed<'dog' | 'cat' | 'both'>().oneOf(['dog', 'cat', 'both']).required(),
  categoryId: yup.string().uuid().required(),
})
