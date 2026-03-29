import { ReceiptText, FileText } from "lucide-react";
import type { GrupoHistorial, ComprobanteHistorial } from "../types";

export function HistoryItem({ item, onSelect }: { item: ComprobanteHistorial; onSelect: (item: ComprobanteHistorial) => void }) {
  const isFactura = item.tipoDocumento === "Factura";
  
  return (
    <div 
      onClick={() => onSelect(item)}
      className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl mb-3 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group cursor-pointer"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border 
          ${isFactura 
            ? 'bg-[#fdfcff] border-[#f3e8ff] text-[#9333ea]' 
            : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
          {isFactura ? <FileText className="w-5 h-5" /> : <ReceiptText className="w-5 h-5" />}
        </div>
        
        {/* Detail */}
        <div>
          <h4 className="font-extrabold text-gray-900 mb-0.5">{item.mesa}</h4>
          <p className="text-xs font-semibold text-gray-400">
            {item.cantPlatos} platos <span className="mx-1">·</span> 
            <span className={isFactura ? 'text-[#9333ea]' : 'text-emerald-600'}>{item.tipoDocumento}</span> 
            <span className="mx-1">·</span> 
            <span className="text-gray-600">{item.cliente}</span> 
            <span className="mx-1">·</span> 
            Mesero: <span className="text-gray-600">{item.mesero}</span>
          </p>
        </div>
      </div>
      
      {/* Time & Price */}
      <div className="flex flex-col items-end">
        <span className="text-sm font-extrabold text-gray-900">
          S/ {item.total.toFixed(2)}
        </span>
        <span className="text-[10px] text-gray-400 font-bold mt-1">
          {item.hora}
        </span>
      </div>
    </div>
  );
}

interface HistoryListProps {
  grupos: GrupoHistorial[];
  onSelectComprobante: (item: ComprobanteHistorial) => void;
}

export function HistoryList({ grupos, onSelectComprobante }: HistoryListProps) {
  return (
    <div className="flex flex-col gap-6">
      {grupos.map((grupo, idx) => (
        <div key={idx} className="flex flex-col">
          {/* Header Grupo */}
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-100">
            <span className="text-xs font-extrabold text-gray-400">
              {grupo.periodo} • {grupo.rangoHorario}
            </span>
            <span className="text-xs font-black text-[#0D00FF]">
              S/ {grupo.subtotal.toFixed(2)}
            </span>
          </div>

          {/* Cards */}
          <div>
            {grupo.comprobantes.map(comp => (
              <HistoryItem 
                key={comp.id} 
                item={comp} 
                onSelect={onSelectComprobante}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
