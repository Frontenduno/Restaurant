import { useAuth } from "@/auth";
import { MeserHeader } from "@/mesero/components/MeserHeader";
import { ChartNetwork } from "lucide-react";
import { CardMesa } from "./components/CardMese";
import { PanelMesa } from "./components/PanelMesa";
import { useMeser } from "./hooks/useMeser";
import { useMesaPanel } from "./hooks/useMesaPanel";
import estadosData from "@/data/mesas/estados.json";
import { GridEstados } from "./components/GridEstados";
import type { Mesa } from "@/types";

export const statusColors: Record<string, string> = {
  disponible: "bg-[#10b981]",
  ocupado: "bg-blue-500",
  reservado: "bg-orange-500",
};

export function MeseroPage() {
  const { user } = useAuth();
  const { mesaSeleccionada, abrirPanel, cerrarPanel } = useMesaPanel();

  if (!user) return null;

  const areaDelMesero = user.area?.nombre;
  const { mesas, updateMesaStatus, updateMesaComanda, updateMesaFase, updateMesaProgress } = useMeser(areaDelMesero);

  // Mesa actual con datos frescos (importante para ver comanda que pasó en localstorage)
  const mesaActual = mesaSeleccionada ? mesas.find(m => m.id === mesaSeleccionada.id) : null;

  return (
    <div className="w-full flex flex-col font-sans h-full">
      <MeserHeader title="Mesero" icon={ChartNetwork} />

      {/* Contenedor principal: flex row para grid + panel lateral */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── ZONA IZQUIERDA: cabecera + leyenda + grid ── */}
        <div className={`flex-1 flex flex-col overflow-y-auto px-2 pb-6 transition-all duration-300 ${mesaActual ? 'pr-4' : ''}`} >
          {/* Cabecera */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pt-0">
            <div>
              <h2 className="text-[28px] font-semibold text-gray-800 leading-tight">
                Mis mesas
              </h2>
              <p className="text-[15px] mt-1 text-gray-500">
                {areaDelMesero ? (
                  <>Área: <span className="font-semibold text-[#0D00FF]">{areaDelMesero}</span> · Toca una mesa para ver las opciones</>
                ) : (
                  "Toca una mesa para ver las opciones"
                )}
              </p>
            </div>
            <div className="bg-blue-50 text-blue-700 rounded-lg px-4 py-2 text-sm font-bold border border-blue-100 self-start sm:self-auto">
              {mesas.length} mesa{mesas.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Leyenda de estados */}
          <GridEstados estados={estadosData} statusColors={statusColors} />

          {/* Grid de cards — se adapta cuando el panel está abierto */}
          {mesas.length > 0 ? (
            <div className={`
              grid transition-all duration-300 ease-in-out
              ${mesaActual
                ? "grid-cols-4 gap-5"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5"
              }
            `}>
              {mesas.map((mesa: Mesa) => (
                <CardMesa
                  key={mesa.id}
                  mesa={mesa}
                  onClick={abrirPanel}
                  statusColors={statusColors}
                  isSelected={mesaActual?.id === mesa.id}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <span className="text-5xl mb-4">📍</span>
              <p className="text-[15px] font-medium">
                No hay mesas asignadas al área "{areaDelMesero}"
              </p>
            </div>
          )}
        </div>

        {/* ── PANEL LATERAL DERECHO ── aparece con animación */}
        {mesaActual && (
          <PanelMesa
            mesa={mesaActual}
            onClose={cerrarPanel}
            onStatusChange={updateMesaStatus}
            onUpdateComanda={updateMesaComanda}
            onUpdateFase={updateMesaFase}
            onUpdateProgress={updateMesaProgress}
          />
        )}
      </div>
    </div>
  );
}
