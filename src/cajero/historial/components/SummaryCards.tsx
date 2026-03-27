import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import type { MetricasHistorial } from "../types";

interface SummaryCardsProps {
  data: MetricasHistorial;
}

export function SummaryCards({ data }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="rounded-xl border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
            Total cobrado hoy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-black text-[#10b981]">
            S/ {data.totalCobrado.toFixed(2)}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">IGV incluido</p>
        </CardContent>
      </Card>

      <Card className="rounded-xl border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
            Pedidos atendidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-black text-[#0f172a]">
            {data.pedidosAtendidos}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">Boletas + Facturas</p>
        </CardContent>
      </Card>

      <Card className="rounded-xl border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
            Monto inicial caja
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-black text-[#f59e0b]">
            S/ {data.montoInicial.toFixed(2)}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">Al abrir turno</p>
        </CardContent>
      </Card>

      <Card className="rounded-xl border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
            Total en caja
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-black text-[#0f172a]">
            S/ {data.totalEnCaja.toFixed(2)}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">Inicial + cobros</p>
        </CardContent>
      </Card>
    </div>
  );
}
