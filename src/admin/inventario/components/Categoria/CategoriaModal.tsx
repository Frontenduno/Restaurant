import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import type { Categoria } from "../../types";

interface CategoriaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoria: Categoria | null;
  onSave: (nombre: string, id?: number) => void;
}

export function CategoriaModal({
  open,
  onOpenChange,
  categoria,
  onSave,
}: CategoriaModalProps) {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (open) {
      setNombre(categoria ? categoria.detalle : "");
    }
  }, [open, categoria]);

  const handleSave = () => {
    if (nombre.trim()) {
      onSave(nombre, categoria?.id);
      setNombre("");
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-none w-fit min-w-115 p-10 bg-[#ebedf2] border-0 rounded-[40px] shadow-2xl flex flex-col gap-8">
        <div className="w-full flex justify-between items-center relative">
          <AlertDialogTitle className="text-[28px] font-bold text-[#050640] tracking-tight">
            {categoria ? "Editar categoría" : "Nueva categoría"}
          </AlertDialogTitle>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-[#050640] hover:bg-slate-200 p-1.5 rounded-xl transition-all"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-[20px] font-bold text-[#050640] px-1">
            Nombre
          </label>
          <Input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Verduras"
            className="h-16.25 bg-white border-2 border-[#050640] rounded-[22px] text-xl px-6 focus-visible:ring-0 focus-visible:ring-offset-0 text-[#050640] placeholder:text-slate-400 font-medium"
          />
        </div>

        <div className="flex justify-between items-center gap-5 mt-2">
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="bg-white hover:bg-slate-100 text-[#050640] text-2xl font-bold px-10 h-16.25 rounded-[25px] shadow-sm border-0 flex-1"
          >
            Cancelar
          </Button>

          <Button
            type="button"
            onClick={handleSave}
            disabled={!nombre.trim()}
            className="bg-[#050640] hover:bg-[#1a1b5c] text-white text-2xl font-bold px-10 h-16.25 rounded-[25px] shadow-lg flex-1 disabled:opacity-50"
          >
            Guardar
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CategoriaModal;
