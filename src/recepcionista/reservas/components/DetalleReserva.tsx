import { X, Clock, Users, Check, AlertTriangle, Trash2 } from "lucide-react";
import { Avatar } from "./Avatar";
import { ESTADO_STYLES } from "../utils/reservasUtils";
import type { Mesa } from "@/types";

interface DetalleReservaProps {
  reserva: any;
  mesas: Mesa[];
  onClose: () => void;
  onCancel: (id: number) => void;
  onConfirmar: (id: number) => void;
}

export function DetalleReserva({ reserva, mesas, onClose, onCancel, onConfirmar }: DetalleReservaProps) {
  const r = reserva;
  const capacidadTotal = mesas.reduce((s, m) => s + m.capacity, 0);
  const esCombinada = mesas.length > 1;
  const est = ESTADO_STYLES[r.estado] || ESTADO_STYLES.pendiente;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 animate-in slide-in-from-right-8 duration-300 bg-white rounded-xl border border-gray-200 shadow-sm ml-2">
      {/* Header del panel */}
      <div className="flex justify-between items-center mb-6 pt-2">
        <h2 className="m-0 text-[16px] font-bold text-gray-800">
          Detalle de Reserva
        </h2>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors">
            <X className="w-4 h-4" />
        </button>
      </div>

      {/* Avatar + nombre */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-gray-100 mb-5 flex flex-col items-center gap-3 shadow-inner">
        <Avatar nombre={r.nombre} size={64} />
        <div className="text-center">
          <div className="font-bold text-xl text-gray-900">{r.nombre}</div>
          <div className="flex gap-2 justify-center mt-2 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${est.bg} ${est.color} ${est.border}`}>
                {est.label}
            </span>
            {esCombinada && (
              <span className="bg-amber-100 text-amber-700 border border-amber-200 rounded-full px-3 py-1 text-[11px] font-bold">
                  🔗 Mesas combinadas
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { icon: <Clock className="w-5 h-5 text-indigo-500" />, label: "Hora reservada", valor: r.hora },
          { icon: <Users className="w-5 h-5 text-indigo-500" />, label: "Personas",       valor: `${r.personas} persona${r.personas > 1 ? "s" : ""}` },
          { icon: "🪑", label: esCombinada ? "Mesas combinadas" : "Mesa asignada",
            valor: mesas.map(m => m.name).join(" + ") },
          { icon: "📍", label: "Ubicación",      valor: [...new Set(mesas.map(m => m.location?.detalle || 'Interior'))].join(" / ") },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-xl p-4 border border-gray-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="mb-2 text-xl">{item.icon}</div>
            <div className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">
              {item.label}
            </div>
            <div className="text-[13px] font-bold text-gray-900 mt-1">
              {item.valor}
            </div>
          </div>
        ))}
      </div>

      {/* Capacidad visual */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-600 font-medium tracking-tight">
            Capacidad total — {r.personas}/{capacidadTotal} asientos
          </span>
          <span className={`text-[11px] font-bold flex items-center gap-1 ${capacidadTotal >= r.personas ? "text-green-600" : "text-red-500"}`}>
            {capacidadTotal >= r.personas ? <><Check className="w-3.5 h-3.5" /> Suficiente</> : <><AlertTriangle className="w-3.5 h-3.5" /> Insuficiente</>}
          </span>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {Array.from({ length: Math.min(capacidadTotal, 20) }).map((_, i) => (
            <span key={i} className={`text-xl transition-all ${i < r.personas ? "opacity-100 scale-110" : "opacity-30 grayscale"}`}>🪑</span>
          ))}
          {capacidadTotal > 20 && <span className="text-xs font-bold text-gray-400 self-end ml-1">+{capacidadTotal - 20} más</span>}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => onCancel(r.id)}
          className="flex-1 py-3 bg-white text-red-500 border-[1.5px] border-red-200 rounded-xl font-bold text-[13px] hover:bg-red-50 focus:ring-4 focus:ring-red-100 transition-all flex justify-center items-center gap-2"
        >
          <Trash2 className="w-4 h-4" /> Cancelar
        </button>
        <button
          onClick={() => onConfirmar(r.id)}
          className="flex-2 py-3 bg-green-500 text-white border-transparent rounded-xl font-bold text-[13px] hover:bg-green-600 focus:ring-4 focus:ring-green-100 transition-all flex justify-center items-center gap-2 shadow-sm"
        >
          <Check className="w-4 h-4" /> Confirmar llegada
        </button>
      </div>
    </div>
  );
}
