import { useState, useMemo } from "react";
import { toast } from "sonner";
import type { SaveModalData, EntityType } from "@/admin/menu/types";
import menuData from "../data/menu-data.json";

const { tipos, categorias, subcategorias, menuItems } = menuData;

export function useCategoriasPanel() {
    const [tiposLocal, setTiposLocal] = useState(tipos);
    const [categoriasLocal, setCategoriasLocal] = useState(categorias);
    const [subcategoriasLocal, setSubcategoriasLocal] = useState(subcategorias);

    const [searchTerm, setSearchTerm] = useState("");
    const [activeTipoId, setActiveTipoId] = useState(tiposLocal[0]?.id || 1);
    const [activeCategoriaId, setActiveCategoriaId] = useState<number | null>(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [modalEntityType, setModalEntityType] = useState<EntityType>("tipo");
    const [modalInitialData, setModalInitialData] = useState<SaveModalData | null>(null);

    const openModal = (mode: "add" | "edit", type: EntityType, data?: SaveModalData) => {
        setModalMode(mode);
        setModalEntityType(type);
        setModalInitialData(data || null);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleSaveModal = (data: SaveModalData) => {
        const isAdd = modalMode === "add";
        const payload = isAdd ? { ...data, id: Date.now(), idTipo: activeTipoId, idCategoria: activeCategoriaId } : data;
        
        const update = (setFn: any) => setFn((prev: any[]) => 
            isAdd ? [...prev, payload] : prev.map(p => p.id === data.id ? { ...p, ...payload } : p)
        );

        if (modalEntityType === "tipo") update(setTiposLocal);
        else if (modalEntityType === "categoria") update(setCategoriasLocal);
        else update(setSubcategoriasLocal);

        toast.success(`${modalEntityType} ${isAdd ? 'agregado' : 'actualizado'} correctamente`);
        closeModal();
    };

    const handleDeleteModal = (id: number) => {
        const remove = (setFn: any) => setFn((prev: any[]) => prev.filter(p => p.id !== id));
        if (modalEntityType === "tipo") { remove(setTiposLocal); if (activeTipoId === id) setActiveTipoId(1); }
        else if (modalEntityType === "categoria") { remove(setCategoriasLocal); if (activeCategoriaId === id) setActiveCategoriaId(null); }
        else remove(setSubcategoriasLocal);
        
        toast.success(`${modalEntityType} eliminado correctamente`);
        closeModal();
    };

    // Filter Tipos (Main Categories)
    const filteredTipos = useMemo(() => {
        return tiposLocal.map((t) => {
            const relatedCategorias = categoriasLocal.filter(c => c.idTipo === t.id);
            const relatedItems = menuItems.filter(m => m.tipo.id === t.id);
            return {
                ...t,
                subcategoriesCount: relatedCategorias.length,
                itemsCount: relatedItems.length,
            };
        });
    }, [tiposLocal, categoriasLocal]);

    const activeTipoName = tiposLocal.find((t) => t.id === activeTipoId)?.detalle || "";

    // Drill-down Logic Data
    const buildList = (list: any[], filterKey: string, filterVal: any, entityKey: string) => 
        list.filter(item => item[filterKey] === filterVal)
            .map(item => {
                const related = menuItems.filter((m: any) => m[entityKey].id === item.id);
                return {
                    ...item,
                    itemsCount: related.length,
                    image: item.imagen_url || related.find(m => m.imagen_url)?.imagen_url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
                    isActive: true,
                };
            })
            .filter(item => item.detalle.toLowerCase().includes(searchTerm.toLowerCase()));

    const activeCategorias = useMemo(() => 
        activeCategoriaId ? [] : buildList(categoriasLocal, "idTipo", activeTipoId, "categoria"), 
    [categoriasLocal, activeTipoId, activeCategoriaId, searchTerm]);

    const activeSubcategorias = useMemo(() => 
        !activeCategoriaId ? [] : buildList(subcategoriasLocal, "idCategoria", activeCategoriaId, "subcategoria"), 
    [subcategoriasLocal, activeCategoriaId, searchTerm]);

    const isSubcategoryView = activeCategoriaId !== null;
    const activeCategoriaName = categoriasLocal.find((c) => c.id === activeCategoriaId)?.detalle || "";

    return {
        state: {
            searchTerm,
            activeTipoId,
            activeCategoriaId,
            isModalOpen,
            modalMode,
            modalEntityType,
            modalInitialData,
            
        },
        data: {
            filteredTipos,
            activeTipoName,
            activeCategorias,
            activeSubcategorias,
            isSubcategoryView,
            activeCategoriaName,
        },
        actions: {
            setSearchTerm,
            setActiveTipoId,
            setActiveCategoriaId,
            openModal,
            closeModal,
            handleSaveModal,
            handleDeleteModal,
        }
    };
}
