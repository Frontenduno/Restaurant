import { Button } from "@/components/ui/button";
import { AdminHeader } from "../components/AdminHeader";
import { PackageIcon, Pencil, Trash2 } from 'lucide-react'
import { useInventario } from "./hooks/useInventario";
import FiltrosInventario from "./components/FiltrosInventario";

export function InventarioPage() {
  const { categorias, estados } = useInventario();

  return (
    <div className="w-full flex flex-col font-sans">
      
      <AdminHeader title="Inventario" icon={PackageIcon} />

      <div className="px-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">Inventario General</h2>
            <p className="text-neutral-400">Control de stock e insumos del restaurante.</p>
          </div>
          <div className="flex items-center gap-3">
              <Button className="bg-[#E9EAED] w-[165px] border border-[#05014B] hover:bg-blue-800 text-[#05014B] font-medium px-6 h-10 rounded-md">
                Categoria
              </Button>
              <Button className="bg-[#05014B] w-[165px] hover:bg-blue-800 text-white font-medium px-6 h-10 rounded-md">
                Agregar Insumo
              </Button>
          </div>
        </div>
      
        <FiltrosInventario categoria={categorias} estado={estados} />

        {/* Aquí iría la tabla o lista de insumos filtrados según los filtros seleccionados */ }
        <div className="mt-5 overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm">
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm text-left">
      <thead className="bg-neutral-50 border-b border-neutral-100">
        <tr className="text-neutral-600 font-semibold">
          <th className="px-4 py-3 whitespace-nowrap">NOMBRE</th>
          <th className="px-4 py-3 whitespace-nowrap">CATEGORÍA</th>
          <th className="px-4 py-3 whitespace-nowrap text-center">STOCK</th>
          <th className="px-4 py-3 whitespace-nowrap">U. MEDIDA</th>
          <th className="px-4 py-3 whitespace-nowrap text-center">ESTADO</th>
          <th className="px-4 py-3 text-right whitespace-nowrap">ACCIONES</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-neutral-100">
        {[
          { id: 1, nombre: "Carne de Res (Lomo)", categoria: "Proteínas", stock: 15.5, unidad: "kg", estadoId: 0, estadoDetalle: "SUFICIENTE" },
          { id: 2, nombre: "Papa Amarilla", categoria: "Verduras", stock: 5.0, unidad: "kg", estadoId: 2, estadoDetalle: "STOCK BAJO" },
          { id: 3, nombre: "Pollo (Pechuga)", categoria: "Proteínas", stock: 0.0, unidad: "kg", estadoId: 1, estadoDetalle: "SIN STOCK" },
          { id: 4, nombre: "Arroz Extra", categoria: "Abarrotes", stock: 45.0, unidad: "kg", estadoId: 0, estadoDetalle: "SUFICIENTE" },
          { id: 5, nombre: "Leche Evaporada", categoria: "Lácteos", stock: 24, unidad: "latas", estadoId: 0, estadoDetalle: "SUFICIENTE" }
        ].map((insumo) => {
          
          const statusConfig = {
            0: "bg-emerald-50 text-emerald-700 border-emerald-100",
            1: "bg-red-50 text-red-700 border-red-100",
            2: "bg-amber-50 text-amber-700 border-amber-100",
          };

          return (
            <tr key={insumo.id} className="hover:bg-neutral-50/60 transition-colors">
              {/* NOMBRE CON ICONO */}
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-800 font-medium">{insumo.nombre}</span>
                </div>
              </td>

              {/* CATEGORÍA */}
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="inline-flex items-center rounded-md bg-neutral-100 px-2.5 py-1 text-[11px] font-bold text-neutral-600 uppercase tracking-tight">
                  {insumo.categoria}
                </span>
              </td>

              {/* STOCK */}
              <td className={`px-4 py-3 whitespace-nowrap font-bold text-center ${insumo.stock <= 5 ? 'text-red-600' : 'text-neutral-900'}`}>
                {insumo.stock}
              </td>

              {/* UNIDAD DE MEDIDA */}
              <td className="px-4 py-3 whitespace-nowrap text-neutral-500">
                {insumo.unidad}
              </td>

              {/* ESTADO */}
              <td className="px-4 py-3 whitespace-nowrap text-center">
                <span className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold ${statusConfig[insumo.estadoId]}`}>
                  {insumo.estadoDetalle}
                </span>
              </td>

              {/* ACCIONES */}
              <td className="px-4 py-3 whitespace-nowrap text-right">
                <div className="flex justify-end gap-1.5">
                  <button 
                    className="p-2 rounded-lg hover:bg-blue-50 transition-colors text-blue-600"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors text-red-500"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>
        
      </div>
      
    </div>
  );
}
