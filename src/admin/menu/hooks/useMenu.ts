import { useState, useMemo, useCallback } from "react";
import type { Menu, FiltroMenu, Tipo, Categoria, SubCategoria } from "../types";
import menuData from "../data/menu-data.json";

const ITEMS_PER_PAGE = 6;

const allItems = menuData.menuItems as Menu[];
const allTipos = menuData.tipos as Tipo[];
const allCategorias = menuData.categorias as Categoria[];
const allSubcategorias = menuData.subcategorias as SubCategoria[];

export function useMenu() {
  const [activeTab, setActiveTab] = useState<number>(allTipos[0]?.id ?? 1);
  const [filtros, setFiltros] = useState<FiltroMenu>({});
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  // Filtered items based on active tab + filters
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Always filter by tipo (tab)
      if (item.tipo.id !== activeTab) return false;

      // Filter by search term
      if (filtros.searchTerm) {
        const term = filtros.searchTerm.toLowerCase();
        if (!item.nombre.toLowerCase().includes(term)) return false;
      }

      // Filter by categoria
      if (filtros.categoria) {
        if (item.categoria.id !== filtros.categoria) return false;
      }

      // Filter by subcategoria
      if (filtros.subcategoria) {
        if (item.subcategoria.id !== filtros.subcategoria) return false;
      }

      // Filter by estado
      if (filtros.estado !== undefined && filtros.estado !== null) {
        const isActive = filtros.estado === 1;
        if (item.estado !== isActive) return false;
      }

      return true;
    });
  }, [activeTab, filtros]);

  // Items to display (infinite scroll slice)
  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, displayCount);
  }, [filteredItems, displayCount]);

  const hasMore = displayCount < filteredItems.length;

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
      setFiltros((prev) => ({ ...prev, [key]: value }));
      setDisplayCount(ITEMS_PER_PAGE);
    },
    []
  );

  const setSearchTerm = useCallback((term: string) => {
    setFiltros((prev) => ({ ...prev, searchTerm: term || null }));
    setDisplayCount(ITEMS_PER_PAGE);
  }, []);

  return {
    // Data
    tipos: allTipos,
    categorias: allCategorias,
    subcategorias: allSubcategorias,
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
  };
}
