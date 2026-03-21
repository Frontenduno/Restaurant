import { useState } from "react";
import { useAuth } from "@/auth";
import { RecepHeader } from "../components/RecepHeader";
import { NotebookTabs } from "lucide-react";
import { GridEstados } from "./components/GridEstado";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import estadosData from "@/data/mesas/estados.json";
import { CardMesa } from "./components/CardMes";
import { useMesas } from "./hooks/useMesas";
import { ModalConfirmacion } from "./components/ModalConfirmacion";

export const statusColors: Record<string, string> = {
  disponible: "bg-[#10b981]",
  ocupado: "bg-blue-500",
  reservado: "bg-orange-500",
};

export function RecepcionistaPage() {
  const { user } = useAuth();
  const { mesas, actions, modals, selectedMesa } = useMesas();
  const [filtroArea, setFiltroArea] = useState("Todas");

  if (!user) return null;

  const mesasFiltradas = filtroArea === "Todas" 
    ? mesas 
    : mesas.filter((m) => m.location?.detalle === filtroArea);

  return (
    <div className="w-full flex flex-col font-sans">
      {/* Header específico de esta página */}
      <RecepHeader title="Recepcionista" icon={NotebookTabs} />
      
      {/* Contenido de la página de Recepcionista (ej. layout de Mesas) */}
      <div className="px-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-[28px] font-semibold text-gray-800 leading-tight">Mapa de Mesas disponibles</h2>
            <p className="text-[15px] mt-1 text-gray-500">Gestión de disponibilidad y ocupación</p>
          </div>
          
          <div className="self-start sm:self-auto">
            <Select value={filtroArea} onValueChange={(val) => setFiltroArea(val || "Todas")}>
              <SelectTrigger className="w-[180px] bg-white shadow-sm border-gray-200">
                <SelectValue placeholder="Seleccionar área" />
              </SelectTrigger>
              <SelectContent>
                {["Todas", "Interior", "Ventana", "Terraza"].map(area => (
                  <SelectItem key={area} value={area}>
                    {area === "Todas" ? "Todas las áreas" : area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Seccion ocupado y mesas*/}
        <GridEstados estados={estadosData} statusColors={statusColors} />
        {/* Seccion de mesas*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {mesasFiltradas.length > 0 ? (
            mesasFiltradas.map((mesa) => (
            <CardMesa
              key={mesa.id}
              mesa={mesa}
              onClick={actions.openMesaInfo}
              statusColors={statusColors}
            />
          ))) : (
            <div className="col-span-full py-10 flex flex-col items-center justify-center text-gray-400">
              <span className="text-4xl mb-3">📍</span>
              <p className="text-[14px] font-medium">No se encontraron mesas en el área seleccionada ({filtroArea}).</p>
            </div>
          )}
        </div>
        
      </div>

      <ModalConfirmacion 
        open={modals.isInfoOpen}
        onOpenChange={modals.setIsInfoOpen}
        mesa={selectedMesa}
        onConfirm={(mesa) => {
          // Cambiamos visualmente el estado a 'Ocupado'
          actions.updateMesa(mesa.id, "Ocupado");
        }}
      />
    </div>
  );
}
