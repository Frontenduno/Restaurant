import { UserRound, Clock, AlertTriangle } from "lucide-react";
import type { comandaDetalle } from "../../types/comanda";

interface CardComandaEnCocinaProps {
  // Recibe el array de platos de una sola mesa
  detalles: comandaDetalle[];
  onListo?: () => void;
  onVerDetalle?: () => void;
  tiempo?: string;
  estado?: "normal" | "advertencia" | "retrasado";
}

function CardComandaEnCocina({
  detalles,
  onListo,
  onVerDetalle,
  tiempo = "12:05", // Tiempo de prueba
  estado = "normal",
}: CardComandaEnCocinaProps) {
  const cabecera = detalles[0].id_comanda;

  const config = {
    normal: {
      border: "border-green-500",
      text: "text-green-500",
      label: "TRANSCURRIDO",
      Icon: Clock,
    },
    advertencia: {
      border: "border-orange-500",
      text: "text-orange-500",
      label: "RIESGO",
      Icon: Clock,
    },
    retrasado: {
      border: "border-red-500",
      text: "text-red-500",
      label: "RETRASADO",
      Icon: AlertTriangle,
    },
  };

  const { border, text, label, Icon } = config[estado];

  return (
    <div
      className={`w-[350px] bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 ${border} font-sans`}
    >
      <div className="p-5">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-950 tracking-tight leading-none">
              Mesa {cabecera.id_mesa}
            </h2>
            <div className="flex items-center gap-2 text-slate-400 mt-2">
              <UserRound className="w-4 h-4 stroke-[1.5]" />
              <span className="text-sm font-medium">
                Mesero: {cabecera.id_mesero.nombre}
              </span>
            </div>
          </div>

          <div className={`flex flex-col items-end ${text}`}>
            <div className="flex items-center gap-1.5 font-black text-xl tracking-tighter">
              <Icon size={18} className="stroke-[3]" />
              <span>{tiempo}</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider leading-none">
              {label}
            </span>
          </div>
        </div>

        {/* Lista Real de Productos */}
        <div className="space-y-3 mb-6 min-h-[100px]">
          {detalles.map((item) => (
            <div key={item.id_detalle} className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-slate-800">
                  {item.cantidad}x
                </span>
                <span className="text-base font-bold text-slate-800">
                  {item.id_menu.nombre}
                </span>
              </div>
              {item.observaciones && (
                <span
                  className={`text-xs font-bold ${text} mt-0.5 ml-6 italic`}
                >
                  {item.observaciones}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={onListo}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 px-4 rounded-xl transition duration-150 shadow-md active:scale-[0.95]"
          >
            LISTO
          </button>
          <button
            onClick={onVerDetalle}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 text-sm font-bold py-3 px-4 rounded-xl transition duration-150 active:scale-[0.95]"
          >
            VER DETALLE
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardComandaEnCocina;
