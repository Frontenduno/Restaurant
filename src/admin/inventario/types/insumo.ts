import type { Categoria } from "./categoria";

export interface Insumo {
    id: number;
    nombre: string;
    categoria: Categoria;
    stock: number;
    unidad: string;
    estado: Estado;
}

export interface Estado {
    id: number;
    detalle: string;
}

export interface FiltroInventario {
    categoriaId?: number | null;
    estadoId?: number | null;
    searchTerm?: string | null;
}