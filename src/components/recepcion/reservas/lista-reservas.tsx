"use client";

import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Reserva } from "@/types/recepcion";

// Ahora el componente exige que le pasen la lista de reservas
interface ListaReservasProps {
  reservas: Reserva[];
}

export default function ListaReservas({ reservas }: ListaReservasProps) {
  return (
    <Card className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-gray-600">Cliente</th>
              <th className="p-4 font-semibold text-gray-600">Hora</th>
              <th className="p-4 font-semibold text-gray-600">Nº Personas</th>
              <th className="p-4 font-semibold text-gray-600">Mesa Asignada</th>
              <th className="p-4 font-semibold text-gray-600 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reservas.map((reserva) => (
              <tr key={reserva.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-900">
                  {reserva.cliente}
                </td>
                <td className="p-4 text-gray-600">{reserva.hora}</td>
                <td className="p-4 text-gray-600">{reserva.personas}</td>
                <td className="p-4">
                  {reserva.mesaId === "Pendiente" ? (
                    <Badge variant="warning">Pendiente</Badge>
                  ) : (
                    <Badge variant="info">{reserva.mesaId}</Badge>
                  )}
                </td>
                <td className="p-4 text-right">
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700 text-sm px-3 py-1"
                  >
                    Cancelar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
