import type { user } from "@/admin/asistencia/types/user";

export interface Horario {
  id_horario: string;
  nombre: string;
  hora_ingreso: string;
  hora_salida: string;
  tolerancia: number;
}

export interface Asistencia {
  id_asistencia: string;
  id_usuario: number;
  user?: user;
  fecha: string;
  hora_marcada: string | null;
  hora_salida_marcada: string | null;
  estado: "A Tiempo" | "Tardanza" | "Ausente";
  minutos_tardanza: number;
  justificada: boolean;
  id_horario?: string;
}
