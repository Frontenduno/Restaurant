import { X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoriasSidebar } from "./CategoriasSidebar";
import { CategoriasGrid } from "./CategoriasGrid";
import { CategoriaSaveModal } from "./CategoriaSaveModal";
import { useCategoriasPanel } from "@/admin/menu/hooks/useCategoriasPanel";

export function CategoriasPanel({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { state, data, actions } = useCategoriasPanel();

    return (
        <div
            className={cn(
                "absolute inset-0 z-50 bg-[#F4F4F5] transition-transform duration-500 ease-in-out font-sans flex flex-col",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}
        >
            <CategoriaSaveModal
                isOpen={state.isModalOpen}
                onClose={actions.closeModal}
                mode={state.modalMode}
                entityType={state.modalEntityType}
                initialData={state.modalInitialData}
                onSave={actions.handleSaveModal}
                onDelete={actions.handleDeleteModal}
            />

            {/* Header */}
            <header className="flex items-center justify-between px-10 py-6 shrink-0">
                <div>
                    <h1 className="text-[32px] font-bold text-gray-900 tracking-tight leading-tight">
                        Gestión de Categorías
                    </h1>
                    <p className="text-gray-500 text-[15px] mt-1">
                        Organiza y estructura las categorías del menú para una mejor experiencia.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    {/* Search */}
                    <div className="relative w-[320px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar categorías..."
                            value={state.searchTerm}
                            onChange={(e) => actions.setSearchTerm(e.target.value)}
                            className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-white text-[15px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm"
                        />
                    </div>
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
                        title="Cerrar Panel"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex px-10 pb-10 gap-8 min-h-0">
                <CategoriasSidebar
                    tipos={data.filteredTipos}
                    activeTipoId={state.activeTipoId}
                    onSelectTipo={(id) => {
                        actions.setActiveTipoId(id);
                        actions.setActiveCategoriaId(null);
                    }}
                    onOpenModal={actions.openModal}
                />

                <CategoriasGrid
                    items={data.isSubcategoryView ? data.activeSubcategorias : data.activeCategorias}
                    isSubcategoryView={data.isSubcategoryView}
                    activeTipoName={data.activeTipoName}
                    activeCategoriaName={data.activeCategoriaName}
                    activeTipoId={state.activeTipoId}
                    activeCategoriaId={state.activeCategoriaId}
                    onGoBack={() => actions.setActiveCategoriaId(null)}
                    onClickItem={actions.setActiveCategoriaId}
                    onOpenModal={actions.openModal}
                />
            </div>
        </div>
    );
}
