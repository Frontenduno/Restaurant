import type { TipoDocumento } from "../types/solicitud";
import { ReceiptText, FileText } from "lucide-react";

interface TabsFiltroProps {
  tabActivo: TipoDocumento;
  onTabChange: (tab: TipoDocumento) => void;
  contadores: Record<TipoDocumento, number>;
}

const tabs: { key: TipoDocumento; label: string; icon: typeof ReceiptText }[] = [
  { key: "pre-cuenta", label: "Pre-Cuenta", icon: ReceiptText },
  { key: "boleta-factura", label: "Boletas-Facturas", icon: FileText },
];

export function TabsFiltro({ tabActivo, onTabChange, contadores }: TabsFiltroProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {tabs.map(({ key, label, icon: Icon }) => {
        const isActive = tabActivo === key;
        return (
          <button
            key={key}
            onClick={() => onTabChange(key)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
              transition-all duration-200 cursor-pointer border
              ${isActive
                ? "bg-[#0D00FF] text-white border-[#0D00FF] shadow-md shadow-blue-200"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            <Icon className="w-4 h-4" />
            {label}
            <span
              className={`
                ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                ${isActive ? "bg-white/25 text-white" : "bg-orange-100 text-orange-700"}
              `}
            >
              {contadores[key]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
