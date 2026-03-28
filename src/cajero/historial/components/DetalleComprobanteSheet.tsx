import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ReceiptText, FileText, Printer } from "lucide-react";
import type { ComprobanteHistorial } from "../types";
import { toast } from "sonner";

interface DetalleComprobanteSheetProps {
  comprobante: ComprobanteHistorial | null;
  open: boolean;
  onClose: () => void;
}

export function DetalleComprobanteSheet({
  comprobante,
  open,
  onClose,
}: DetalleComprobanteSheetProps) {
  if (!comprobante) return null;

  const handleReimprimir = () => {
    toast.success("Comprobante enviado a la impresora");
    onClose();
  };

  const isFactura = comprobante.tipoDocumento === "Factura";
  
  // Cálculo inverso basado en que nuestro sistema en Perú asume "Precio incluye IGV".
  // El precio en el comprobante es el Total Final.
  const IGV_RATE = 0.18;
  const subtotal = comprobante.total / (1 + IGV_RATE);
  const igv = comprobante.total - subtotal;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-white border-l border-slate-200 p-0 flex flex-col font-sans h-full overflow-hidden">
        <SheetHeader className="px-6 py-4 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <SheetTitle className="text-lg font-extrabold text-[#0f172a]">
            Comprobante · {comprobante.mesa}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto w-full">
          <div className="p-6 flex flex-col gap-6">
            
            {/* Detalles de Mesa */}
            <div className="bg-slate-50/50 border border-blue-50/80 rounded-2xl p-4 shadow-[inset_0_2px_10px_rgba(240,244,255,1)]">
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-500">Mesa</span>
                  <span className="text-[#0D00FF] font-black">{comprobante.mesa}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-500">Cliente</span>
                  <span className="text-[#0D00FF] font-bold">{comprobante.cliente}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-500">Mesero</span>
                  <span className="text-[#0D00FF] font-bold">{comprobante.mesero}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-500">Hora</span>
                  <span className="text-[#0D00FF] font-black">{comprobante.hora}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-semibold pt-2 mt-1 border-t border-blue-100/50">
                  <span className="text-slate-500">Tipo</span>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${isFactura ? 'bg-[#fdfcff] text-[#9333ea] border-[#f3e8ff]' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                    {isFactura ? <FileText className="w-3.5 h-3.5" /> : <ReceiptText className="w-3.5 h-3.5" />}
                    {comprobante.tipoDocumento}
                  </div>
                </div>
              </div>
            </div>

            {/* Detalle de Cobro */}
            <div>
              <h3 className="text-[17px] font-extrabold text-slate-800 mb-4 tracking-tight">Detalle de Cobro</h3>
              
              <div className="flex flex-col gap-3">
                {comprobante.items && comprobante.items.length > 0 ? (
                  comprobante.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#0D00FF] leading-tight">
                          {item.nombre}
                        </span>
                        {item.nota && (
                          <span className="text-[11px] font-bold text-amber-500 mt-0.5">
                            📝 {item.nota}
                          </span>
                        )}
                        <span className="text-[11px] font-semibold text-slate-400 mt-1">
                          {item.cantidad} unidades × S/ {item.precio.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-sm font-black text-[#0D00FF]">
                        S/ {(item.cantidad * item.precio).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-400 font-medium italic py-4 text-center">
                    Los items individuales de este comprobante no fueron registrados por el mock de prueba.
                  </div>
                )}
              </div>
            </div>

            {/* Cuadro de Totales */}
            <div className="bg-slate-50 border border-blue-100/60 rounded-xl p-4 flex flex-col gap-2.5 mt-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-600">S/ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold pb-2.5 border-b border-slate-200">
                <span className="text-slate-500">IGV (18%)</span>
                <span className="text-slate-600">S/ {igv.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-0.5">
                <span className="text-[15px] font-extrabold text-[#0D00FF]">Total cobrado</span>
                <span className="text-[17px] font-black text-[#0D00FF]">S/ {comprobante.total.toFixed(2)}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <button
            onClick={handleReimprimir}
            className="w-full py-3.5 px-4 flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
          >
            <Printer className="w-5 h-5 text-slate-500" />
            Reimprimir
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
