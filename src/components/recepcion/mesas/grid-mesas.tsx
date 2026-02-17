"use client";

import { useState } from "react";
import { Mesa } from "@/types/recepcion";
import MesaCard from "./mesa-card";
import ModalDetalle from "./modal-detalle";

// Datos de prueba (Mock) - Luego vendrán de tu base de datos
const mesasIniciales: Mesa[] = [
  {
    id: "1",
    nombre: "Mesa 1",
    capacidad: 4,
    estado: "disponible",
    ubicacion: "Terraza",
  },
  {
    id: "2",
    nombre: "Mesa 2",
    capacidad: 2,
    estado: "ocupada",
    ubicacion: "Salón Principal",
  },
  {
    id: "3",
    nombre: "Mesa 3",
    capacidad: 6,
    estado: "sucia",
    ubicacion: "Salón Principal",
  },
  {
    id: "4",
    nombre: "Mesa 4",
    capacidad: 4,
    estado: "reservada",
    ubicacion: "Ventana",
  },
];

export default function GridMesas() {
  const [mesas, setMesas] = useState<Mesa[]>(mesasIniciales);
  const [mesaSeleccionada, setMesaSeleccionada] = useState<Mesa | null>(null);

  // Acción del Paso 3 de tu diagrama: Cambiar a ocupado
  const manejarOcupar = (id: string) => {
    setMesas(mesas.map((m) => (m.id === id ? { ...m, estado: "ocupada" } : m)));
    setMesaSeleccionada(null); // Cerrar modal
    alert("Mesa marcada como ocupada. Notificando al mesero..."); // Simulación del aviso
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mesas.map((mesa) => (
          <MesaCard
            key={mesa.id}
            mesa={mesa}
            onClick={(m) => setMesaSeleccionada(m)}
          />
        ))}
      </div>

      <ModalDetalle
        mesa={mesaSeleccionada}
        isOpen={!!mesaSeleccionada}
        onClose={() => setMesaSeleccionada(null)}
        onOcupar={manejarOcupar}
      />
    </>
  );
}
