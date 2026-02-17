"use client";

import Modal from "@/components/ui/modal";
import Button from "@/components/ui/button";
import { Reserva } from "@/types/recepcion";

interface FormReservaProps {
  isOpen: boolean;
  onClose: () => void;
  // Añadimos la función que viene del papá
  onGuardar: (reserva: Omit<Reserva, "id" | "mesaId">) => void;
}

export default function FormReserva({
  isOpen,
  onClose,
  onGuardar,
}: FormReservaProps) {
  // Esta función se ejecuta al darle a "Guardar Reserva"
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // FormData recolecta automáticamente todos los inputs que tengan la etiqueta "name"
    const formData = new FormData(e.currentTarget);

    onGuardar({
      cliente: formData.get("cliente") as string,
      hora: formData.get("hora") as string,
      personas: Number(formData.get("personas")),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nueva Reserva">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Cliente
          </label>
          <input
            name="cliente" // <- ¡Súper importante para recolectar el dato!
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            placeholder="Ej. Carlos Mendoza"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hora
            </label>
            <input
              name="hora" // <- ¡Importante!
              type="time"
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nº Personas
            </label>
            <input
              name="personas" // <- ¡Importante!
              type="number"
              min="1"
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              placeholder="2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Guardar Reserva
          </Button>
        </div>
      </form>
    </Modal>
  );
}
