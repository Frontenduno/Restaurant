import { FileX } from "lucide-react";
import type { ChartPanelProps, RecentOrder } from "../types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { donutData } from "../lib/data";
import reportesData from "../data/reportes.json";

export function EmptyChart({ title }: ChartPanelProps) {
  return (
    <div className="flex-1 bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col min-h-[280px]">
      <h3 className="text-[13px] font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400">
        <FileX className="w-10 h-10 opacity-30" />
        <span className="text-sm font-medium">Vacío</span>
      </div>
    </div>
  );
}

export function DonutChartPanel({ title }: ChartPanelProps) {
  return (
    <div className="flex-1 bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col min-h-[280px]">
      <h3 className="text-[13px] font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="flex-1 flex items-center justify-center">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
            >
              {donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                typeof value === "number"
                  ? [`S/. ${value.toFixed(2)}`, ""]
                  : [String(value), ""]
              }
            />
            <Legend
              iconType="circle"
              iconSize={10}
              wrapperStyle={{ fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const DAYS_ORDER = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const JS_DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const WEEK_ORDER = ["1a Sem", "2a Sem", "3a Sem", "4a Sem", "Última Sem"];

function parseLocal(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function getRangeLabel(from: string, to: string): string {
  if (!from || !to) return "";
  const fmt = (d: string) => {
    const [y, m, day] = d.split("-");
    return `${day}/${m}/${y}`;
  };
  return `${fmt(from)} – ${fmt(to)}`;
}

function getDaysBetween(from: string, to: string): number {
  return Math.round(
    (parseLocal(to).getTime() - parseLocal(from).getTime()) / 86_400_000
  );
}

function salesForDay(dayName: string): number {
  return reportesData.ventasPorDiaSemana.find((v) => v.dia === dayName)?.ventas ?? 0;
}

function getFilteredBarData(from: string, to: string) {
  if (!from || !to)
    return reportesData.ingresosPorMes.map((m) => ({ label: m.mes, ventas: m.ingresos }));

  const days = getDaysBetween(from, to);
  if (days <= 7) {
    const cur = parseLocal(from);
    const end = parseLocal(to);
    const daySet = new Set<string>();
    while (cur <= end) {
      daySet.add(JS_DAYS[cur.getDay()]);
      cur.setDate(cur.getDate() + 1);
    }
    return DAYS_ORDER
      .filter((d) => daySet.has(d))
      .map((d) => ({ label: d.slice(0, 3), ventas: salesForDay(d) }));
  }

  if (days <= 31) {
    const weekSales: Record<string, number> = {
      "1a Sem": 0,
      "2a Sem": 0,
      "3a Sem": 0,
      "4a Sem": 0,
      "Última Sem": 0,
    };
    const usedWeeks = new Set<string>();
    const cur = parseLocal(from);
    const end = parseLocal(to);
    while (cur <= end) {
      const dom = cur.getDate();
      const week =
        dom <= 7 ? "1a Sem" :
          dom <= 14 ? "2a Sem" :
            dom <= 21 ? "3a Sem" :
              dom <= 28 ? "4a Sem" :
                "Última Sem";
      weekSales[week] += salesForDay(JS_DAYS[cur.getDay()]);
      usedWeeks.add(week);
      cur.setDate(cur.getDate() + 1);
    }
    return WEEK_ORDER
      .filter((w) => usedWeeks.has(w))
      .map((w) => ({ label: w, ventas: weekSales[w] }));
  }

  const fromDate = parseLocal(from);
  const toDate = parseLocal(to);
  const fromMonth = fromDate.getMonth();
  const toMonth = toDate.getMonth();
  const fromYear = fromDate.getFullYear();
  const toYear = toDate.getFullYear();

  return reportesData.ingresosPorMes
    .filter((_m, idx) =>
      fromYear === toYear ? idx >= fromMonth && idx <= toMonth : true
    )
    .map((m) => ({ label: m.mes, ventas: m.ingresos }));
}


export function BarChartPanel({ title, from = "", to = "" }: ChartPanelProps) {
  const data = getFilteredBarData(from, to);
  const rangeLabel = getRangeLabel(from, to);

  return (
    <div className="flex-1 bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col min-h-[280px]">
      <div className="flex items-start justify-between mb-4 gap-2">
        <h3 className="text-[13px] font-semibold text-gray-700">{title}</h3>
        {rangeLabel && (
          <span className="text-[11px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
            {rangeLabel}
          </span>
        )}
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={data}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#EF4444" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) =>
                v >= 1000 ? `S/ ${(v / 1000).toFixed(0)}k` : `S/ ${v}`
              }
            />
            <Tooltip
              formatter={(value) =>
                typeof value === "number"
                  ? [`S/ ${value.toLocaleString("es-PE")}`, "Ventas"]
                  : [String(value), "Ventas"]
              }
              cursor={{ fill: "rgba(239,68,68,0.06)" }}
            />
            <Bar dataKey="ventas" radius={[4, 4, 0, 0]} fill="url(#barGradient)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


interface OrdersPanelProps extends ChartPanelProps {
  orders: RecentOrder[];
}

export function OrdersPanel({ title, orders }: OrdersPanelProps) {
  return (
    <div className="flex-1 bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col min-h-[280px]">
      <h3 className="text-[13px] font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                <FileX className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-800">
                  Pedido #{order.id}
                </p>
                <p className="text-[11px] text-gray-400">
                  Mesa {order.mesa} • {order.hora}
                </p>
              </div>
            </div>
            <span className="text-[13px] font-semibold text-gray-700">
              S/ {order.total.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
