import { FilterCombobox } from "@/admin/menu/components/FilterCombobox"
import type { Estado, Categoria } from "../types"

interface FiltrosInventarioProps {
    categoria: Categoria[];
    estado: Estado[];
}

function FiltrosInventario({ categoria, estado }: FiltrosInventarioProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
        <FilterCombobox label="Categoría" options={categoria} value={null} onChange={() => {}} />
        <FilterCombobox label="Estado" options={estado} value={null} onChange={() => {}} />
    </div>
  )
}

export default FiltrosInventario