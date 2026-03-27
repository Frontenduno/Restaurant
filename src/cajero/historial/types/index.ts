export interface DatosTurno {
  horaApertura: string;
  horaCierre: string;
}

export interface MetricasHistorial {
  totalCobrado: number;
  pedidosAtendidos: number;
  montoInicial: number;
  totalEnCaja: number;
  turno: DatosTurno;
}

export interface IngresoHora {
  hora: number;   // 7..18
  monto: number;  // S/ vendidos en esa hora
}

export type PeriodoHistorial = "Mañana" | "Tarde" | "Noche";

export interface ItemHistorial {
  id: string | number;
  nombre: string;
  nota?: string;
  cantidad: number;
  precio: number;
}

export interface ComprobanteHistorial {
  id: string;
  mesa: string;
  cantPlatos: number;
  tipoDocumento: "Boleta" | "Factura" | "Consumidor Final";
  cliente: string;
  mesero: string;
  total: number;
  hora: string;
  periodo: PeriodoHistorial;
  rangoHorario: string;
  items?: ItemHistorial[];
}

export interface GrupoHistorial {
  periodo: PeriodoHistorial;
  rangoHorario: string;
  comprobantes: ComprobanteHistorial[];
  subtotal: number;
}

