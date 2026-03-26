import { useState, useEffect } from "react";
import type { Mesa } from "@/types";
import mesaData from "@/data/mesas/mesas.json";
import reservasData from "@/data/reservas/reservas.json";

const initialMesas = mesaData as Mesa[];

export function useMesas() {
  // Estado principal de mesas con persistencia
  const [mesas, setMesas] = useState<Mesa[]>(() => {
    const saved = localStorage.getItem("mesasApp");
    if (saved) return JSON.parse(saved);
    return initialMesas;
  });

  // Estado de reservas para vincular clientes
  const [reservas, setReservas] = useState<any[]>(() => {
    const saved = localStorage.getItem("reservasApp");
    if (saved) return JSON.parse(saved);
    return reservasData;
  });
  
  // Persistencia de mesas
  useEffect(() => {
    localStorage.setItem("mesasApp", JSON.stringify(mesas));
  }, [mesas]);

  // Sincronización con otros cambios (storage event)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "mesasApp" && e.newValue) {
        setMesas(JSON.parse(e.newValue));
      }
      if (e.key === "reservasApp" && e.newValue) {
        setReservas(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null);

  // Combinar mesas con información de clientes para la vista
  const mesasConClientes = mesas.map(mesa => {
    const reservaActiva = reservas.find(r => 
      r.mesas.includes(mesa.id) && 
      (
        (mesa.status.detalle.toLowerCase() === "ocupado" && r.estado === "confirmada") ||
        (mesa.status.detalle.toLowerCase() === "reservado" && r.estado === "pendiente")
      )
    );

    return {
      ...mesa,
      cliente: reservaActiva ? reservaActiva.nombre : undefined
    };
  });

  const openMesaInfo = (mesa: Mesa) => {
    // Buscamos la mesa con info de cliente en el array procesado
    const mesaConInfo = mesasConClientes.find(m => m.id === mesa.id) || mesa;
    setSelectedMesa(mesaConInfo);
    setIsInfoOpen(true);
  };

  const updateMesa = (mesaId: number, newStateDetails: string, meseroId?: number) => {
    setMesas(prevMesas => prevMesas.map(m => {
      if (m.id === mesaId) {
        return {
          ...m,
          status: { ...m.status, detalle: newStateDetails },
          meseroId: meseroId
        }
      }
      return m;
    }));
  };

  return {
    mesas: mesasConClientes,
    modals: {
      isInfoOpen, 
      setIsInfoOpen,
    },
    selectedMesa,
    actions: {
      openMesaInfo,
      updateMesa,
    }
  };
}
