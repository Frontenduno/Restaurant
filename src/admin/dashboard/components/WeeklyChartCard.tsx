import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";

interface WeeklyChartCardProps {
  data: {
    ventas: Array<{ dia: string; monto: number }>;
    platillos: Array<{ dia: string; cantidad: number }>;
  };
}

export function WeeklyChartCard({ data }: WeeklyChartCardProps) {
  const [activeTab, setActiveTab] = useState<"ventas" | "platillos">("ventas");

  const chartData = activeTab === "ventas" ? data.ventas : data.platillos;

  // Custom coloring based on the exact design mock: gradient-like varying blue/teal to dark blue
  const colors = [
    "#2eb7a1", // LUN
    "#3498db", // MAR
    "#29a1b3", // MIER
    "#3498db", // JUE
    "#3aa4c5", // VIER
    "#222e44", // SAB
    "#222e44", // DOM
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col h-full mt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h3 className="text-[13px] font-bold text-gray-800 uppercase tracking-widest leading-none">
            Ventas de la semana
          </h3>
          <p className="text-[11px] text-gray-400 mt-1">
            Comparativa de ingresos diarios
          </p>
        </div>

        {/* Custom Toggle matching the exact design */}
        <div className="flex bg-white rounded-full p-1 border border-gray-200 mt-4 sm:mt-0">
          <button
            onClick={() => setActiveTab("ventas")}
            className={cn(
              "px-5 py-1.5 rounded-full text-sm font-semibold transition-colors",
              activeTab === "ventas"
                ? "bg-blue-500 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            Ventas
          </button>
          <div className="w-px bg-gray-200 my-2 mx-1 hidden sm:block"></div>
          <button
            onClick={() => setActiveTab("platillos")}
            className={cn(
              "px-5 py-1.5 rounded-full text-sm font-semibold transition-colors",
              activeTab === "platillos"
                ? "bg-blue-500 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            Platillos
          </button>
        </div>
      </div>

      <div className="flex-1 w-full min-h-75">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData as any}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            barSize={24}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F3F4F6"
            />
            <XAxis
              dataKey="dia"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#9CA3AF", fontWeight: 700 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#9CA3AF" }}
              tickFormatter={(value) => (value >= 1000 ? `${value / 1000}K` : value)}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            />
            <Bar
              dataKey={activeTab === "ventas" ? "monto" : "cantidad"}
              radius={[12, 12, 12, 12]}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
