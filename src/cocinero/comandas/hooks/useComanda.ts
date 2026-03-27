import { useState } from "react";
import type { comandaDetalle } from "../types/comanda";
import ComandaDetalleData from "../data/Comanda-Detalle-data.json";

export function useComanda() {
  const [comandasDetalle, setComandasDetalle] = useState<comandaDetalle[]>(
    ComandaDetalleData as comandaDetalle[],
  );

  const agruparPorComanda = (detalles: comandaDetalle[]) => {
    const agrupados = detalles.reduce(
      (acc: Record<number, comandaDetalle[]>, item) => {
        const id = item.id_comanda.id_comanda;
        if (!acc[id]) acc[id] = [];
        acc[id].push(item);
        return acc;
      },
      {},
    );
    return Object.values(agrupados);
  };

  const comandaPendientes = agruparPorComanda(
    comandasDetalle.filter((d) => d.id_comanda.estado_comanda === "Pendiente"),
  );

  const comandaEnCocina = agruparPorComanda(
    comandasDetalle.filter((d) => d.id_comanda.estado_comanda === "En Cocina"),
  );

  return {
    comandaPendientes,
    comandaEnCocina,
  };
}
