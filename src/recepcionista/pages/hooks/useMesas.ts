import { useState } from "react";
import type { Mesa } from "@/types";
import mesaData from "@/data/mesas/mesas.json";

const initialMesas = mesaData as Mesa[];

export function useMesas() {
  // Estado principal que guarda la lista de mesas
  const [mesas, setMesas] = useState<Mesa[]>(initialMesas);
  
  // Modales que usa el recepcionista
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  
  // Mesa seleccionada actualmente para ver en el modal
  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null);

  // Funciones de recepcionista
  const openMesaInfo = (mesa: Mesa) => {
    setSelectedMesa(mesa);
    setIsInfoOpen(true);
  };

  // Permite al recepcionista cambiar localmente el estado de la mesa (por ejemplo a 'ocupado')
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
    mesas,
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
