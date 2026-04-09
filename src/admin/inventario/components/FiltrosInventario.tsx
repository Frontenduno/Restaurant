import { FilterCombobox } from "@/admin/menu/components/menu/FilterCombobox";
import type { Estado, Categoria } from "../types";

interface FiltrosInventarioProps {
  categoria: Categoria[];
  estado: Estado[];
  activeTab: number | null;
  setActiveTab: (id: number | null) => void;
  activeEstado: number | null; // <--- NUEVO
  setActiveEstado: (id: number | null) => void; // <--- NUEVO
}

function FiltrosInventario({
  categoria,
  estado,
  activeTab,
  setActiveTab,
  activeEstado,
  setActiveEstado,
}: FiltrosInventarioProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <FilterCombobox
        label="Categoría"
        options={categoria}
        value={activeTab}
        onChange={(val: any) => {
          if (
            val === "all" ||
            val === null ||
            val === undefined ||
            val === ""
          ) {
            setActiveTab(null);
          } else {
            setActiveTab(Number(val));
          }
        }}
      />

      <FilterCombobox
        label="Estado"
        options={estado}
        value={activeEstado}
        onChange={(val: any) => {
          if (
            val === "all" ||
            val === null ||
            val === undefined ||
            val === ""
          ) {
            setActiveEstado(null);
          } else {
            setActiveEstado(Number(val));
          }
        }}
      />
    </div>
  );
}

export default FiltrosInventario;
