import { X as XIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { Insumo } from "../../types";

interface DeleteInsumoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  insumo: Insumo | null;
  onConfirm: (id: number) => void;
}

export function DeleteInsumoModal({
  open,
  onOpenChange,
  insumo,
  onConfirm,
}: DeleteInsumoModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-none w-fit min-w-120 p-10 overflow-hidden bg-[#ebedf2] border-0 rounded-[40px] shadow-2xl flex flex-col items-center gap-8">
        <div className="w-full flex flex-col items-center relative">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute -top-4 -right-4 text-[#050640] bg-white hover:bg-slate-200 p-2 rounded-xl shadow-sm transition-all"
          >
            <XIcon className="w-5 h-5" />
          </button>

          <AlertDialogTitle className="text-[26px] font-bold text-[#050640] tracking-tight text-center mt-4">
            Confirmar eliminación
          </AlertDialogTitle>
        </div>

        <div className="max-w-95">
          <AlertDialogDescription className="text-center text-[18px] font-medium text-[#4b4c6d] leading-normal">
            Se eliminará el inventario{" "}
            <span className="font-bold text-[#050640]">
              [{insumo?.nombre || "Insumo"}]
            </span>{" "}
            del sistema. Si tiene comandas activas, asegúrate de cerrarlas
            primero.
          </AlertDialogDescription>
        </div>

        <div className="flex justify-center items-center gap-4 w-full">
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="bg-white hover:bg-slate-100 text-[#050640] text-base font-bold px-8 h-12.5 rounded-[18px] shadow-sm border-0 min-w-30"
          >
            Volver
          </Button>

          <Button
            type="button"
            onClick={() => insumo && onConfirm(insumo.id)}
            className="bg-[#050640] hover:bg-[#1a1b5c] text-white text-base font-bold px-8 h-12.5 rounded-[18px] shadow-lg flex-1 max-w-55"
          >
            Confirmar Eliminación
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteInsumoModal;
