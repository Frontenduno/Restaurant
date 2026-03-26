import { useState } from "react";
import { MeserHeader } from "../components/MeserHeader";
import { ChartNetwork, CheckCircle2, ClockIcon } from "lucide-react";
import { PanelHistorial } from "./components/PanelHistorial";
import { type RegistroHistorial, useHistorial } from "./hooks/historial";

// =============================================================================
// SUB-COMPONENTE: Tarjeta de registro
// =============================================================================

interface RegistroCardProps {
    registro: RegistroHistorial;
    seleccionado: boolean;
    onClick: () => void;
}

function RegistroCard({ registro, seleccionado, onClick }: RegistroCardProps) {
    const esBoleta = registro.tipo === "Boleta";

    return (
        <button
            onClick={onClick}
            className={`
                w-full text-left flex items-center gap-4 rounded-xl border px-4 py-3.5 transition-all
                ${seleccionado
                    ? "border-[#22C55E] bg-[#F0FDF4] shadow-sm"
                    : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/30"
                }
            `}
        >
            {/* Ícono checkmark */}
            <div
                className={`
                    w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                    ${seleccionado ? "bg-[#22C55E]" : "bg-[#DCFCE7]"}
                `}
            >
                <CheckCircle2
                    size={20}
                    className={seleccionado ? "text-white" : "text-[#22C55E]"}
                />
            </div>

            {/* Info central */}
            <div className="flex-1 min-w-0">
                {/* Nombre mesa + zona */}
                <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-bold text-gray-800">
                        {registro.mesaNombre}
                    </span>
                    <span className="text-[12px] text-gray-400 font-medium">
                        · {registro.zona}
                    </span>
                </div>

                {/* Badge tipo + cliente */}
                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border
                            ${esBoleta
                                ? "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]"
                                : "bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]"
                            }`}
                    >
                        {esBoleta ? "🧾" : "📄"} {registro.tipo}
                    </span>
                    <span className="text-[11px] text-gray-400">
                        · {registro.cliente}
                    </span>
                </div>

                {/* Chips de platos */}
                <div className="flex flex-wrap gap-1 mt-1.5">
                    {registro.items.map((it, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center gap-1 bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] rounded-md px-2 py-0.5 text-[10px] font-semibold"
                        >
                            <span className="font-extrabold">{it.cantidad}×</span>
                            {it.nombre}
                        </span>
                    ))}
                </div>
            </div>

            {/* Total + hora + ver detalle */}
            <div className="text-right shrink-0 flex flex-col items-end gap-0.5">
                <span className="text-[15px] font-black text-gray-800">
                    S/ {registro.total.toFixed(2)}
                </span>
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <ClockIcon size={10} className="opacity-60" />
                    {registro.hora}
                </span>
                <span className="text-[11px] text-[#2563EB] font-semibold mt-0.5">
                    Ver detalle →
                </span>
            </div>
        </button>
    );
}

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

export function Historial() {
    const [seleccionado, setSeleccionado] = useState<RegistroHistorial | null>(null);
    const { historial } = useHistorial();

    const handleSeleccionar = (r: RegistroHistorial) => {
        // Toggle: click en el mismo cierra el panel
        setSeleccionado(prev => (prev?.id === r.id ? null : r));
    };

    return (
        <div className="w-full flex flex-col font-sans h-full">
            <MeserHeader title="Mesero" icon={ChartNetwork} />

            {/* Layout: lista + panel lateral */}
            <div className="flex flex-1 overflow-hidden">

                {/* ── Lista principal ── */}
                <div className="flex-1 overflow-y-auto px-4 pt-4 pb-10">
                    {/* Título */}
                    <div className="mb-5">
                        <h2 className="text-[26px] font-semibold text-gray-800 leading-tight">
                            Historial
                        </h2>
                        <p className="text-[14px] text-gray-400 mt-0.5">
                            Selecciona un registro para ver el detalle del cobro
                        </p>
                    </div>

                    {/* Registros */}
                    {historial.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center py-16">
                            Sin registros hoy.
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {historial.map(r => (
                                <RegistroCard
                                    key={r.id}
                                    registro={r}
                                    seleccionado={seleccionado?.id === r.id}
                                    onClick={() => handleSeleccionar(r)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Panel lateral (se muestra al seleccionar) ── */}
                {seleccionado && (
                    <PanelHistorial
                        registro={seleccionado}
                        onClose={() => setSeleccionado(null)}
                    />
                )}

            </div>
        </div>
    );
}