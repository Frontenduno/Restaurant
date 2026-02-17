"use client";

import { Mesa } from "@/types/recepcion";
import Badge from "@/components/ui/badge";

interface MesaCardProps {
  mesa: Mesa;
  onClick: (mesa: Mesa) => void;
}

export default function MesaCard({ mesa, onClick }: MesaCardProps) {
  // Solo definimos el color de fondo y borde, el texto lo maneja el Badge
  const bgColores = {
    disponible: "bg-green-50 border-green-500 hover:bg-green-100",
    ocupada: "bg-red-50 border-red-500 hover:bg-red-100",
    sucia: "bg-yellow-50 border-yellow-500 hover:bg-yellow-100",
    reservada: "bg-blue-50 border-blue-500 hover:bg-blue-100",
  };

  // Mapeamos el estado de la mesa a la variante de nuestro Badge
  const badgeVariants: Record<
    string,
    "success" | "danger" | "warning" | "info"
  > = {
    disponible: "success",
    ocupada: "danger",
    sucia: "warning",
    reservada: "info",
  };

  return (
    <button
      onClick={() => onClick(mesa)}
      className={`p-4 rounded-xl border-l-4 shadow-sm transition-all text-left flex flex-col justify-between h-28 ${bgColores[mesa.estado]}`}
    >
      <div className="flex justify-between items-start w-full">
        <span className="font-bold text-lg text-gray-800">{mesa.nombre}</span>
        <Badge variant={badgeVariants[mesa.estado]}>{mesa.estado}</Badge>
      </div>
      <div className="text-sm text-gray-600 mt-2 font-medium">
        👤 {mesa.capacidad} pers. | 📍 {mesa.ubicacion}
      </div>
    </button>
  );
}
