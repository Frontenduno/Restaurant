import { X, Printer, Download } from "lucide-react";
import type { RegistroHistorial } from "../hooks/historial";

// =============================================================================
// PANEL LATERAL — Detalle de cobro
// =============================================================================

interface PanelHistorialProps {
    registro: RegistroHistorial;
    onClose: () => void;
}

export function PanelHistorial({ registro, onClose }: PanelHistorialProps) {
    const subtotal = registro.total / 1.18;
    const igv      = registro.total - subtotal;

    const esBoleta = registro.tipo === "Boleta";

    return (
        // Contenedor lateral — ancho fijo, fondo blanco, borde izquierdo sutil
        <aside className="w-[350px] shrink-0 bg-white border-l border-gray-100 flex flex-col h-full overflow-y-auto">

            {/* ── Cabecera del panel ── */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-10">
                <span className="text-[13px] font-bold text-gray-700">
                    Historial · {registro.mesaNombre}
                </span>
                <button
                    onClick={onClose}
                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                    <X size={13} className="text-gray-500" />
                </button>
            </div>

            <div className="px-4 py-4 flex flex-col gap-4">

                {/* ── Info general ── */}
                <div className="bg-gray-50 rounded-xl overflow-hidden text-[12px]">
                    {[
                        {
                            label: "Mesa",
                            value: (
                                <span className="text-[#2563EB] font-semibold">
                                    {registro.mesaNombre} · {registro.zona}
                                </span>
                            ),
                        },
                        {
                            label: "Cliente",
                            value: (
                                <span className="text-[#2563EB] font-semibold">
                                    {registro.cliente}
                                </span>
                            ),
                        },
                        {
                            label: "Hora",
                            value: (
                                <span className="text-[#2563EB] font-bold">
                                    {registro.hora}
                                </span>
                            ),
                        },
                        {
                            label: "Tipo",
                            value: (
                                <span
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border
                                        ${esBoleta
                                            ? "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]"
                                            : "bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]"
                                        }`}
                                >
                                    {esBoleta ? "🧾" : "📄"} {registro.tipo}
                                </span>
                            ),
                        },
                    ].map(({ label, value }) => (
                        <div
                            key={label}
                            className="flex items-center justify-between px-3 py-2 border-b border-gray-100 last:border-0"
                        >
                            <span className="text-gray-400 font-medium">{label}</span>
                            {value}
                        </div>
                    ))}
                </div>

                {/* ── Detalle de consumo ── */}
                <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Detalle de consumo
                    </p>

                    <div className="flex flex-col divide-y divide-gray-100">
                        {registro.items.map((it, i) => (
                            <div key={i} className="py-2.5">
                                <div className="flex items-start justify-between gap-2">
                                    <span className="text-[13px] font-semibold text-[#2563EB] leading-tight">
                                        {it.nombre}
                                    </span>
                                    <span className="text-[13px] font-bold text-gray-800 shrink-0">
                                        S/ {(it.precio * it.cantidad).toFixed(2)}
                                    </span>
                                </div>
                                <p className="text-[11px] text-gray-400 mt-0.5">
                                    {it.cantidad} unidades × S/ {it.precio.toFixed(2)}
                                </p>
                                {it.nota && (
                                    <span className="inline-block mt-1 text-[10px] font-semibold text-amber-500 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
                                        {it.nota}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Totales ── */}
                <div className="bg-gray-50 rounded-xl px-3 py-3 text-[12px] space-y-1.5">
                    <div className="flex justify-between text-gray-500">
                        <span>Subtotal</span>
                        <span>S/ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                        <span>IGV (18%)</span>
                        <span>S/ {igv.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-black text-[14px] text-[#2563EB] pt-1.5 border-t border-gray-200">
                        <span>Total cobrado</span>
                        <span>S/ {registro.total.toFixed(2)}</span>
                    </div>
                </div>

                {/* ── Acciones ── */}
                <div className="flex gap-2">
                    <button className="flex-1 h-9 border border-gray-200 bg-white rounded-lg text-[11px] font-semibold text-gray-600 flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors">
                        <Printer size={13} />
                        Reimprimir
                    </button>
                    <button className="flex-[1.3] h-9 bg-[#3461FF] hover:bg-[#2452E8] text-white rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors">
                        <Download size={13} />
                        Descargar PDF
                    </button>
                </div>

            </div>
        </aside>
    );
}