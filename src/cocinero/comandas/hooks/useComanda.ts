import { useState } from "react";
import type { comandaDetalle, user } from "../../types";
import ComandaDetalleData from "../data/Comanda-Detalle-data.json";

const COMPAÑEROS_RECIENTES: user[] = [
  { id_usuario: 1, nombre: "Chef Alberto García", rol: "Cocinero" },
  { id_usuario: 2, nombre: "Elena Beltrán", rol: "Cocinero" },
  { id_usuario: 3, nombre: "Marcos Ruiz", rol: "Cocinero" },
  { id_usuario: 4, nombre: "Sofía Méndez", rol: "Cocinero" },
];

export function useComanda() {
  const [comandasDetalle, setComandasDetalle] = useState<comandaDetalle[]>(
    ComandaDetalleData as comandaDetalle[],
  );

  const [comandaSeleccionada, setComandaSeleccionada] = useState<number | null>(
    null,
  );

  const [isOpenTransferir, setIsOpenTransferir] = useState(false);
  const [isOpenDetalle, setIsOpenDetalle] = useState(false);

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

  const onAceptar = (idComanda: number) => {
    setComandasDetalle((prevDetalles) =>
      prevDetalles.map((item): comandaDetalle => {
        if (item.id_comanda.id_comanda === idComanda) {
          return {
            ...item,
            id_comanda: {
              ...item.id_comanda,
              estado_comanda: "En Cocina",
              fecha: new Date().toISOString(),
            },
          };
        }
        return item;
      }),
    );
  };

  const onListo = (idComanda: number) => {
    setComandasDetalle((prevDetalles) =>
      prevDetalles.map((item): comandaDetalle => {
        if (item.id_comanda.id_comanda === idComanda) {
          return {
            ...item,
            id_comanda: {
              ...item.id_comanda,
              estado_comanda: "Listo",
              fecha: new Date().toISOString(),
            },
          };
        }
        return item;
      }),
    );
  };

  const seleccionarComanda = (idComanda: number) => {
    setComandaSeleccionada(idComanda);
    setIsOpenTransferir(true);
  };

  const onTransferir = (idNuevoCocinero: number) => {
    if (comandaSeleccionada)
      transferirComanda(comandaSeleccionada, idNuevoCocinero);

    setIsOpenTransferir(false);
    setComandaSeleccionada(null);
  };

  const transferirComanda = (idComanda: number, idNuevoCocinero: number) => {
    setComandasDetalle((prevDetalles) => {
      const nuevoCocinero = COMPAÑEROS_RECIENTES.find(
        (c) => c.id_usuario === idNuevoCocinero,
      );

      if (!nuevoCocinero) return prevDetalles;

      return prevDetalles.map((item): comandaDetalle => {
        if (item.id_comanda.id_comanda === idComanda) {
          return {
            ...item,
            id_comanda: {
              ...item.id_comanda,
              estado_comanda: "Transferido",
              id_mesero: {
                ...item.id_comanda.id_mesero,
                id_usuario: nuevoCocinero.id_usuario,
                nombre: nuevoCocinero.nombre,
              },
            },
          };
        }
        return item;
      });
    });

    setIsOpenTransferir(false);
  };

  const obtenerDetallesPorId = (idComanda: number): comandaDetalle[] => {
    return comandasDetalle.filter((d) => d.id_comanda.id_comanda === idComanda);
  };
  const seleccionarParaVerDetalle = (idComanda: number) => {
    setComandaSeleccionada(idComanda);
    setIsOpenDetalle(true);
  };

  return {
    comandaPendientes,
    comandaEnCocina,
    // Modal Transferir
    isOpenTransferir,
    setIsOpenTransferir,
    // Funciones de transferencia
    transferirComanda,
    seleccionarComanda,
    onTransferir,
    // Funciones de aceptar comanda
    onAceptar,
    // Detalle Modal
    obtenerDetallesPorId,
    seleccionarParaVerDetalle,
    isOpenDetalle,
    setIsOpenDetalle,
    comandaSeleccionada,
    onListo,
  };
}
