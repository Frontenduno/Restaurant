import { useState } from "react";
import type { comandaDetalle } from "../types/comanda";
import ComandaData from "../data/comanda-data.json";

export function useComanda() {
  const [comandasDetalle, setComandasDetalle] = useState<comandaDetalle[]>(
    ComandaData.comandaDetalles as comandaDetalle[],
  );

  const comandaPendientes = comandasDetalle.filter(
    (comanda) => comanda.id_comanda.estado === "Pendiente",
  );

  const comandaEnCocina = comandasDetalle.filter(
    (comanda) => comanda.id_comanda.estado === "En Cocina",
  );

  return {
    comandaPendientes,
    comandaEnCocina,
  };
}
