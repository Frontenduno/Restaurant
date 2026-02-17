"use client";

import { useState } from "react";
import ListaReservas from "@/components/recepcion/reservas/lista-reservas";
import FormReserva from "@/components/recepcion/reservas/form-reserva";
import Button from "@/components/ui/button";
import { Reserva } from "@/types/recepcion";

// Mismos datos mockeados, pero ahora viven en el estado global de esta página
const reservasIniciales: Reserva[] = [
  {
    id: "1",
    cliente: "Juan Pérez",
    hora: "14:00",
    personas: 4,
    mesaId: "Mesa 4",
  },
  {
    id: "2",
    cliente: "Ana Gómez",
    hora: "15:30",
    personas: 2,
    mesaId: "Pendiente",
  },
];

export default function ReservasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Aquí guardamos nuestras reservas interactivas
  const [reservas, setReservas] = useState<Reserva[]>(reservasIniciales);

  // Esta función recibirá los datos del formulario y los agregará a la tabla
  const manejarGuardarReserva = (
    nuevaReserva: Omit<Reserva, "id" | "mesaId">,
  ) => {
    const reservaCompleta: Reserva = {
      ...nuevaReserva,
      id: Math.random().toString(36).substr(2, 9), // Genera un ID temporal
      mesaId: "Pendiente", // Por defecto entra como Pendiente
    };

    // Actualizamos la lista: agregamos la nueva al final de las que ya existían
    setReservas([...reservas, reservaCompleta]);
    setIsModalOpen(false); // Cerramos el modal
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Reservas del Día</h2>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + AGREGAR
        </Button>
      </div>

      {/* Le pasamos la lista actualizada a la tabla */}
      <ListaReservas reservas={reservas} />

      {/* Le pasamos la función de guardar al formulario */}
      <FormReserva
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGuardar={manejarGuardarReserva}
      />
    </div>
  );
}
