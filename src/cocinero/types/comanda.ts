import type { menu } from "./menu";
import type { user } from "./user";

type estadoComanda =
  | "Pendiente"
  | "En Cocina"
  | "Listo"
  | "Cancelado"
  | "Transferido";
export interface comanda {
  id_comanda: number;
  id_mesa: number;
  id_mesero: user;
  fecha: string;
  estado_comanda: estadoComanda;
}

export interface comandaDetalle {
  id_detalle: number;
  id_comanda: comanda;
  id_menu: menu;
  cantidad: number;
  observaciones?: string;
}

export interface historialComanda {
  id_historial: number;
  id_comanda: comanda;
  id_cocinero: user;
  fecha_preparado: string;
}
