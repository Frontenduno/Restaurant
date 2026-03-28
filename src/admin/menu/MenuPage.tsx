import { useRef, useCallback, useState } from "react";
import { Header } from "@/components/Header";
import { FiltrosMenu } from "./components/menu/FiltrosMenu";
import { CardMenu } from "./components/menu/CardMenu";
import { FormMenu } from "./components/menu/FormMenu";
import { useMenu } from "./hooks/useMenu";
import { UtensilsCrossedIcon, Plus } from "lucide-react";
import { CategoriasPanel } from "./components/categorias/CategoriasPanel";
import type { Menu } from "./types";

export function MenuPage() {
    const {
        tipos,
        categorias,
        subcategorias,
        rawTipos,
        rawCategorias,
        rawSubcategorias,
        displayedItems,
        hasMore,
        activeTab,
        filtros,
        changeTab,
        setFiltro,
        setSearchTerm,
        loadMore,
        addItem,
        updateItem,
        deleteItem,
    } = useMenu();

    const scrollRef = useRef<HTMLDivElement>(null);
    const [formOpen, setFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Menu | null>(null);
    const [isCategoriasOpen, setIsCategoriasOpen] = useState(false);

    const handleScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el || !hasMore) return;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) loadMore();
    }, [hasMore, loadMore]);

    const handleAgregar = () => {
        setEditingItem(null);
        setFormOpen(true);
    };

    const handleEditar = (item: Menu) => {
        setEditingItem(item);
        setFormOpen(true);
    };

    const handleSave = (savedItem: Menu) => {
        if (editingItem) updateItem(savedItem);
        else addItem(savedItem);
    };

    const handleDelete = (id: number) => {
        deleteItem(id);
        setFormOpen(false);
    };

    return (
        <div className="w-full flex flex-col font-sans h-[calc(100vh-3rem)] relative overflow-hidden">
            <Header title="Gestión Menú" icon={UtensilsCrossedIcon} usuarioId="admin123" />

            <FiltrosMenu
                tipos={tipos}
                categorias={categorias}
                subcategorias={subcategorias}
                activeTab={activeTab}
                filtros={filtros}
                onChangeTab={changeTab}
                onSetFiltro={setFiltro}
                onSearch={setSearchTerm}
                onVerCategorias={() => setIsCategoriasOpen(true)}
            />

            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto mt-6 pr-1"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#CBD5E1 transparent" }}
            >
                {displayedItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-6">
                        {displayedItems.map((item) => (
                            <CardMenu key={item.id} item={item} onEdit={handleEditar} />
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
                        No se encontraron platillos con los filtros seleccionados.
                    </div>
                )}

                {hasMore && (
                    <div className="flex justify-center py-4">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </div>

            {/* Floating Action Button for Agregar */}
            <button
                onClick={handleAgregar}
                className="absolute bottom-8 right-8 w-14 h-14 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40 transform hover:scale-105 cursor-pointer"
            >
                <Plus className="w-6 h-6" />
            </button>

            <CategoriasPanel
                isOpen={isCategoriasOpen}
                onClose={() => setIsCategoriasOpen(false)}
            />

            <FormMenu
                open={formOpen}
                onClose={() => setFormOpen(false)}
                item={editingItem}
                tipos={rawTipos}
                categorias={rawCategorias}
                subcategorias={rawSubcategorias}
                onSave={handleSave}
                onDelete={handleDelete}
            />
        </div>
    );
}
