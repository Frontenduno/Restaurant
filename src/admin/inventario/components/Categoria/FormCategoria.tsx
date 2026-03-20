import { Plus, Pencil, Trash2, FolderSync } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import type { Categoria } from "../../types";
import CategoriaModal from "./CategoriaModal";

interface FormCategoriaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categorias: Categoria[];
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
  isCatActionModalOpen: boolean;
  setIsCatActionModalOpen: (open: boolean) => void;
  selectedCatForAction: Categoria | null;
  onSaveCategoria: (nombre: string, id?: number) => void;
}

function FormCategoria({
  open,
  onOpenChange,
  categorias,
  onEdit,
  onDelete,
  onAdd,
  isCatActionModalOpen,
  setIsCatActionModalOpen,
  selectedCatForAction,
  onSaveCategoria,
}: FormCategoriaProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[450px] bg-white border-l-0 p-0 flex flex-col gap-0"
      >
        <div className="p-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-[#050640] p-3 rounded-2xl">
              <FolderSync className="w-6 h-6 text-white" />
            </div>
            <SheetTitle className="text-2xl font-bold text-[#050640]">
              Categorías
            </SheetTitle>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          ></button>
        </div>

        <div className="px-8 pb-8">
          <button
            onClick={onAdd}
            className="w-full border-2 border-dashed border-[#050640] rounded-[30px] py-6 flex items-center justify-center gap-3 text-[#050640] hover:bg-slate-50 transition-all group"
          >
            <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold tracking-tight">
              Añadir Nueva Categoría
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 flex flex-col gap-4 pb-10">
          {categorias.map((cat) => (
            <div
              key={cat.id}
              className="flex justify-between items-center p-7 bg-slate-50/50 rounded-[35px] border border-transparent hover:border-slate-100 transition-all"
            >
              <span className="text-lg font-bold text-[#050640]">
                {cat.detalle}
              </span>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => onEdit(cat)}
                  className="text-slate-400 hover:text-blue-600 transition-colors"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(cat.id)}
                  className="text-slate-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <CategoriaModal
          open={isCatActionModalOpen}
          onOpenChange={setIsCatActionModalOpen}
          categoria={selectedCatForAction}
          onSave={onSaveCategoria}
        />
      </SheetContent>
    </Sheet>
  );
}

export default FormCategoria;
