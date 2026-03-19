import { useState } from "react";
import type { Categoria, Insumo, Estado, FiltroInventario } from "../types";
import inventarioData from "../data/inventario-data.json";

const ITEMS_PER_PAGE = 6;

const allItems = inventarioData.insumos as Insumo[];
const allCategorias = inventarioData.categorias as Categoria[];
const allEstados = inventarioData.estados as Estado[];

export function useInventario() {
    const [activeTab, setActiveTab] = useState<number>(allCategorias[0]?.id ?? 1);
    const [filtros, setFiltros] = useState<FiltroInventario>({});
    const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

    return{
        categorias: allCategorias,
        estados: allEstados,
    }

}




