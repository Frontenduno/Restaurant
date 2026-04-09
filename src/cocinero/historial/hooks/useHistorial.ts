import { useState, useMemo } from "react";
import type { comandaDetalle } from "../../types/index";
import HistorialData from "../data/HistorialComandaData.json";

export function useInventario() {
  const [historialComanda] = useState<comandaDetalle[]>(
    HistorialData as comandaDetalle[],
  );

  const [filtroId, setFiltroId] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const [isOpenDetalle, setIsOpenDetalle] = useState(false);
  const [comandaSeleccionada, setComandaSeleccionada] = useState<number | null>(
    null,
  );

  const comandasFiltradasYAgrupadas = useMemo(() => {
    const grupos = historialComanda.reduce(
      (acc, item) => {
        const id = item.id_comanda.id_comanda;
        if (!acc[id]) acc[id] = [];
        acc[id].push(item);
        return acc;
      },
      {} as Record<number, comandaDetalle[]>,
    );

    return Object.values(grupos).filter((grupo) => {
      const cabecera = grupo[0].id_comanda;

      const cumpleId = cabecera.id_comanda.toString().includes(filtroId);

      const cumpleEstado =
        filtroEstado === "Todos" ||
        cabecera.estado_comanda.toLowerCase() === filtroEstado.toLowerCase();

      const fechaComanda = new Date(cabecera.fecha).getTime();
      const inicio = fechaInicio
        ? new Date(fechaInicio + "T00:00:00").getTime()
        : null;
      const fin = fechaFin ? new Date(fechaFin + "T23:59:59").getTime() : null;

      const cumpleFecha =
        (!inicio || fechaComanda >= inicio) && (!fin || fechaComanda <= fin);

      return cumpleId && cumpleEstado && cumpleFecha;
    });
  }, [historialComanda, filtroId, filtroEstado, fechaInicio, fechaFin]);

  const seleccionarComanda = (idComanda: number) => {
    setComandaSeleccionada(idComanda);
    setIsOpenDetalle(true);
  };

  const obtenerDetallesPorId = (idComanda: number): comandaDetalle[] => {
    return historialComanda.filter(
      (d) => d.id_comanda.id_comanda === idComanda,
    );
  };

  return {
    // Data procesada
    comandasAgrupadas: comandasFiltradasYAgrupadas,

    // Setters para los filtros
    setFiltroId,
    setFiltroEstado,
    setFechaInicio,
    setFechaFin,

    // Detalle y Modal
    obtenerDetallesPorId,
    isOpenDetalle,
    setIsOpenDetalle,
    seleccionarComanda,
    comandaSeleccionada,
  };
}
