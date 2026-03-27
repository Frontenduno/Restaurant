import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import type { IngresoHora } from "../types";

interface IncomeChartProps {
  data: IngresoHora[];
}

const chartConfig = {
  monto: {
    label: "Ingresos (S/)",
    color: "#3b35ff",
  },
} satisfies ChartConfig;

export function IncomeChart({ data }: IncomeChartProps) {
  // Format the data for the chart component
  const chartData = data.map(entry => ({
    hora: `${entry.hora}h`,
    monto: entry.monto
  }));

  return (
    <Card className="rounded-xl border-gray-100 shadow-sm p-6 mb-6">
      <div className="flex flex-col items-center justify-center mb-6">
        <h3 className="text-sm font-bold text-gray-900">Ingresos por hora</h3>
        <p className="text-[10px] text-gray-400 font-medium">Ventas del día de hoy</p>
      </div>

      <ChartContainer config={chartConfig} className="w-full h-56 max-w-4xl mx-auto">
        <BarChart 
          accessibilityLayer 
          data={chartData} 
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="hora"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tick={{ fill: '#9ca3af', fontSize: 11 }}
          />
          <ChartTooltip
            cursor={{ fill: 'rgba(59, 53, 255, 0.05)' }}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar 
            dataKey="monto" 
            fill="var(--color-monto)" 
            radius={[4, 4, 0, 0]} 
            activeBar={{ fill: '#0D00FF' }}
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}

