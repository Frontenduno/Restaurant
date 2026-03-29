import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Briefcase, Plus } from "lucide-react";

interface AgregarFondosModalProps {
  open: boolean;
  onClose: () => void;
  montoActual: number;
}

export function AgregarFondosModal({ open, onClose, montoActual }: AgregarFondosModalProps) {
  const [nuevoMonto, setNuevoMonto] = useState<string>("");

  const montoAgregado = parseFloat(nuevoMonto) || 0;
  const nuevoSaldo = montoActual + montoAgregado;

  const handleAgregar = () => {
    if (montoAgregado > 0) {
      // Lógica real de agregar iría aquí
      onClose();
      setNuevoMonto("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onClose();
      if (!val) setNuevoMonto(""); // reset al cerrar
    }}>
      <DialogContent className="sm:max-w-md p-6 bg-white border-0 shadow-2xl rounded-2xl gap-6 font-sans">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-extrabold text-[#0f172a] text-center mb-2">
            Agregar Fondos a Caja
          </DialogTitle>
          <div className="text-sm font-medium text-slate-500 text-center leading-relaxed px-4">
            Registra el ingreso de efectivo adicional a la caja del turno actual.
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Saldo Actual Card */}
          <div className="border border-emerald-100 bg-emerald-50/50 rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700">Saldo actual en caja</span>
            </div>
            <span className="text-xl font-black text-emerald-600">
              S/ {montoActual.toFixed(2)}
            </span>
          </div>

          {/* Input Grande */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[200px]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-black text-slate-400">
                S/
              </span>
              <input
                type="number"
                value={nuevoMonto}
                onChange={(e) => setNuevoMonto(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.1"
                className="w-full bg-transparent text-center text-4xl font-black text-[#0f172a] placeholder:text-slate-300 focus:outline-none focus:ring-0 appearance-none h-16 py-2"
              />
            </div>
          </div>

          {/* Resumen Calculado */}
          <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500">Saldo actual</span>
                <span className="text-slate-900">S/ {montoActual.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500">Monto a agregar</span>
                <span className="text-emerald-500">
                  {montoAgregado > 0 ? `S/ +${montoAgregado.toFixed(2)}` : 'S/ --'}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-3 border-t border-slate-200">
                <span className="text-sm font-extrabold text-[#0f172a]">Nuevo saldo</span>
                <span className="text-lg font-black text-emerald-600">
                  S/ {nuevoSaldo.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 px-4 flex items-center justify-center rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
          <button 
            disabled={montoAgregado <= 0}
            onClick={handleAgregar}
            className={`flex-[1.5] py-3 px-4 flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all
              ${montoAgregado > 0 
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200 hover:bg-emerald-600 cursor-pointer' 
                : 'bg-emerald-100 text-emerald-300 cursor-not-allowed'
              }
            `}
          >
            <Plus className="w-4 h-4" />
            AGREGAR
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
