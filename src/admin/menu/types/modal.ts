export type EntityType = "tipo" | "categoria" | "subcategoria";

export interface SaveModalData {
    id?: number;
    detalle: string;
    imagen_url?: string;
    parentId?: number; // idTipo o idCategoria
}
