import { Landmark } from "lucide-react";
import { useCaja } from "../hooks/useCaja";

export function CajaInfo() {
  const { totalCaja } = useCaja();

  return (
    <div className="flex items-center gap-2 bg-amber-50 text-amber-800 rounded-xl px-4 py-2 text-sm font-bold border border-amber-200 shrink-0">
      <Landmark className="w-4 h-4" />
      <span>Caja</span>
      <span className="text-base font-extrabold">S/ {totalCaja.toFixed(2)}</span>
    </div>
  );
}
