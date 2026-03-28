import { Store } from "lucide-react";
import { CajeroHeader } from "../components/CajeroHeader";
import { CajaInfo } from "./components/CajaInfo";
import { TabsFiltro } from "./components/TabsFiltro";
import { SolicitudCard } from "./components/SolicitudCard";
import { VistaPreviaModal } from "./components/VistaPreviaModal";
import { useSolicitudes } from "./hooks/useSolicitudes";

export function SolicitudesPage() {
  const {
    tabActivo,
    setTabActivo,
    solicitudesFiltradas,
    contadores,
    solicitudExpandida,
    toggleExpandir,
    solicitudPrevia,
    abrirVistaPrevia,
    cerrarVistaPrevia,
    imprimirSolicitud,
    calcularSubtotal,
    calcularIGV,
    calcularTotal,
  } = useSolicitudes();

  // Calcular totales para el modal
  const previaSubtotal = solicitudPrevia ? calcularSubtotal(solicitudPrevia) : 0;
  const previaIGV = solicitudPrevia ? calcularIGV(solicitudPrevia) : 0;
  const previaTotal = solicitudPrevia ? calcularTotal(solicitudPrevia) : 0;

  return (
    <div className="w-full flex flex-col font-sans h-full">
      <CajeroHeader title="Cajero" icon={<Store className="w-6 h-6 text-black" />} showBell />

      {/* Título + Caja */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-[28px] font-semibold text-gray-800 leading-tight">
            Solicitudes
          </h2>
          <p className="text-[15px] mt-1 text-gray-500">
            Seleccione una solicitud para ver el detalle e imprimir
          </p>
        </div>
        <CajaInfo />
      </div>

      {/* Tabs */}
      <TabsFiltro
        tabActivo={tabActivo}
        onTabChange={setTabActivo}
        contadores={contadores}
      />

      {/* Lista de solicitudes */}
      <div className="flex flex-col gap-4">
        {solicitudesFiltradas.length > 0 ? (
          solicitudesFiltradas.map((solicitud) => {
            const subtotal = calcularSubtotal(solicitud);
            const igv = calcularIGV(solicitud);
            const total = calcularTotal(solicitud);

            return (
              <SolicitudCard
                key={solicitud.id}
                solicitud={solicitud}
                isExpanded={solicitudExpandida === solicitud.id}
                onToggle={() => toggleExpandir(solicitud.id)}
                onVistaPrevia={() => abrirVistaPrevia(solicitud)}
                onImprimir={() => imprimirSolicitud(solicitud.id)}
                subtotal={subtotal}
                igv={igv}
                total={total}
              />
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <span className="text-5xl mb-4">📋</span>
            <p className="text-[15px] font-medium">
              No hay solicitudes de tipo "{tabActivo === "pre-cuenta" ? "Pre-Cuenta" : "Boletas-Facturas"}"
            </p>
          </div>
        )}
      </div>

      {/* Modal Vista Previa */}
      <VistaPreviaModal
        solicitud={solicitudPrevia}
        open={!!solicitudPrevia}
        onClose={cerrarVistaPrevia}
        onImprimir={() => solicitudPrevia && imprimirSolicitud(solicitudPrevia.id)}
        subtotal={previaSubtotal}
        igv={previaIGV}
        total={previaTotal}
      />
    </div>
  );
}
