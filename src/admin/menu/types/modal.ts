export type EntityType = "Tipo" | "Categoria" | "Subcategoria";

export interface SaveModalData {
    id?: number;
    detalle: string;
    imagen_url?: string;
    parentId?: number; // idTipo o idCategoria
}
