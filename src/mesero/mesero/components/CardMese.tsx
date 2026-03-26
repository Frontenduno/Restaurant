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
  mesa: Mesa & { 
    cliente?: string; 
    comanda?: any[]; 
    fase?: string;
  };
  onClick: (mesa: Mesa) => void;
  statusColors: Record<string, string>;
  isSelected?: boolean;
}

export function CardMesa({ mesa, onClick, statusColors, isSelected = false }: CardMesaProps) {
  const estadoStr = mesa.status.detalle.toLowerCase();
  const bgColorClass = statusColors[estadoStr] || "bg-gray-400";
  
  const borderColors: Record<string, string> = {
    disponible: "border-[#10b981]",
    ocupado: "border-blue-500",
    reservado: "border-orange-500",
  };
  
  const borderColorClass = borderColors[estadoStr] || "border-gray-200";

  // Lógica para el badge dinámico
  const hasComanda = mesa.comanda && mesa.comanda.length > 0;
  const numPlatos = mesa.comanda?.length || 0;
  const fase = mesa.fase || "confirmacion";

  const getFaseLabel = () => {
    switch (fase) {
      case "confirmacion": return "En espera";
      case "confirmado":    return "Confirmado";
      case "cocina":       return "👨‍🍳 En cocina";
      case "listo":        return "🍽️ Listo";
      default:             return "Pendiente";
    }
  };

  return (
    <div
      onClick={() => onClick(mesa)}
      className={`
        bg-white cursor-pointer border-2 ${borderColorClass} rounded-[2rem]
        flex flex-col items-center justify-center relative
        transition-all duration-200 group
        ${isSelected
          ? 'p-4 shadow-lg scale-[1.02]'
          : 'p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5'}
      `}
    >
      <div
        className={`absolute top-4 right-4 w-4 h-4 rounded-full ${bgColorClass} group-hover:scale-110 transition-transform flex items-center justify-center`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
      </div>

      <div className="mb-4 mt-2 text-gray-800">
        {mesa.shape.detalle.toLowerCase() === "redonda" ? <TableRoundIcon /> : <TableRectIcon />}
      </div>

      <h3 className="text-[17px] text-gray-800 font-bold">{mesa.name}</h3>
      <p className="text-[13px] text-gray-400 mt-1 font-medium">
        {mesa.capacity} Personas • {mesa.location.detalle}
      </p>

      {/* Badge de acción (solo si está ocupado o tiene comanda) */}
      {(estadoStr === "ocupado" || hasComanda) && (
        <div className="mt-4 w-full">
           <div className={`
              w-full py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2
              ${fase === 'listo' ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#F0F6FF] text-[#3461FF]'}
              border border-current opacity-20
           `} style={{ backgroundColor: 'rgb(240 246 255)', borderColor: 'rgb(214 228 255)', opacity: 1 }}>
              <span className="text-[12px] font-bold flex items-center gap-1.5">
                  <span className="opacity-70">📋</span>
                  {numPlatos} plato{numPlatos !== 1 ? 's' : ''} · {getFaseLabel()}
              </span>
           </div>
        </div>
      )}
      
      {estadoStr === "reservado" && (
        <div className="mt-4 w-full">
           <div className="w-full py-2.5 px-3 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] text-[#9A3412] flex items-center justify-center gap-2">
              <span className="text-[12px] font-bold flex items-center gap-1.5">
                  <span className="opacity-70">📅</span> Reservado
              </span>
           </div>
        </div>
      )}

      {estadoStr === "disponible" && !hasComanda && (
          <div className="mt-4 w-full opacity-0 group-hover:opacity-100 transition-opacity">
             <div className="w-full py-2.5 px-3 rounded-2xl bg-gray-50 border border-gray-100 text-gray-400 flex items-center justify-center">
                <span className="text-[11px] font-bold uppercase tracking-wider">Disponible</span>
             </div>
          </div>
      )}
    </div>
  );
}
