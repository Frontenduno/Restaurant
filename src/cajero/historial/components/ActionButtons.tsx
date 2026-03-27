import { Plus, Lock } from "lucide-react";

interface ActionButtonsProps {
  onAgregarFondos: () => void;
  onCerrarCaja: () => void;
}

export function ActionButtons({ onAgregarFondos, onCerrarCaja }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <button 
        onClick={onAgregarFondos}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold transition-colors shadow-sm text-sm"
      >
        <Plus className="w-4 h-4" />
        Agregar Fondos
      </button>
      <button 
        onClick={onCerrarCaja}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition-colors shadow-sm text-sm"
      >
        <Lock className="w-4 h-4" />
        Cerrar Caja
      </button>
    </div>
  );
}
