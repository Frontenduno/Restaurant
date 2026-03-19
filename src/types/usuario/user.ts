import type { Rol } from "./rol";
import type { Area } from "./area";

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: Rol;
  sueldo: number;
  area: Area;
  isActive: boolean;
}