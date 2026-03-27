import { UserRound, Clock, CheckCircle2, XCircle } from "lucide-react";
import type { comandaDetalle } from "../../types/index";

interface CardHistorialComandaProps {
  detalles: comandaDetalle[];
  onVerDetalle: () => void;
}

function CardHistorialComanda({
  detalles,
  onVerDetalle,
}: CardHistorialComandaProps) {
  const cabecera = detalles[0].id_comanda;
  const esCancelado = cabecera.estado_comanda?.toLowerCase() === "cancelado";

  const config = {
    colorBorde: esCancelado ? "border-red-500" : "border-emerald-500",
    bgBadge: esCancelado ? "bg-red-50" : "bg-emerald-50",
    textColor: esCancelado ? "text-red-600" : "text-emerald-600",
    label: esCancelado ? "CANCELADO" : "LISTO",
    Icono: esCancelado ? XCircle : CheckCircle2,
  };

  const formatHora = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={`w-[350px] bg-white rounded-2xl shadow-lg overflow-hidden border-t-8 ${config.colorBorde} font-sans flex flex-col`}
    >
      <div className="p-5 flex flex-col h-full">
        {/* Encabezado: Mesa, ID y Mesero */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900 leading-none">
                Mesa {cabecera.id_mesa}
              </h2>
              {/* Badge sutil para el ID */}
              <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-tighter">
                #{cabecera.id_comanda}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 mt-2">
              <UserRound className="w-4 h-4" />
              <span className="text-sm font-medium">
                {cabecera.id_mesero.nombre}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bgBadge} ${config.textColor}`}
            >
              <config.Icono className="w-4 h-4 font-bold" />
              <span className="text-xs font-black tracking-wider uppercase">
                {config.label}
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">
                {formatHora(cabecera.fecha)}
              </span>
            </div>
          </div>
        </div>

        {/* Lista de platos... (el resto del código se mantiene igual) */}
        <div className="space-y-4 mb-6">
          {detalles.map((item) => (
            <div key={item.id_detalle} className="flex flex-col">
              <div className="flex items-baseline gap-3">
                <span className="text-lg font-black text-blue-600">
                  {item.cantidad}x
                </span>
                <span
                  className={`text-lg font-bold ${esCancelado ? "text-slate-400 line-through" : "text-slate-800"}`}
                >
                  {item.id_menu.nombre}
                </span>
              </div>

              {item.observaciones && (
                <span className="text-sm font-medium text-slate-400 ml-9 italic">
                  {item.observaciones}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-auto flex justify-end">
          <button
            onClick={onVerDetalle}
            className="text-blue-600 hover:text-blue-800 font-black text-sm tracking-widest uppercase transition-colors"
          >
            VER DETALLE
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardHistorialComanda;
