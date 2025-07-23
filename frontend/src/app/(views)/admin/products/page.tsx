import CrearProductos from "@/components/AaPanelAdmin/Products/CrearProductos"
import { EditarProductos } from "@/components/AaPanelAdmin/Products/EditarProductos"
export default function AdminProductsPage() {
  return <>
  <h1 className="text-2xl font-semibold">Gestión de productos</h1>
  <CrearProductos />
  <EditarProductos />
  </> 
}