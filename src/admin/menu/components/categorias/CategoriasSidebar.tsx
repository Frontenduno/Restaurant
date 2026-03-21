import { GripVertical, Plus, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EntityType } from "@/admin/menu/types";

interface TipoData {
    id: number;
    detalle: string;
    itemsCount: number;
    subcategoriesCount: number;
}

interface CategoriasSidebarProps {
    tipos: TipoData[];
    activeTipoId: number;
    onSelectTipo: (id: number) => void;
    onOpenModal: (mode: "add" | "edit", type: EntityType, data?: any) => void;
}

export function CategoriasSidebar({
    tipos,
    activeTipoId,
    onSelectTipo,
    onOpenModal,
}: CategoriasSidebarProps) {
    return (
        <div className="w-[340px] flex flex-col pt-2 shrink-0">
            <div className="flex items-center justify-between px-1 mb-4">
                <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                    Tipos de Menú
                </span>
                <button
                    onClick={() => onOpenModal("add", "tipo")}
                    className="flex items-center gap-1.5 text-[13px] font-bold text-gray-800 hover:text-black transition-colors cursor-pointer"
                >
                    <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                        <Plus className="w-3 h-3 text-white" />
                    </div>
                    NUEVO TIPO
                </button>
            </div>

            <div className="flex flex-col gap-3 overflow-y-auto pr-2 pb-10" style={{ scrollbarWidth: "none" }}>
                {tipos.map((tipo) => {
                    const isSelected = activeTipoId === tipo.id;
                    return (
                        <button
                            key={tipo.id}
                            onClick={() => onSelectTipo(tipo.id)}
                            className={cn(
                                "w-full flex items-center gap-4 py-4 px-5 rounded-xl border transition-all text-left relative overflow-hidden group cursor-pointer",
                                isSelected
                                    ? "bg-white border-transparent shadow-[0_4px_16px_rgb(0,0,0,0.04)]"
                                    : "bg-white/50 border-white hover:bg-white"
                            )}
                        >
                            {isSelected && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400" />
                            )}
                            <div className="flex-1 flex items-center gap-4">
                                <div className={cn(
                                    "w-6 flex justify-center text-gray-300",
                                    isSelected ? "text-gray-400" : ""
                                )}>
                                    <GripVertical className="w-5 h-5 opacity-40" />
                                </div>
                                <div>
                                    <h3 className={cn(
                                        "text-[17px] font-bold leading-none mb-1.5 transition-colors",
                                        isSelected ? "text-gray-900" : "text-gray-600"
                                    )}>
                                        {tipo.detalle}
                                    </h3>
                                    <p className="text-[11.5px] font-bold text-gray-400 tracking-wide">
                                        {tipo.itemsCount} PLATILLOS • {tipo.subcategoriesCount} {tipo.subcategoriesCount === 1 ? 'CATEGORÍA' : 'CATEGORÍAS'}
                                    </p>
                                </div>
                            </div>

                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div
                                    role="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onOpenModal("edit", "tipo", { id: tipo.id, detalle: tipo.detalle });
                                    }}
                                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
                                >
                                    <Edit2 className="w-3.5 h-3.5" />
                                </div>
                            </div>
                            {!isSelected && (
                                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#F4F4F5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
