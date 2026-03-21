import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { EliminarUsuarioModalProps } from "../types";

export function EliminarUsuarioModal({
  open,
  onOpenChange,
  user,
  onConfirm,
}: EliminarUsuarioModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-105 p-0 overflow-hidden bg-[#f4f5f9] border-0 rounded-3xl gap-0">
        <AlertDialogHeader className="p-6 pb-2">
          <AlertDialogTitle className="text-2xl font-bold text-[#0b0c2a] text-center">
            Confirmar eliminación
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm font-medium text-[#1a1b3c] mt-4 leading-relaxed">
            Se eliminará a{" "}
            <span className="font-bold">
              {user ? `${user.nombre} ${user.apellido}` : "este usuario"}
            </span>{" "}
            del sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="px-6 pb-6 pt-4 flex flex-col sm:flex-row sm:justify-end gap-3 sm:space-x-0">
          <AlertDialogCancel
            className="bg-[#0b0c2a] mt-0 text-white border-0 hover:bg-[#1a1b3c] hover:text-white text-base px-8 h-12 rounded-full"
          >
            Cancelar
          </AlertDialogCancel>
          <Button
            className="bg-red-600 text-white border-0 hover:bg-red-700 text-base px-8 h-12 rounded-full min-w-31 transition-colors"
            onClick={() => user && onConfirm(user.id)}
            type="button"
          >
            Eliminar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

