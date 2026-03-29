export interface Ingredientes {
    id: number;
    nombre: string;
    cantidad: number;
    unidad: string;
}

export interface IngredienteDisponible {
    id: number;
    nombre: string;
}

export interface Unidad {
    id: number;
    nombre: string;
    abreviatura: string;
}