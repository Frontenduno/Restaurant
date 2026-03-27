// =============================================================================
// TIPOS — Historial
// =============================================================================

import historialJson from "@/data/historial/historial.json";

export interface HistorialItem {
    mid: number;
    nombre: string;
    cantidad: number;
    precio: number;   // precio unitario
    nota?: string;
}

export interface RegistroHistorial {
    id: number;
    mesaId: number;
    mesaNombre: string;   // "Mesa 1"
    zona: string;         // "Ventana", "Interior", "Terraza"
    tipo: "Boleta" | "Factura";
    cliente: string;      // "Consumidor Final" | "Empresa SAC" | ...
    hora: string;         // "13:48"
    items: HistorialItem[];
    total: number;        // total ya con IGV
}

// =============================================================================
// HOOK — useHistorial
// =============================================================================

export function useHistorial() {
    const historial: RegistroHistorial[] = historialJson as RegistroHistorial[];

    return {
        historial,
    };
}