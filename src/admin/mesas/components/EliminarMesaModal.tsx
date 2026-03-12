import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Mesa } from "./EditarMesaModal";

interface EliminarMesaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mesa: Mesa | null;
  onConfirm: (id: number) => void;
}

export function EliminarMesaModal({ open, onOpenChange, mesa, onConfirm }: EliminarMesaModalProps) {
  if (!mesa) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-[400px] p-0 overflow-hidden bg-[#f4f5f9] border-0 rounded-3xl">
        <div className="flex justify-between items-center p-6 pb-4">
          <DialogTitle className="text-2xl font-bold text-[#0b0c2a]">Confirmar eliminación</DialogTitle>
          <button onClick={() => onOpenChange(false)} className="text-[#0b0c2a] bg-[#e4e6f1] hover:bg-[#d3d6e5] p-1.5 rounded-xl transition-colors">
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
        
        <div className="px-6 pb-6 pt-2">
          <p className="text-center text-sm font-medium text-[#1a1b3c] mb-6 px-4 leading-relaxed">
            Se eliminará la Mesa {mesa.name.replace('Mesa ', '')} del sistema. Si tiene comandas activas, asegúrate de cerrarlas primero.
          </p>
          <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" className="bg-[#0b0c2a] text-white border-0 hover:bg-[#1a1b3c] hover:text-white text-base px-8 h-12 rounded-full" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-red-600 text-white hover:bg-red-700 text-base px-8 h-12 rounded-full" onClick={() => onConfirm(mesa.id)}>
            Eliminar
          </Button>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
