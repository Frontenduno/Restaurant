import { useState, useEffect } from "react";
import type { Mesa } from "@/types";
import mesaData from "@/data/mesas/mesas.json";
import reservasData from "@/data/reservas/reservas.json";
import menuData from "@/admin/menu/data/menu-data.json";

const initialMesas = mesaData as Mesa[];

/**
 * Hook para el mesero:
 * - Carga las mesas y reservas usando localStorage
 * - Filtra mesas por área
 * - Asocia cada mesa con su cliente actual (si está reservada u ocupada)
 */
export function useMeser(areaDelMesero: string | undefined) {
  const [mesas, setMesas] = useState<Mesa[]>(() => {
    const saved = localStorage.getItem("mesasApp");
    if (saved) return JSON.parse(saved);
    return initialMesas;
  });

  const [reservas, setReservas] = useState<any[]>(() => {
    const saved = localStorage.getItem("reservasApp");
    if (saved) return JSON.parse(saved);
    return reservasData;
  });

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

  // Función para actualizar el estado o fase de una reserva
  const updateMesaFase = (mesaId: number, newFase: string) => {
     setReservas(prevReservas => {
        const updated = prevReservas.map(r => {
           if (r.mesas.includes(mesaId) && (r.estado === "confirmada" || r.estado === "pendiente")) {
              // Si pasamos a cocina, reiniciamos el pct si no existe y guardamos el tiempo de inicio
              const pct = newFase === "cocina" ? (r.pct || 0) : (newFase === "listo" ? 100 : 0);
              const cookStartTime = newFase === "cocina" ? Date.now() : r.cookStartTime;
              return { ...r, fase: newFase, pct, cookStartTime };
           }
           return r;
        });
        localStorage.setItem("reservasApp", JSON.stringify(updated));
        return updated;
     });
     window.dispatchEvent(new Event("storage"));
  };

  const updateMesaProgress = (mesaId: number, pct: number) => {
     setReservas(prevReservas => {
        const updated = prevReservas.map(r => {
           if (r.mesas.includes(mesaId)) {
              return { ...r, pct };
           }
           return r;
        });
        localStorage.setItem("reservasApp", JSON.stringify(updated));
        return updated;
     });
  };

  // Función para actualizar el estado de una mesa en localStorage
  const updateMesaStatus = (mesaId: number, newState: string) => {
    setMesas(prevMesas => {
      const updated = prevMesas.map(m => {
        if (m.id === mesaId) {
          return {
            ...m,
            status: { ...m.status, detalle: newState, id: newState === "disponible" ? 1 : newState === "ocupado" ? 2 : 3 }
          };
        }
        return m;
      });
      localStorage.setItem("mesasApp", JSON.stringify(updated));
      return updated;
    });

    if (newState === "ocupado") {
       setReservas(prevReservas => {
          const reservAsoc = prevReservas.find(r => r.mesas.includes(mesaId) && r.estado === "pendiente");
          if (reservAsoc) {
             const updated = prevReservas.map(r => 
               r.id === reservAsoc.id ? { ...r, estado: "confirmada" } : r
             );
             localStorage.setItem("reservasApp", JSON.stringify(updated));
             return updated;
          }
          return prevReservas;
       });
    } else if (newState === "disponible") {
       setReservas(prevReservas => {
          const updated = prevReservas.filter(r => !r.mesas.includes(mesaId));
          localStorage.setItem("reservasApp", JSON.stringify(updated));
          return updated;
       });
    }
    
    window.dispatchEvent(new Event("storage")); 
  };

  // Función para guardar platos en la reserva
  const updateMesaComanda = (mesaId: number, items: any[]) => {
     setReservas(prevReservas => {
        // Convertimos el carrito de objetos de vuelta a un array plano de IDs para el JSON
        const platosIds: number[] = [];
        items.forEach(it => {
           for(let i=0; i<it.cantidad; i++) platosIds.push(it.id);
        });

        const updated = prevReservas.map(r => {
           // Buscamos cualquier reserva activa asociada a esta mesa
           if (r.mesas.includes(mesaId) && (r.estado === "confirmada" || r.estado === "pendiente")) {
              return { ...r, platos: platosIds, comanda: items };
           }
           return r;
        });

        localStorage.setItem("reservasApp", JSON.stringify(updated));
        return updated;
     });
     window.dispatchEvent(new Event("storage"));
  };

  // Combinar mesas con información de clientes
  const mesasConClientes = mesas.map(mesa => {
    const reservaActiva = reservas.find(r => 
      r.mesas.includes(mesa.id) && 
      (
        (mesa.status.detalle.toLowerCase() === "ocupado" && r.estado === "confirmada") ||
        (mesa.status.detalle.toLowerCase() === "reservado" && r.estado === "pendiente") ||
        (mesa.status.detalle.toLowerCase() === "sucio" && (r.estado === "confirmada" || r.estado === "pendiente"))
      )
    );

    // Hidratar la comanda si vienen solo IDs de platos
    let comandaHidratada = reservaActiva?.comanda || [];
    
    if (reservaActiva?.platos && reservaActiva.platos.length > 0 && comandaHidratada.length === 0) {
       // Agrupamos IDs para calcular cantidad
       const counts: Record<number, number> = {};
       reservaActiva.platos.forEach((id: number) => { counts[id] = (counts[id] || 0) + 1; });
       
       comandaHidratada = Object.entries(counts).map(([idStr, qty]) => {
          const item = menuData.menuItems.find(mi => mi.id === parseInt(idStr));
          if (!item) return null;
          return {
             ...item,
             cantidad: qty,
             nota: "",
             key: Math.random() // Temp key para la sesión
          };
       }).filter(Boolean);
    }

    return {
      ...mesa,
      cliente: reservaActiva ? reservaActiva.nombre : undefined,
      comanda: comandaHidratada,
      fase: reservaActiva?.fase || "confirmacion",
      pct: reservaActiva?.pct || 0,
      cookStartTime: reservaActiva?.cookStartTime
    };
  });

  const mesasDelMesero = areaDelMesero
    ? mesasConClientes.filter(m => m.location.detalle.toLowerCase() === areaDelMesero.toLowerCase())
    : mesasConClientes;

  return { mesas: mesasDelMesero, updateMesaStatus, updateMesaComanda, updateMesaFase, updateMesaProgress };
}
