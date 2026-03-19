import type { Estado } from "./estado";
import type { Area } from "./area";
import type { Tipo } from "./tipo";

export interface Mesa {
  id: number;
  name: string;
  capacity: number;
  status: Estado;
  location: Area;
  shape: Tipo;
}
