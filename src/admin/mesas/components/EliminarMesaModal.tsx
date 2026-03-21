import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Mesa } from "@/types";

interface EliminarMesaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mesa: Mesa | null;
  onConfirm: (id: number) => void;
}

export function EliminarMesaModal({ open, onOpenChange, mesa, onConfirm }: EliminarMesaModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!mesa) return null;

  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDeleting(true);
    // Simular carga de 1.5s antes de confirmar la eliminación
    setTimeout(() => {
      setIsDeleting(false);
      onConfirm(mesa.id);
    }, 1500);
  };

  return (
    <AlertDialog open={open} onOpenChange={!isDeleting ? onOpenChange : undefined}>
      <AlertDialogContent className="sm:max-w-[400px] p-0 overflow-hidden bg-[#f4f5f9] border-0 rounded-3xl gap-0">
        <AlertDialogHeader className="p-6 pb-2">
          <AlertDialogTitle className="text-2xl font-bold text-[#0b0c2a] text-center">
            Confirmar eliminación
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm font-medium text-[#1a1b3c] mt-4 leading-relaxed">
            Se eliminará la {mesa.name} del sistema. Si tiene comandas activas, asegúrate de cerrarlas primero.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="px-6 pb-6 pt-4 flex flex-col sm:flex-row sm:justify-end gap-3 sm:space-x-0">
          <AlertDialogCancel 
            disabled={isDeleting} 
            className="bg-[#0b0c2a] mt-0 text-white border-0 hover:bg-[#1a1b3c] hover:text-white text-base px-8 h-12 rounded-full"
          >
            Cancelar
          </AlertDialogCancel>
          <Button 
            disabled={isDeleting}
            onClick={handleConfirm}
            className="bg-red-600 text-white border-0 hover:bg-red-700 text-base px-8 h-12 rounded-full min-w-[124px] transition-colors"
          >
            {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Eliminar"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
