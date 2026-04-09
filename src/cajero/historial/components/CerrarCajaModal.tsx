import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, FileText, ReceiptText, AlertTriangle } from "lucide-react";
import type { MetricasHistorial } from "../types";

interface ResumenRow {
  label: string;
  value: string;
  highlight?: boolean;
}

interface CerrarCajaModalProps {
  open: boolean;
  onClose: () => void;
  metricas: MetricasHistorial;
  resumenComprobantes: {
    boletasCantidad: number;
    boletasTotal: number;
    facturasCantidad: number;
    facturasTotal: number;
  };
}

export function CerrarCajaModal({
  open,
  onClose,
  metricas,
  resumenComprobantes,
}: CerrarCajaModalProps) {
  const [confirmado, setConfirmado] = useState(false);

  const filas: ResumenRow[] = useMemo(() => [
    { label: "Apertura de caja", value: metricas.turno.horaApertura },
    { label: "Cierre de caja", value: metricas.turno.horaCierre },
    { label: "Monto inicial", value: `S/ ${metricas.montoInicial.toFixed(2)}` },
    { label: "Total cobrado", value: `+S/ ${metricas.totalCobrado.toFixed(2)}`, highlight: true },
    { label: "Pedidos atendidos", value: `${metricas.pedidosAtendidos}` },
  ], [metricas]);

  const handleCerrarCaja = () => {
    if (!confirmado) return;
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[380px] p-0 bg-white border-0 shadow-2xl rounded-2xl gap-0 font-sans">
        <DialogHeader className="px-5 pt-5 pb-3">
          <DialogTitle className="text-lg font-extrabold text-[#0f172a] text-center">
            Cerrar Caja · Resumen de Turno
          </DialogTitle>
          <p className="text-xs font-medium text-slate-500 text-center leading-relaxed mt-1">
            Revisa el resumen antes de cerrar el turno. Esta acción no se puede deshacer.
          </p>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-5">
          <div className="flex flex-col gap-3 pb-4">
            {/* Resumen del turno */}
            <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-100 px-3 py-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Resumen del turno
                </span>
              </div>
              <div className="p-3 bg-white flex flex-col gap-2">
                {filas.map((fila) => (
                  <div key={fila.label} className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-slate-500">{fila.label}</span>
                    <span className={fila.highlight ? "text-emerald-600 font-bold" : "text-slate-900"}>
                      {fila.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total en caja */}
            <div className="border border-blue-100 rounded-xl p-3 flex items-center justify-between shadow-sm">
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-slate-900">Total en caja</span>
                <span className="text-[10px] font-semibold text-slate-400">Monto inicial + Total cobrado</span>
              </div>
              <span className="text-2xl font-black text-[#0D00FF]">
                S/ {metricas.totalEnCaja.toFixed(2)}
              </span>
            </div>

            {/* Desglose comprobantes */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center text-center">
                <span className="text-2xl font-black text-slate-900">{resumenComprobantes.boletasCantidad}</span>
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 mt-1">
                  <ReceiptText className="w-3 h-3 text-emerald-500" />
                  Boletas emitidas
                </div>
                <span className="text-xs font-bold text-[#0D00FF] mt-1">S/ {resumenComprobantes.boletasTotal.toFixed(2)}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center text-center">
                <span className="text-2xl font-black text-slate-900">{resumenComprobantes.facturasCantidad}</span>
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 mt-1">
                  <FileText className="w-3 h-3 text-[#9333ea]" />
                  Facturas emitidas
                </div>
                <span className="text-xs font-bold text-[#0D00FF] mt-1">S/ {resumenComprobantes.facturasTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Alerta */}
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 flex gap-2.5 items-start">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[11px] font-bold text-rose-600 leading-relaxed">
                Al confirmar el cierre, no podrás recibir más solicitudes en este turno. Para continuar operando deberás abrir una nueva caja.
              </p>
            </div>

            {/* Checkbox */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex gap-2.5 items-center">
              <Checkbox
                id="confirmar-cierre"
                checked={confirmado}
                onCheckedChange={(v) => setConfirmado(v as boolean)}
                className="w-4.5 h-4.5 border-slate-300 data-[state=checked]:bg-[#0D00FF] data-[state=checked]:border-[#0D00FF]"
              />
              <label htmlFor="confirmar-cierre" className="text-xs font-semibold text-slate-500 cursor-pointer select-none">
                Confirmo que revisé el resumen y deseo cerrar la caja
              </label>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="flex items-center gap-3 p-4 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            disabled={!confirmado}
            onClick={handleCerrarCaja}
            className={`flex-[1.5] py-2.5 px-3 flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all ${
              confirmado
                ? "bg-rose-500 text-white shadow-md shadow-rose-200 hover:bg-rose-600 cursor-pointer"
                : "bg-rose-100 text-rose-300 cursor-not-allowed"
            }`}
          >
            <Lock className="w-4 h-4" />
            CERRAR CAJA
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
