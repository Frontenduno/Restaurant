import type { Estado } from "@/types/mesas/estado";

interface GridEstadosProps {
  estados: Estado[];
  statusColors: Record<string, string>;
}

export function GridEstados({ estados, statusColors }: GridEstadosProps) {
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="flex flex-wrap items-center gap-6 mb-6 mt-6">
      {estados.map((estado) => (
        <div key={estado.id} className="flex items-center gap-2">
          <div className={`w-[10px] h-[10px] rounded-full ${statusColors[estado.detalle.toLowerCase()] || 'bg-gray-400'}`}></div>
          <span className="text-sm text-gray-500 font-medium">{capitalize(estado.detalle)}</span>
        </div>
      ))}
    </div>
  );
}
