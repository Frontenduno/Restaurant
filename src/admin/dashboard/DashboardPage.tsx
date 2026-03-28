import { LayoutDashboardIcon, ArrowUpRight, Users, Columns2 } from "lucide-react";
import { AdminHeader } from "../components/AdminHeader";
import { StatCard } from "./components/StatCard";
import { WeeklyChartCard } from "./components/WeeklyChartCard";
import { AlertCard } from "./components/AlertCard";
import dashboardDataRaw from "./data/dashboardData.json";
import type { DashboardData } from "./types/dashboard";

const dashboardData = dashboardDataRaw as DashboardData;

export function DashboardPage() {
  const {
    ventasDelDia,
    usuariosActivos,
    ocupacionMesas,
    ventasSemanales,
    alertas,
  } = dashboardData;

  const handleVerStock = () => {
    console.log("Navigating to Stock...");
  };

  const handleVerDetalles = () => {
    console.log("Navigating to Details...");
  };

  return (
    <div className="w-full flex flex-col font-sans">
      {/* Header aligned with the provided design */}
      <AdminHeader title="Dashboard" icon={LayoutDashboardIcon} />

      {/* Main Dashboard Grid */}
      <div className="flex flex-col gap-6">

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Ventas del Dia Card */}
          <StatCard
            title="Ventas del dia"
            value={`$${ventasDelDia.monto.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}`}
            icon={LayoutDashboardIcon} // Using placeholder as the image had a tiny green bill icon
            iconClassName="text-green-500"
          >
            <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-[11px] font-bold">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{ventasDelDia.tendencia.valor}%</span>
              <span className="font-medium text-green-700/70">
                {ventasDelDia.tendencia.texto}
              </span>
            </div>
          </StatCard>

          {/* Usuarios Activos Card */}
          <StatCard
            title="Usuarios activos"
            value={
              <div className="flex items-baseline gap-2">
                <span>{usuariosActivos.enTurno}</span>
                <span className="text-[14px] text-gray-400 font-bold tracking-widest uppercase pb-1">en turno</span>
              </div>
            }
            icon={Users}
            iconClassName="text-blue-500"
          >
            <div className="flex -space-x-2">
              {usuariosActivos.avatares.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="Avatar"
                  className="w-7 h-7 rounded-full border-2 border-white bg-blue-100"
                />
              ))}
              <div className="w-7 h-7 rounded-full border-2 border-white bg-teal-600 flex items-center justify-center text-[9px] font-bold text-white z-10">
                +{usuariosActivos.usuariosExtra}
              </div>
            </div>
          </StatCard>

          {/* Ocupacion de Mesas Card */}
          <StatCard
            title="Ocupación de mesas"
            value={
              <div className="flex items-baseline gap-2">
                <span>{ocupacionMesas.ocupadas}</span>
                <span className="text-gray-400 font-medium">/ {ocupacionMesas.total}</span>
                <span className="text-[14px] text-gray-400 font-bold tracking-widest uppercase pb-1">disponibles</span>
              </div>
            }
            icon={Columns2}
            iconClassName="text-blue-500"
          >
            <div className="w-full flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2eb7a1] rounded-full"
                  style={{ width: `${ocupacionMesas.porcentaje}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-gray-500">
                {ocupacionMesas.porcentaje}%
              </span>
            </div>
          </StatCard>
        </div>

        {/* Bottom Row: Chart and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Chart takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <WeeklyChartCard data={ventasSemanales} />
          </div>

          {/* Alerts take up 1 column on large screens */}
          <div className="flex flex-col gap-6 lg:mt-6">
            <div className="flex-1">
              <AlertCard
                title="Alerta de Stock"
                value={alertas.stockBajo}
                variant="danger"
                buttonText="Ver Stock"
                onClick={handleVerStock}
              />
            </div>
            <div className="flex-1">
              <AlertCard
                title="Platillos sin Stock"
                value={alertas.sinStock}
                variant="warning"
                buttonText="Ver Detalles"
                onClick={handleVerDetalles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
