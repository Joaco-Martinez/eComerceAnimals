export interface Category {
  id: string
  name: string
}

export type FormData = {
  name: string
  description: string
  price: number
  stock: number
  weight: number
  sizes: ("XS" | "S" | "M" | "L" | "XL")[]
  colors: string[]
  sku: string
  petType: 'dog' | 'cat' | 'both'
  categoryId: string
}
