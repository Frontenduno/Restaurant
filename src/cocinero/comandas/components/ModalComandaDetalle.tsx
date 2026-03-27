import {
  X,
  Receipt,
  MapPin,
  Clock,
  UtensilsCrossed,
  Package,
} from "lucide-react";
import type { comandaDetalle } from "../types/index";

interface ModalDetalleComandaProps {
  isOpen: boolean;
  onClose: () => void;
  detalles: comandaDetalle[];
}

function ModalDetalleComanda({
  isOpen,
  onClose,
  detalles,
}: ModalDetalleComandaProps) {
  if (!isOpen) return null;

  const cabecera = detalles[0].id_comanda;
  const totalArticulos = detalles.reduce((acc, item) => acc + item.cantidad, 0);

  const formatHora = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* HEADER */}
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2.5 rounded-2xl">
              <Receipt className="w-6 h-6 text-[#1A73E8]" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 leading-none">
                Detalle de Comanda
              </h2>
              <span className="text-[#1A73E8] font-bold text-lg">
                #{cabecera.id_comanda}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* CONTENIDO SCROLLABLE */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* CARDS DE INFORMACIÓN (UBICACIÓN Y TIEMPOS) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-2 mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <MapPin className="w-3 h-3" /> UBICACIÓN
              </div>
              <p className="text-lg font-black text-slate-800">
                Mesa {cabecera.id_mesa}
              </p>
              <p className="text-sm font-medium text-slate-500">
                Mesero: {cabecera.id_mesero.nombre}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Clock className="w-3 h-3" /> TIEMPOS
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-slate-500 italic">
                  Inicio
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {formatHora(cabecera.fecha)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-slate-500 italic">
                  Fin est.
                </span>
                <span className="text-sm font-bold text-slate-800">----</span>
              </div>
            </div>
          </div>

          {/* LISTA DE PRODUCTOS */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-[11px] font-black text-slate-900 uppercase tracking-widest">
              <UtensilsCrossed className="w-4 h-4 text-[#1A73E8]" />
              PRODUCTOS SOLICITADOS
            </div>

            <div className="space-y-3">
              {detalles.map((item) => (
                <div
                  key={item.id_detalle}
                  className="bg-white border border-slate-100 p-4 rounded-[24px] shadow-sm flex items-start gap-4"
                >
                  <div className="bg-[#1A73E8] text-white font-black px-3 py-1.5 rounded-xl text-sm min-w-[40px] text-center">
                    {item.cantidad}x
                  </div>
                  <div className="flex-1">
                    <p className="font-extrabold text-slate-800 text-base">
                      {item.id_menu.nombre}
                    </p>
                    {item.observaciones && (
                      <div className="mt-2 bg-amber-50/50 p-2 rounded-xl border border-amber-100/50">
                        <p className="text-xs font-semibold text-amber-700 italic">
                          💡 {item.observaciones}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RESUMEN DE PEDIDO */}
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-5 rounded-[24px] flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-500 font-bold">
              <Package className="w-5 h-5" />
              <span>Resumen de pedido</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-400">
                Total: {totalArticulos} artículos
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER - BOTÓN CERRAR */}
        <div className="p-6 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full bg-[#1A73E8] hover:bg-[#1557B0] active:scale-[0.98] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-200 text-lg"
          >
            Cerrar Detalle
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDetalleComanda;
