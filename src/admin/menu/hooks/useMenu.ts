import { useState, useMemo, useCallback } from "react";
import type { Menu, FiltroMenu, Tipo, Categoria, SubCategoria } from "../types";
import menuData from "../data/menu-data.json";

const ITEMS_PER_PAGE = 6;

const allItems = menuData.menuItems as Menu[];
const allTipos = menuData.tipos as Tipo[];
const allCategorias = menuData.categorias as Categoria[];
const allSubcategorias = menuData.subcategorias as SubCategoria[];

export function useMenu() {
  const [localItems, setLocalItems] = useState<Menu[]>(allItems);
  const [activeTab, setActiveTab] = useState<number>(allTipos[0]?.id ?? 1);
  const [filtros, setFiltros] = useState<FiltroMenu>({});
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  // Filtered items based on active tab + filters
  const filteredItems = useMemo(() => {
    return localItems.filter((item) => {
      if (item.tipo.id !== activeTab) return false;
      if (filtros.searchTerm && !item.nombre.toLowerCase().includes(filtros.searchTerm.toLowerCase())) return false;
      if (filtros.categoria && item.categoria.id !== filtros.categoria) return false;
      if (filtros.subcategoria && item.subcategoria.id !== filtros.subcategoria) return false;
      if (filtros.estado != null && item.estado !== (filtros.estado === 1)) return false;
      return true;
    });
  }, [localItems, activeTab, filtros]);

  // Items to display (infinite scroll slice)
  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, displayCount);
  }, [filteredItems, displayCount]);

  const hasMore = displayCount < filteredItems.length;

  const addItem = useCallback((newItem: Menu) => {
    setLocalItems((prev) => [newItem, ...prev]);
  }, []);

  const updateItem = useCallback((updatedItem: Menu) => {
    setLocalItems((prev) => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  }, []);

  const deleteItem = useCallback((id: number) => {
    setLocalItems((prev) => prev.filter(item => item.id !== id));
  }, []);

  const loadMore = useCallback(() => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  }, []);

  const changeTab = useCallback((tipoId: number) => {
    setActiveTab(tipoId);
    setFiltros({});
    setDisplayCount(ITEMS_PER_PAGE);
  }, []);

  const setFiltro = useCallback(
    <K extends keyof FiltroMenu>(key: K, value: FiltroMenu[K]) => {
      setFiltros((prev) => {
        const newFiltros = { ...prev, [key]: value };
        if (key === 'categoria') {
          newFiltros.subcategoria = null; // Reset subcategory when category changes
        }
        return newFiltros;
      });
      setDisplayCount(ITEMS_PER_PAGE);
    },
    []
  );

  const setSearchTerm = useCallback((term: string) => {
    setFiltros((prev) => ({ ...prev, searchTerm: term || null }));
    setDisplayCount(ITEMS_PER_PAGE);
  }, []);

  const availableCategorias = useMemo(() => {
    return allCategorias.filter((c) => c.idTipo === activeTab);
  }, [activeTab]);

  const availableSubcategorias = useMemo(() => {
    if (!filtros.categoria) return [];
    return allSubcategorias.filter((s) => s.idCategoria === filtros.categoria);
  }, [filtros.categoria]);

  return {
    // Basic raw data
    rawTipos: allTipos,
    rawCategorias: allCategorias,
    rawSubcategorias: allSubcategorias,

    // Filtered lists for main UI
    tipos: allTipos,
    categorias: availableCategorias,
    subcategorias: availableSubcategorias,
    filteredItems,
    displayedItems,
    hasMore,

    // State
    activeTab,
    filtros,

    // Actions
    changeTab,
    setFiltro,
    setSearchTerm,
    loadMore,
    addItem,
    updateItem,
    deleteItem,
  };
}
