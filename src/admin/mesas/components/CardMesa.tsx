import type { Mesa } from "@/types/mesas/mesa";

const TableRoundIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
    <circle cx="12" cy="12" r="5" fill="white" />
    <path d="M12 2v2 M12 20v2 M2 12h2 M20 12h2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4" />
  </svg>
);

const TableRectIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
    <rect x="4" y="8" width="16" height="8" rx="1" fill="white" />
    <path d="M7 8V5a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1v3" />
    <path d="M15 8V5a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1v3" />
    <path d="M7 16v3a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1v-3" />
    <path d="M15 16v3a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1v-3" />
  </svg>
);

interface CardMesaProps {
  mesa: Mesa;
  onClick: (mesa: Mesa) => void;
  statusColors: Record<string, string>;
}

export function CardMesa({ mesa, onClick, statusColors }: CardMesaProps) {
  return (
    <div
      onClick={() => onClick(mesa)}
      className="bg-white cursor-pointer border border-gray-200 rounded-[1rem] p-6 flex flex-col items-center justify-center relative shadow-sm hover:shadow-md transition-all duration-200 group"
    >
      <div
        className={`absolute top-4 right-4 w-3 h-3 rounded-full ${statusColors[mesa.status.detalle.toLowerCase()] || 'bg-gray-400'} group-hover:scale-110 transition-transform`}
      />

      <div className="mb-4 mt-2 text-gray-800">
        {mesa.shape.detalle.toLowerCase() === "redonda" ? <TableRoundIcon /> : <TableRectIcon />}
      </div>

      <h3 className="text-[15px] text-gray-800 font-semibold">{mesa.name}</h3>
      <p className="text-[12px] text-gray-400 mt-1">
        {mesa.capacity} Personas • {mesa.location.detalle}
      </p>
    </div>
  );
}
