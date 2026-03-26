import { useRef, useCallback, useState } from "react";
import { AdminHeader } from "../components/AdminHeader";
import { FiltrosMenu } from "./components/FiltrosMenu";
import { CardMenu } from "./components/CardMenu";
import { FormMenu } from "./components/FormMenu";
import { useMenu } from "./hooks/useMenu";
import { UtensilsCrossedIcon } from "lucide-react";
import type { Menu } from "./types";

export function MenuPage() {
    const {
        tipos,
        categorias,
        subcategorias,
        displayedItems,
        hasMore,
        activeTab,
        filtros,
        changeTab,
        setFiltro,
        setSearchTerm,
        loadMore,
    } = useMenu();

    const scrollRef = useRef<HTMLDivElement>(null);
    const [formOpen, setFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Menu | null>(null);

    const handleScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el || !hasMore) return;

        const { scrollTop, scrollHeight, clientHeight } = el;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            loadMore();
        }
    }, [hasMore, loadMore]);

    const handleAgregar = () => {
        setEditingItem(null);
        setFormOpen(true);
    };

    const handleEditar = (item: Menu) => {
        setEditingItem(item);
        setFormOpen(true);
    };

    return (
        <div className="w-full flex flex-col font-sans h-[calc(100vh-3rem)]">
            <AdminHeader title="Gestión Menú" icon={UtensilsCrossedIcon} />

            <FiltrosMenu
                tipos={tipos}
                categorias={categorias}
                subcategorias={subcategorias}
                activeTab={activeTab}
                filtros={filtros}
                onChangeTab={changeTab}
                onSetFiltro={setFiltro}
                onSearch={setSearchTerm}
                onAgregar={handleAgregar}
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

            <FormMenu
                open={formOpen}
                onClose={() => setFormOpen(false)}
                item={editingItem}
                categorias={categorias}
                subcategorias={subcategorias}
            />
        </div>
    );
}
