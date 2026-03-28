import { Eye, Printer, ChevronDown, FileText, ReceiptText } from "lucide-react";
import type { Solicitud } from "../types/solicitud";
import { ItemDetalle } from "./ItemDetalle";
import { ResumenTotal } from "./ResumenTotal";

interface SolicitudCardProps {
  solicitud: Solicitud;
  isExpanded: boolean;
  onToggle: () => void;
  onVistaPrevia: () => void;
  onImprimir: () => void;
  subtotal: number;
  igv: number;
  total: number;
}

export function SolicitudCard({
  solicitud,
  isExpanded,
  onToggle,
  onVistaPrevia,
  onImprimir,
  subtotal,
  igv,
  total,
}: SolicitudCardProps) {
  const isPrecuenta = solicitud.tipoDocumento === "pre-cuenta";
  const isFactura = solicitud.subTipo === "factura";
  const isBoleta = solicitud.subTipo === "boleta";

  let badgeColor = "bg-blue-100 text-blue-700";
  let icon = <ReceiptText className="w-3.5 h-3.5" />;
  let label = "Pre-Cuenta";

  if (isFactura) {
    badgeColor = "bg-[#f3e8ff] text-[#9333ea]";
    icon = <FileText className="w-3.5 h-3.5" />;
    label = "Factura";
  } else if (isBoleta) {
    badgeColor = "bg-emerald-100 text-emerald-700";
    icon = <FileText className="w-3.5 h-3.5" />;
    label = "Boleta";
  }

  // Nombre principal a mostrar (Empresa o Cliente) en la cabecera
  const nombreCliente = solicitud.datosCliente?.nombreRazonSocial || (isFactura ? "Cliente" : "");

  return (
    <div
      className={`
        bg-white rounded-2xl border transition-all duration-300 overflow-hidden
        ${isExpanded
          ? "border-blue-200 shadow-lg shadow-blue-100/50"
          : "border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"
        }
      `}
    >
      {/* Header — siempre visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between p-5 text-left cursor-pointer group"
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-gray-900 mb-1">
              {solicitud.mesaNombre}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
                {icon}
                {label}
              </span>
              {(isFactura || isBoleta) && (
                <div className="text-xs text-gray-600 font-medium flex items-center">
                  <span className="text-gray-900 font-bold">{nombreCliente}</span>
                  <span className="mx-1.5 text-gray-300">·</span>
                  <span className="text-gray-400">Mesero:</span>
                  <span className="ml-1 text-gray-600 font-semibold">{solicitud.meseroNombre}</span>
                </div>
              )}
              {isPrecuenta && (
                <div className="text-xs text-gray-600 font-medium flex items-center">
                  <span className="text-gray-400">Mesero:</span>
                  <span className="ml-1 text-gray-600 font-semibold">{solicitud.meseroNombre}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-3">
            <span className="text-lg font-extrabold text-gray-900">
              S/ {total.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
            {solicitud.hora}
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>
      </button>

      {/* Cuerpo expandible */}
      <div
        className={`
          transition-all duration-300 ease-in-out overflow-hidden
          ${isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-5 pb-5">
          {/* Datos del Cliente (Sólo si hay datos estructurados, común en Factura) */}
          {solicitud.datosCliente && (
            <div className="mb-4 bg-[#fdfcff] border border-[#f3e8ff] rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <ReceiptText className="w-4 h-4 text-[#9333ea]" />
                <h4 className="text-xs font-bold text-[#9333ea] uppercase tracking-wider">
                  Datos del cliente
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                <div className="text-sm">
                  <span className="text-gray-500 font-medium mr-2">Razón Social</span>
                  <span className="font-bold text-gray-900">{solicitud.datosCliente.nombreRazonSocial}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500 font-medium mr-2">RUC/DNI</span>
                  <span className="font-bold text-gray-900">{solicitud.datosCliente.documentoIdentidad}</span>
                </div>
                {solicitud.datosCliente.direccion && (
                  <div className="text-sm">
                    <span className="text-gray-500 font-medium mr-2">Dirección</span>
                    <span className="font-bold text-gray-900">{solicitud.datosCliente.direccion}</span>
                  </div>
                )}
                {solicitud.datosCliente.email && (
                  <div className="text-sm">
                    <span className="text-gray-500 font-medium mr-2">Email</span>
                    <span className="font-bold text-gray-900">{solicitud.datosCliente.email}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Items */}
          <div className="border-t border-gray-100 pt-1">
            {solicitud.items.map((item) => (
              <ItemDetalle key={item.id} item={item} />
            ))}
          </div>

          {/* Resumen */}
          <ResumenTotal subtotal={subtotal} igv={igv} total={total} />

          {/* Botones de acción */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={(e) => { e.stopPropagation(); onVistaPrevia(); }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              Vista previa
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onImprimir(); }}
              className="flex-[2] flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0D00FF] text-white text-sm font-bold hover:bg-[#0a00cc] transition-colors shadow-md shadow-blue-200 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              {isFactura ? 'IMPRIMIR FACTURA' : isBoleta ? 'IMPRIMIR BOLETA' : 'IMPRIMIR'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
