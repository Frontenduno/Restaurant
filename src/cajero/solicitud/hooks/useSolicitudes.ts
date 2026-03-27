import { useState, useMemo, useCallback } from "react";
import type { Solicitud, TipoDocumento } from "../types/solicitud";
import solicitudesData from "../data/solicitudes-data.json";
import { toast } from "sonner";

const IGV_RATE = 0.18;

export function useSolicitudes() {
  const [solicitudesLista, setSolicitudesLista] = useState<Solicitud[]>(solicitudesData as Solicitud[]);
  const [tabActivo, setTabActivo] = useState<TipoDocumento>("pre-cuenta");
  const [solicitudExpandida, setSolicitudExpandida] = useState<number | null>(null);
  const [solicitudPrevia, setSolicitudPrevia] = useState<Solicitud | null>(null);

  const solicitudesFiltradas = useMemo(
    () => solicitudesLista.filter(s => s.tipoDocumento === tabActivo && s.estado !== "impreso"),
    [solicitudesLista, tabActivo]
  );

  const contadores = useMemo(() => ({
    "pre-cuenta": solicitudesLista.filter(s => s.tipoDocumento === "pre-cuenta" && s.estado !== "impreso").length,
    "boleta-factura": solicitudesLista.filter(s => s.tipoDocumento === "boleta-factura" && s.estado !== "impreso").length,
  }), [solicitudesLista]);

  const toggleExpandir = useCallback((id: number) => {
    setSolicitudExpandida(prev => (prev === id ? null : id));
  }, []);

  const abrirVistaPrevia = useCallback((solicitud: Solicitud) => {
    setSolicitudPrevia(solicitud);
  }, []);

  const cerrarVistaPrevia = useCallback(() => {
    setSolicitudPrevia(null);
  }, []);

  const imprimirSolicitud = useCallback((id: number) => {
    setSolicitudesLista(prev =>
      prev.map(s => (s.id === id ? { ...s, estado: "impreso" } : s))
    );
    setSolicitudExpandida(prev => (prev === id ? null : prev));
    setSolicitudPrevia(prev => (prev?.id === id ? null : prev));
    toast.success("Comprobante marcado como impreso");
  }, []);

  const calcularTotal = useCallback(
    (solicitud: Solicitud) =>
      solicitud.items.reduce((acc, item) => acc + item.cantidad * item.precioUnitario, 0),
    []
  );

  const calcularSubtotal = useCallback(
    (solicitud: Solicitud) => calcularTotal(solicitud) / (1 + IGV_RATE),
    [calcularTotal]
  );

  const calcularIGV = useCallback(
    (solicitud: Solicitud) => {
      const total = calcularTotal(solicitud);
      return total - total / (1 + IGV_RATE);
    },
    [calcularTotal]
  );

  return {
    tabActivo,
    setTabActivo,
    solicitudesFiltradas,
    contadores,
    solicitudExpandida,
    toggleExpandir,
    solicitudPrevia,
    abrirVistaPrevia,
    cerrarVistaPrevia,
    imprimirSolicitud,
    calcularSubtotal,
    calcularIGV,
    calcularTotal,
  };
}

