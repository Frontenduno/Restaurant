import { useState, useEffect, useMemo } from "react";
import type { MetricasHistorial, GrupoHistorial, IngresoHora } from "../types";
import mockData from "../data/mockData.json";

export function useHistorial() {
  const [metricas, setMetricas] = useState<MetricasHistorial | null>(null);
  const [grupos, setGrupos] = useState<GrupoHistorial[]>([]);
  const [ingresosPorHora, setIngresosPorHora] = useState<IngresoHora[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMetricas(mockData.metricas as MetricasHistorial);
      setGrupos(mockData.gruposHistorial as GrupoHistorial[]);
      setIngresosPorHora(mockData.ingresosPorHora as IngresoHora[]);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Cálculos derivados memoizados para evitar recalcular en cada render
  const resumenComprobantes = useMemo(() => {
    let boletasCantidad = 0, boletasTotal = 0;
    let facturasCantidad = 0, facturasTotal = 0;

    for (const g of grupos) {
      for (const c of g.comprobantes) {
        if (c.tipoDocumento === "Factura") {
          facturasCantidad++;
          facturasTotal += c.total;
        } else {
          boletasCantidad++;
          boletasTotal += c.total;
        }
      }
    }

    return { boletasCantidad, boletasTotal, facturasCantidad, facturasTotal };
  }, [grupos]);

  return { metricas, grupos, ingresosPorHora, resumenComprobantes, isLoading };
}

