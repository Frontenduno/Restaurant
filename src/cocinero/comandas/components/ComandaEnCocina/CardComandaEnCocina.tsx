import { UserRound } from "lucide-react";
import type { comandaDetalle } from "../../../types";
import { TimerComanda } from "./TimerComanda";

interface CardComandaEnCocinaProps {
  detalles: comandaDetalle[];
  onListo?: () => void;
  onVerDetalle?: () => void;
}

function CardComandaEnCocina({
  detalles,
  onListo,
  onVerDetalle,
}: CardComandaEnCocinaProps) {
  const cabecera = detalles[0].id_comanda;

  // Definimos el límite y cortamos el array
  const LIMITE_PLATOS = 4;
  const platosVisibles = detalles.slice(0, LIMITE_PLATOS);
  const tieneMasPlatos = detalles.length > LIMITE_PLATOS;

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-slate-200 font-sans flex flex-col h-full">
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-950 leading-none">
              Mesa {cabecera.id_mesa}
            </h2>
            <div className="flex items-center gap-2 text-slate-400 mt-2">
              <UserRound className="w-4 h-4" />
              <span className="text-sm font-medium">
                Mesero: {cabecera.id_mesero.nombre}
              </span>
            </div>
          </div>

          <TimerComanda fechaInicio={cabecera.fecha} />
        </div>

        {/* Lista de platos limitada a 4 */}
        <div className="space-y-4 mb-4 min-h-[100px]">
          {platosVisibles.map((item) => (
            <div
              key={item.id_detalle}
              className="flex flex-col border-l-2 border-slate-100 pl-3"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-base font-black text-slate-900">
                  {item.cantidad}x
                </span>
                <span className="text-base font-bold text-slate-800">
                  {item.id_menu.nombre}
                </span>
              </div>

              {item.observaciones && item.observaciones.trim() !== "" && (
                <span className="text-xs font-semibold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-md mt-1 w-fit italic">
                  Nota: {item.observaciones}
                </span>
              )}
            </div>
          ))}

          {/* Indicador de platos adicionales */}
          {tieneMasPlatos && (
            <div className="pt-1">
              <span className="text-xs font-bold text-[#1A73E8] bg-blue-50 px-3 py-1 rounded-full">
                + {detalles.length - LIMITE_PLATOS} platos adicionales...
              </span>
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col gap-3 mt-auto">
          <button
            onClick={onListo}
            className="w-full bg-[#1A73E8] hover:bg-[#1557B0] active:bg-[#0E3C7A] text-white font-bold py-3.5 rounded-full transition-all duration-200 text-sm tracking-wide shadow-sm"
          >
            LISTO
          </button>

          <button
            onClick={onVerDetalle}
            className="w-full bg-[#F1F3F4] hover:bg-[#E8EAED] active:bg-[#DADCE0] text-[#5F6368] font-semibold py-3.5 rounded-full transition-all duration-200 text-sm tracking-wide shadow-sm border border-[#E0E0E0]/50"
          >
            VER DETALLE
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardComandaEnCocina;
