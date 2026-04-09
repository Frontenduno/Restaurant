import { useState, useMemo } from "react";
import type { Asistencia } from "../types/asistencia";
import DataAsistencia from "@/admin/asistencia/data/asistencia.json";

const { asistencias } = DataAsistencia;

export function useAsistencia() {
  const [asist] = useState<Asistencia[]>(asistencias as Asistencia[]);

  // Estados para los filtros
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [filterRole, setFilterRole] = useState("Todos");
  const [filterDate, setFilterDate] = useState("");

  // Lógica de Filtrado
  const filteredAsistencias = useMemo(() => {
    return asist.filter((item) => {
      // Filtro por Estado (Nota: "Presente" en el filtro equivale a "A Tiempo")
      const matchesStatus =
        filterStatus === "Todos" ||
        (filterStatus === "Presente" && item.estado === "A Tiempo") ||
        item.estado === filterStatus;

      // Filtro por Rol
      const matchesRole =
        filterRole === "Todos" || item.user?.rol.nombre === filterRole;

      // Filtro por Fecha (Comparación de strings YYYY-MM-DD)
      const matchesDate = filterDate === "" || item.fecha === filterDate;

      return matchesStatus && matchesRole && matchesDate;
    });
  }, [asist, filterStatus, filterRole, filterDate]);

  // 2. Conteos para las Tarjetas (Sobre la data original sin filtrar o filtrada por fecha)
  // Normalmente las tarjetas muestran el total del día seleccionado
  const counts = useMemo(() => {
    const dataToCount = filterDate
      ? asist.filter((a) => a.fecha === filterDate)
      : asist;

    return dataToCount.reduce(
      (acc, curr) => {
        if (curr.estado === "A Tiempo") acc.aTiempo++;
        else if (curr.estado === "Tardanza") acc.tardanza++;
        else if (curr.estado === "Ausente") acc.ausente++;

        if (curr.estado === "Ausente" && curr.justificada) acc.justificadas++;

        // Sumamos minutos para el promedio de tardanza
        acc.totalMinutosTardanza += curr.minutos_tardanza || 0;

        return acc;
      },
      {
        aTiempo: 0,
        tardanza: 0,
        ausente: 0,
        justificadas: 0,
        totalMinutosTardanza: 0,
      },
    );
  }, [asist, filterDate]);

  return {
    asistencias: filteredAsistencias, // Esta es la que pasas a la Tabla
    fecha: filterDate, // Fecha elegida en el filtro date
    counts, // Esta es la que pasas a las Tarjetas
    filters: {
      status: filterStatus,
      role: filterRole,
      date: filterDate,
    },
    actions: {
      setFilterStatus,
      setFilterRole,
      setFilterDate,
    },
  };
}
