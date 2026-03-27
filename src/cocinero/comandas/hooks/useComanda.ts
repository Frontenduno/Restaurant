import { useState } from "react";
import type { comandaDetalle } from "../types/comanda";
import ComandaData from "../data/comandaDetalle-data.json";

export function useComanda() {
  const [comandasDetalle, setComandasDetalle] = useState<comandaDetalle[]>(
    ComandaData as comandaDetalle[],
  );

  const comandaPendientes = comandasDetalle.filter(
    (comanda) => comanda.id_comanda.estado_comanda === "Pendiente",
  );

  const comandaEnCocina = comandasDetalle.filter(
    (comanda) => comanda.id_comanda.estado_comanda === "En Cocina",
  );

  return {
    comandaPendientes,
    comandaEnCocina,
  };
}
