type estadoComanda = "Pendiente" | "En Cocina" | "Listo";
export interface comanda {
  id_comanda: number;
  id_mesa: number;
  id_mesero: number;
  fecha: string;
  estado: estadoComanda;
}

export interface comandaDetalle {
  id_detalle: number;
  id_comanda: number;
  id_menu: number;
  cantidad: number;
  observaciones: string;
}

export interface historialComanda {
  id_historial: number;
  id_comanda: number;
  id_cocinero: number;
  fecha_preparado: string;
}
