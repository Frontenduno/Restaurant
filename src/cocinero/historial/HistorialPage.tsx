import CocineroHeader from "../components/CocineroHeader";
import { Calendar } from "lucide-react";
import { useInventario } from "./hooks/useInventario";
import FiltroHistorialComanda from "./components/FiltroHistorialComanda";
import ListHistorialComanda from "./components/ListCardHistorialComanda";
import ModalDetalleComanda from "../components/ModalComandaDetalle";

function HistorialPage() {
  const {
    comandasAgrupadas,
    obtenerDetallesPorId,
    isOpenDetalle,
    setIsOpenDetalle,
    comandaSeleccionada,
    seleccionarComanda,
    setFiltroId,
    setFiltroEstado,
    setFechaInicio,
    setFechaFin,
  } = useInventario();
  return (
    <div>
      <CocineroHeader title="Historial" icon={Calendar} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <p className="text-neutral-400">Historial de Comandas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full">
          <FiltroHistorialComanda
            onSearchChange={setFiltroId}
            onEstadoChange={setFiltroEstado}
            onFechaFinChange={setFechaFin}
            onFechaInicioChange={setFechaInicio}
          />
        </div>
        <div className="col-span-full">
          <ListHistorialComanda
            comandas={comandasAgrupadas}
            onVerDetalle={seleccionarComanda}
          />
        </div>
      </div>

      {/* Modal Detalle */}
      {isOpenDetalle && comandaSeleccionada !== null && (
        <ModalDetalleComanda
          isOpen={isOpenDetalle}
          onClose={() => setIsOpenDetalle(false)}
          detalles={obtenerDetallesPorId(comandaSeleccionada)}
        />
      )}
    </div>
  );
}

export default HistorialPage;
