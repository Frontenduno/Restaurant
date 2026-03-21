import { Plus, Edit2, ChevronLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import type { EntityType } from "@/admin/menu/types";

interface GridItem {
    id: number;
    detalle: string;
    itemsCount: number;
    image: string;
    isActive: boolean;
    [key: string]: any; // Allow idTipo/idCategoria dynamically from hook
}

interface CategoriasGridProps {
    items: GridItem[];
    isSubcategoryView: boolean;
    activeTipoName: string;
    activeCategoriaName: string;
    activeTipoId: number;
    activeCategoriaId: number | null;
    onGoBack: () => void;
    onClickItem: (id: number) => void;
    onOpenModal: (mode: "add" | "edit", type: EntityType, data?: any) => void;
}

export function CategoriasGrid({
    items,
    isSubcategoryView,
    activeTipoName,
    activeCategoriaName,
    activeTipoId,
    activeCategoriaId,
    onGoBack,
    onClickItem,
    onOpenModal
}: CategoriasGridProps) {
    return (
        <div className="flex-1 bg-white rounded-[24px] shadow-[0_4px_24px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col overflow-hidden relative">
            {/* Top Inside Section */}
            <div className="px-8 pt-8 pb-6 border-b border-gray-50 flex items-start justify-between bg-white relative z-10 shrink-0">
                <div>
                    {isSubcategoryView && (
                        <button
                            onClick={onGoBack}
                            className="flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-gray-600 mb-4 transition-colors cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Volver a Categorías
                        </button>
                    )}
                    <div className="flex items-center gap-3 mb-1.5">
                        <h2 className="text-[28px] font-bold text-gray-900 tracking-tight leading-none bg-yellow-50/0">
                            {isSubcategoryView ? activeCategoriaName : activeTipoName}
                        </h2>
                        <span className="bg-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center h-5">
                            {isSubcategoryView ? "Subcategorías" : "Categorías"}
                        </span>
                    </div>
                    <p className="text-gray-500 text-[14px]">
                        Gestionando {isSubcategoryView ? "subcategorías" : "categorías"} para {isSubcategoryView ? activeCategoriaName : activeTipoName}
                    </p>
                </div>
                <button
                    onClick={() => {
                        if (isSubcategoryView) onOpenModal("add", "subcategoria", { detalle: "", parentId: activeCategoriaId });
                        else onOpenModal("add", "categoria", { detalle: "", parentId: activeTipoId });
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] hover:bg-black text-white rounded-lg text-sm font-semibold transition-colors shadow-sm cursor-pointer shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    {isSubcategoryView ? "Nueva Subcategoría" : "Nueva Categoría"}
                </button>
            </div>

            {/* Grid of Cards */}
            <div className="flex-1 overflow-y-auto p-8 relative" style={{ scrollbarWidth: "thin", scrollbarColor: "#E2E8F0 transparent" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => {
                                if (!isSubcategoryView) onClickItem(item.id);
                            }}
                            className="group relative h-[220px] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all border border-gray-100"
                        >
                            <img
                                src={item.image}
                                alt={item.detalle}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end">
                                <h3 className="text-white text-[22px] font-bold leading-tight mb-0.5 shadow-sm">
                                    {item.detalle}
                                </h3>
                                <p className="text-gray-300 text-[11px] font-bold tracking-widest uppercase mb-4">
                                    {item.itemsCount} Platillos
                                </p>
                            </div>

                            <div className="absolute bottom-5 right-5 flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onOpenModal("edit", isSubcategoryView ? "subcategoria" : "categoria", {
                                            id: item.id,
                                            detalle: item.detalle,
                                            imagen_url: item.imagen_url || item.image,
                                            parentId: 'idCategoria' in item ? item.idCategoria : 'idTipo' in item ? item.idTipo : undefined
                                        });
                                    }}
                                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/10 shadow-sm cursor-pointer"
                                    title="Editar"
                                >
                                    <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <div className="bg-white/20 backdrop-blur-md px-1 py-1 rounded-full border border-white/10 flex items-center h-8">
                                    <Switch
                                        checked={item.isActive}
                                        className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-400 scale-[0.8] ml-0.5"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Card Slot */}
                    <button
                        onClick={() => {
                            if (isSubcategoryView) onOpenModal("add", "subcategoria", { detalle: "", parentId: activeCategoriaId });
                            else onOpenModal("add", "categoria", { detalle: "", parentId: activeTipoId });
                        }}
                        className="h-[220px] rounded-2xl border-2 border-dashed border-gray-200 hover:border-gray-300 bg-gray-50/50 hover:bg-gray-50 flex flex-col items-center justify-center gap-4 transition-colors group cursor-pointer"
                    >
                        <div className="w-14 h-14 rounded-full bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors text-slate-400 group-hover:text-slate-500">
                            <Plus className="w-6 h-6" />
                        </div>
                        <span className="text-[13px] font-bold text-slate-400 tracking-widest uppercase group-hover:text-slate-500 transition-colors">
                            {isSubcategoryView ? "Nueva Subcategoría" : "Nueva Categoría"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
