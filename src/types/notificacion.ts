export type TipoNotificacion = "info" | "success" | "warning" | "error";

export interface Notificacion {
  id: string;
  usuarioId: string; // The ID of the user this notification belongs to
  titulo: string;
  mensaje: string;
  tipo: TipoNotificacion;
  leida: boolean;
  fecha: string; // ISO date string
}
