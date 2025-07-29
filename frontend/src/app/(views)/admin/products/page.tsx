import CrearProductos from "@/components/AaPanelAdmin/Products/CrearProductos"
import { EditarProductos } from "@/components/AaPanelAdmin/Products/EditarProductos"
export default function AdminProductsPage() {
  return <>
  <div className="flex justify-center">
  <CrearProductos />
</div>
  <EditarProductos />
  </> 
}