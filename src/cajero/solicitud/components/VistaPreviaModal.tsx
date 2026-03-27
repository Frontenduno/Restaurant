import { Printer, CheckCircle, UtensilsCrossed, Grid3X3 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Solicitud } from "../types/solicitud";

interface VistaPreviaModalProps {
  solicitud: Solicitud | null;
  open: boolean;
  onClose: () => void;
  onImprimir: () => void;
  subtotal: number;
  igv: number;
  total: number;
}

const pasos = [
  { num: 1, label: "Mesero\nenvía", done: true },
  { num: 2, label: "Cajero\nimprime", done: false },
  { num: 3, label: "Documento\nemitido", done: false },
];

export function VistaPreviaModal({
  solicitud,
  open,
  onClose,
  onImprimir,
  subtotal,
  igv,
  total,
}: VistaPreviaModalProps) {
  if (!solicitud) return null;

  const isPrecuenta = solicitud.tipoDocumento === "pre-cuenta";
  const isFactura = solicitud.subTipo === "factura";
  const isBoleta = solicitud.subTipo === "boleta";

  const tipoLabel = isPrecuenta
    ? "Pre-Cuenta"
    : isFactura
    ? "Factura Electrónica"
    : "Boleta Electrónica";

  // Render para Pre-cuenta (Diseño original)
  const renderPrecuenta = () => (
    <div className="px-5 py-4 max-h-[55vh] overflow-y-auto">
      {/* Info restaurante */}
      <div className="text-center mb-4 pb-3 border-b border-dashed border-gray-200">
        <div className="flex items-center justify-center gap-2 mb-1">
          <UtensilsCrossed className="w-5 h-5 text-gray-700" />
          <h3 className="text-base font-extrabold text-gray-900 tracking-wide">
            RESTAURANTE
          </h3>
        </div>
        <p className="text-xs text-gray-400 italic">
          Jr. Lima 123 · Tel. 01-234-5678
        </p>
        <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
          Pre-Cuenta
        </span>
      </div>

      {/* Datos de la mesa */}
      <div className="space-y-2 mb-4 pb-3 border-b border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Mesa</span>
          <span className="font-semibold text-gray-800">{solicitud.mesaNombre} · Ventana</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Mesero</span>
          <span className="font-semibold text-gray-800">{solicitud.meseroNombre}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Hora</span>
          <span className="font-semibold text-gray-800">{solicitud.hora}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Personas</span>
          <span className="font-semibold text-gray-800">{solicitud.personas}</span>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-3 mb-4 pb-3 border-b border-gray-100">
        {solicitud.items.map((item) => {
          const totalItem = item.cantidad * item.precioUnitario;
          return (
            <div key={item.id}>
              <div className="flex justify-between">
                <span className="text-sm font-bold text-gray-800">{item.nombre}</span>
                <span className="text-sm font-bold text-gray-800">S/ {totalItem.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {item.cantidad} × S/ {item.precioUnitario.toFixed(2)}
              </p>
              {item.nota && (
                <p className="text-xs text-green-600 mt-0.5">🌿 {item.nota}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Totales */}
      <div className="space-y-1.5 mb-4">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span>S/ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>IGV (18%)</span>
          <span>S/ {igv.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-extrabold text-gray-900 pt-2 border-t border-gray-200">
          <span>TOTAL</span>
          <span>S/ {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Nota legal */}
      <p className="text-[10px] text-gray-400 text-center italic leading-tight">
        Este documento no es un comprobante de pago.{"\n"}
        Para pagar solicite su boleta o factura.
      </p>
    </div>
  );

  // Render para Factura / Boleta (Nuevo Diseño de Ticket)
  const renderComprobante = () => (
    <div className="px-5 py-4 max-h-[55vh] overflow-y-auto bg-gray-50/50">
      <div className="bg-white rounded-xl border-2 border-dashed border-[#d1d5db] p-5 shadow-sm relative overflow-hidden">
        {/* Info restaurante y documento */}
        <div className="text-center mb-5 pb-4 border-b border-dashed border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <UtensilsCrossed className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-extrabold text-gray-900 tracking-wide uppercase">
              RESTAURANTE
            </h3>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            RUC: 20123456789 · Jr. Lima 123
          </p>
          <div className="inline-block px-3 py-1 bg-[#fdfcff] border border-[#f3e8ff] rounded-md mb-2 shadow-sm">
            <span className="text-xs font-extrabold text-[#9333ea] uppercase tracking-wide">
              {tipoLabel}
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-500">
            {solicitud.datosSunat?.serie || (isFactura ? 'F001' : 'B001')} - {solicitud.datosSunat?.correlativo || '0000000'} · {solicitud.hora}
          </p>
        </div>

        {/* Datos de mesa/mesero */}
        <div className="space-y-2.5 mb-5 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Mesa</span>
            <span className="font-extrabold text-gray-900">{solicitud.mesaNombre} · Ventana</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Mesero</span>
            <span className="font-extrabold text-gray-900">{solicitud.meseroNombre}</span>
          </div>
        </div>

        {/* Datos del Cliente */}
        {(solicitud.datosCliente || isFactura) && (
          <div className="bg-[#fdfcff] rounded-lg p-3.5 mb-5 border border-[#f3e8ff]">
            <h4 className="text-[10px] font-bold text-[#9333ea] uppercase tracking-wider mb-2">
              Datos del cliente
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex flex-col">
                <span className="text-gray-400 font-medium leading-none">Razón Social</span>
                <span className="font-bold text-gray-900 mt-0.5">{solicitud.datosCliente?.nombreRazonSocial || 'Cliente Varios'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 font-medium leading-none">{isFactura ? 'RUC' : 'RUC/DNI'}</span>
                <span className="font-bold text-gray-900 mt-0.5">{solicitud.datosCliente?.documentoIdentidad || '00000000'}</span>
              </div>
              {solicitud.datosCliente?.direccion && (
                <div className="flex flex-col mt-1">
                  <span className="text-gray-400 font-medium leading-none">Dirección</span>
                  <span className="font-bold text-gray-900 mt-0.5">{solicitud.datosCliente.direccion}</span>
                </div>
              )}
              {solicitud.datosCliente?.email && (
                <div className="flex flex-col mt-1">
                  <span className="text-gray-400 font-medium leading-none">Email</span>
                  <span className="font-bold text-gray-900 mt-0.5">{solicitud.datosCliente.email}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Items */}
        <div className="space-y-4 mb-5 pb-5 border-b border-gray-100">
          {solicitud.items.map((item) => {
            const totalItem = item.cantidad * item.precioUnitario;
            return (
              <div key={item.id} className="text-sm">
                <div className="flex justify-between font-bold text-gray-900 mb-0.5">
                  <span className="pr-4">{item.nombre}</span>
                  <span className="shrink-0">S/ {totalItem.toFixed(2)}</span>
                </div>
                <div className="flex text-xs text-gray-400">
                  {item.cantidad} × S/ {item.precioUnitario.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Totales */}
        <div className="space-y-2 mb-5">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Valor de venta</span>
            <span>S/ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>IGV (18%)</span>
            <span>S/ {igv.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-black text-gray-900 pt-2 leading-none">
            <span className="uppercase">Importe Total</span>
            <span>S/ {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Hash / Código de verificación */}
        <div className="bg-gray-100/70 p-3 rounded-lg flex items-start gap-3 mt-6">
          <div className="bg-white p-1 rounded-md shadow-sm border border-gray-200 shrink-0">
            <Grid3X3 className="w-6 h-6 text-gray-600" />
          </div>
          <div className="text-[9px] text-gray-500 leading-tight">
            <p>Código de verificación SUNAT</p>
            <p>Consulte en: <strong>sunat.gob.pe</strong></p>
            <p className="truncate">Hash: {solicitud.datosSunat?.hashRespuesta || 'A3F9-B2C1-D847-E065'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl gap-0">
        <DialogDescription className="sr-only">
          Vista previa del documento de {solicitud.mesaNombre}
        </DialogDescription>

        {/* Cabecera, usa un estilo un poco distinto dependiendo de si es normal o un comprobante fuerte */}
        <div className={`px-5 py-4 flex items-center justify-between ${isPrecuenta ? 'bg-gradient-to-r from-[#0D00FF] to-[#3b35ff] text-white' : 'bg-white border-b border-gray-100'}`}>
          <DialogTitle className={`text-base font-bold ${isPrecuenta ? 'text-white' : 'text-gray-900'}`}>
            Vista Previa · {tipoLabel}
          </DialogTitle>
          {!isPrecuenta && (
             <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors">
               <span className="sr-only">Cerrar</span>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
             </button>
          )}
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-0 px-6 py-5 bg-blue-50/30 border-b border-gray-100 shadow-inner">
          {pasos.map((paso, i) => (
            <div key={paso.num} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5 w-16">
                <div
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-colors
                    ${paso.done
                      ? "bg-emerald-500 text-white"
                      : paso.num === 2 // current step mockup
                      ? "bg-[#0D00FF] text-white"
                      : "bg-white text-gray-400 border-2 border-gray-200"
                    }
                  `}
                >
                  {paso.done ? <CheckCircle className="w-5 h-5" /> : paso.num}
                </div>
                <span className={`text-[9px] text-center font-bold leading-tight uppercase whitespace-pre-line tracking-wider
                  ${paso.done ? "text-emerald-600" : paso.num === 2 ? "text-[#0D00FF]" : "text-gray-400"}`}>
                  {paso.label}
                </span>
              </div>
              {i < pasos.length - 1 && (
                <div className={`w-12 h-[2px] -mt-5 mx-0 rounded-full ${paso.done ? 'bg-indigo-100' : 'bg-gray-100'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Cuerpo Dinámico */}
        {isPrecuenta ? renderPrecuenta() : renderComprobante()}

        {/* Footer con botones */}
        <div className="flex gap-3 p-4 border-t border-gray-100 bg-white">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
          >
            Cerrar
          </button>
          <button 
            onClick={onImprimir}
            className="flex-[1.5] flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0D00FF] text-white text-sm font-bold hover:bg-[#0a00cc] transition-colors shadow-md shadow-blue-200/50 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            {isFactura ? 'IMPRIMIR FACTURA' : isBoleta ? 'IMPRIMIR BOLETA' : 'IMPRIMIR'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
