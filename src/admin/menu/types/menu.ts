import type { Categoria, SubCategoria, Tipo, Ingredientes } from "./index";

export interface Menu {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: Categoria;
    subcategoria: SubCategoria;
    tipo: Tipo;
    ingredientes: Ingredientes[];
    imagen_url?: string;
    estado: number;
}

export interface MenuFormData {
    nombre: string;
    descripcion: string;
    precio: number;
    categoriaId: number;
    subcategoriaId: number;
    tipoId: number;
    ingredientes: Ingredientes[];
    imagen_url?: string;
    estado: number;
}

export interface FiltroMenu {
    estado?: number | null;
    categoria?: number | null;
    subcategoria?: number | null;
    tipo?: number | null;
    searchTerm?: string | null;
}
