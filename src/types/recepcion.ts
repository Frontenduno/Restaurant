// src/types/recepcion.ts

export type EstadoMesa = "disponible" | "ocupada" | "sucia" | "reservada";

export interface Mesa {
  id: string;
  nombre: string; // Ej: "Mesa 1"
  capacidad: number; // Ej: 4 personas
  estado: EstadoMesa;
  ubicacion: string; // Ej: "Terraza", "Salón"
}

export interface Reserva {
  id: string;
  cliente: string;
  hora: string;
  personas: number;
  mesaId?: string; // Opcional, si ya se asignó
}
