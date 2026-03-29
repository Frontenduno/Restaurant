export type TipoDocumento = "pre-cuenta" | "boleta-factura";
export type SubTipoDocumento = "boleta" | "factura";

export interface DatosCliente {
  nombreRazonSocial: string;
  documentoIdentidad: string; // RUC o DNI
  direccion?: string;
  email?: string;
}

export interface MetadatosSunat {
  serie: string;
  correlativo: string;
  hashRespuesta?: string;
}

export interface ItemSolicitud {
  id: number;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  nota?: string;
}

export interface Solicitud {
  id: number;
  mesaId: number;
  mesaNombre: string;
  tipoDocumento: TipoDocumento;
  subTipo?: SubTipoDocumento;          // Aplica para el tab "boleta-factura"
  datosCliente?: DatosCliente;         // Opcional, pero requerido en Facturas y a veces Boletas
  datosSunat?: MetadatosSunat;         // Opcional, datos como la serie y nro correlativo.
  meseroNombre: string;
  hora: string;
  personas: number;
  items: ItemSolicitud[];
  estado: "pendiente" | "impreso";
}
