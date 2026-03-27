import { UserRound } from "lucide-react";
import type { comandaDetalle } from "../../../types/comanda";

const statusColors = {
  Pendiente: "bg-blue-100 text-blue-700",
  "En Cocina": "bg-yellow-100 text-yellow-800",
  Listo: "bg-green-100 text-green-700",
};

interface CardComandaPendienteProps {
  comanda: comandaDetalle;
  comandaDetalles: comandaDetalle[];
  onAceptar: () => void;
  onTransferir: () => void;
}

function CardComandaPendiente({
  comanda,
  comandaDetalles,
  onAceptar,
  onTransferir,
}: CardComandaPendienteProps) {
  const { id_comanda } = comanda;
  const {
    id_mesa,
    estado_comanda,
    id_comanda: idPedido,
    id_mesero,
  } = id_comanda;

  const detallesDeEstaMesa = comandaDetalles.filter(
    (item: any) => item.id_comanda?.id_comanda === id_comanda?.id_comanda,
  );

  const tiposUnicos = Array.from(
    new Set(detallesDeEstaMesa.map((item: any) => item.id_menu?.tipo)),
  );

  const resumenTipos = tiposUnicos.map((tipo) => {
    const cantidad = detallesDeEstaMesa.filter(
      (item: any) => item.id_menu?.tipo === tipo,
    ).length;
    return { tipo, cantidad };
  });

  const colorEstado =
    statusColors[estado_comanda as keyof typeof statusColors] ||
    "bg-gray-100 text-gray-700";

  return (
    /* Quitamos min-h fijo. h-full permite que la card se estire según el grid */
    <div className="w-[320px] h-full flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-slate-300 font-sans">
      {/* flex-1 aquí es la clave: empuja los botones hacia abajo */}
      <div className="p-5 flex flex-col flex-1">
        {/* Header (Mesa, Estado, ID) */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold text-slate-950 tracking-tight">
              Mesa {id_mesa}
            </h2>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${colorEstado}`}
            >
              {estado_comanda}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-400">#{idPedido}</span>
        </div>

        {/* Mesero */}
        <div className="flex items-center gap-2.5 text-slate-600 mb-4">
          <UserRound className="w-5 h-5 stroke-[1.5]" />
          <span className="text-sm font-medium">
            Mesero: {id_mesero.nombre}
          </span>
        </div>

        {/* Resumen de platos (Contenido variable) */}
        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mb-4">
          {resumenTipos.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <p className="text-sm font-bold text-slate-500">
                {item.cantidad} {item.tipo}
                {item.cantidad > 1 ? "s" : ""}
              </p>
              {index < resumenTipos.length - 1 && (
                <span className="text-slate-400 text-xs">•</span>
              )}
            </div>
          ))}
        </div>

        {/* Espaciador flexible: Este div crecerá para llenar el hueco */}
        <div className="flex-1 min-h-[20px]">
          <p className="text-sm text-slate-400 italic">
            Esperando Aprobación...
          </p>
        </div>

        {/* Botones: Siempre pegados abajo */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-2">
          <button
            onClick={onAceptar}
            className="w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white text-sm font-bold py-3.5 rounded-full transition-all shadow-md active:scale-[0.95]"
          >
            Aceptar
          </button>
          <button
            onClick={onTransferir}
            className="w-full bg-[#F1F3F4] hover:bg-[#E8EAED] text-[#5F6368] text-sm font-bold py-3.5 rounded-full transition-all active:scale-[0.95] border border-[#E0E0E0]/50"
          >
            Transferir
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardComandaPendiente;
