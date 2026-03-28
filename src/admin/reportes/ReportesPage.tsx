import {
  BarChart3Icon,
  Bell,
  TrendingUp,
  Users,
  LayoutDashboard,
  ArrowUpRight,
  FileDown,
  CalendarRange,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "../dashboard/components/StatCard";
import { FilterDrawer } from "./components/FilterDrawer";
import { EmptyChart, DonutChartPanel, BarChartPanel, OrdersPanel } from "./components/Charts";
import { useReportesFiltro } from "./hooks/useReportes";
import { recentOrders } from "./lib/data";
import type { FilterMode } from "./types";
import reportesData from "./data/reportes.json";

const LABEL_TO_CHART_TITLE: Record<string, string> = {
  "Esta semana (Lun-Dom)": "Ventas de Esta Semana",
  "Últimos 7 días":        "Ventas de los Últimos 7 Días",
  "Este mes":              "Ventas de Este Mes",
  "Últimos 30 días":       "Ventas de los Últimos 30 Días",
};

const ORDERS_TITLE_DEFAULT = "Ventas del [Día/Rango seleccionado]";
const CHART_TITLE_DEFAULT  = "Ventas del [Día/Rango seleccionado]";

export function ReportesPage() {
  const { drawerOpen, setDrawerOpen, appliedMode, appliedFrom, appliedTo, appliedLabel, handleApply } = useReportesFiltro();

  const chartTitle = (() => {
    if (!appliedMode) return CHART_TITLE_DEFAULT;
    if (appliedMode === "exact") return "Ventas del Día seleccionado";
    return LABEL_TO_CHART_TITLE[appliedLabel] ?? "Ventas por Rango personalizado";
  })();

  const ordersTitle = appliedMode ? "Ventas del Rango seleccionado" : ORDERS_TITLE_DEFAULT;

  function onApply(mode: FilterMode, from: string, to: string, label: string) {
    handleApply(mode, from, to, label);
  }

  return (
    <>
      <div className="w-full flex flex-col gap-6 font-sans">
        <div className="w-full bg-white rounded-[1rem] shadow-sm p-4 px-6 flex items-center justify-between border border-gray-100">
          <div className="flex items-center gap-3">
            <BarChart3Icon className="w-6 h-6 text-black" />
            <h1 className="text-2xl font-bold text-black">Reportes</h1>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-6 h-6 text-black" />
          </button>
        </div>

        <div className="px-2 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-[28px] font-semibold text-gray-800 leading-tight">
                Reportes y Estadísticas
              </h2>
              <p className="text-[15px] mt-1 text-gray-500">
                Análisis detallado de ventas y rendimiento.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 h-9 px-4 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
              >
                <FileDown className="w-4 h-4" />
                Exportar PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDrawerOpen(true)}
                className="flex items-center gap-2 h-9 px-4 text-sm font-medium rounded-lg border border-[#1d14e0] bg-[#1d14e0] hover:bg-blue-800 text-white hover:text-white"
              >
                <CalendarRange className="w-4 h-4" />
                Rango de Fechas
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Venta del Día"
              value={`S/. ${reportesData.resumen.ingresosTotalesDia.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`}
              icon={TrendingUp}
              iconClassName="text-green-500"
            >
              <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-[11px] font-bold">
                <ArrowUpRight className="w-3 h-3" />
                <span>+12.4%</span>
                <span className="font-medium text-green-700/70">vs ayer</span>
              </div>
            </StatCard>

            <StatCard
              title="Clientes Atendidos"
              value={`${reportesData.resumen.clientesAtendidosDia}`}
              icon={Users}
              iconClassName="text-blue-500"
            >
              <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-[11px] font-bold">
                <ArrowUpRight className="w-3 h-3" />
                <span>+5.0%</span>
                <span className="font-medium text-green-700/70">vs ayer</span>
              </div>
            </StatCard>

            <StatCard
              title="Ventas por Mes"
              value={`S/. ${reportesData.resumen.ingresosTotalesMes.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`}
              icon={LayoutDashboard}
              iconClassName="text-indigo-500"
            >
              <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-[11px] font-bold">
                <ArrowUpRight className="w-3 h-3" />
                <span>+22.5%</span>
                <span className="font-medium text-green-700/70">vs ayer</span>
              </div>
            </StatCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {appliedMode === null ? (
              <>
                <EmptyChart title={chartTitle} />
                <EmptyChart title={ordersTitle} />
              </>
            ) : appliedMode === "exact" ? (
              <>
                <DonutChartPanel title={chartTitle} />
                <OrdersPanel title={ordersTitle} orders={recentOrders} />
              </>
            ) : (
              <>
                <BarChartPanel title={chartTitle} from={appliedFrom} to={appliedTo} />
                <OrdersPanel title={ordersTitle} orders={recentOrders} />
              </>
            )}
          </div>
        </div>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onApply={(mode, from, to, label) => onApply(mode, from, to, label)}
      />
    </>
  );
}