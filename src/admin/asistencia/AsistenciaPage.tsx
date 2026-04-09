import { Header } from "@/components/Header";
import { UserCheck, Calendar } from "lucide-react";
import { useAsistencia } from "./hooks/useAsistencia";
import StatCard from "./components/StatCard";
import Filters from "./components/Filters";
import Table from "./components/Table";

export function AsistenciaPage() {
  const { counts, asistencias, filters, actions, fecha } = useAsistencia();

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-10">
      <Header title="Gestión de Asistencia" icon={UserCheck} />

      <div className="w-full px-6 md:px-10 mt-6 space-y-8">
        {/* Fecha y subtítulo */}
        <div className="flex items-center gap-2 text-slate-500 font-semibold tracking-tight">
          <Calendar size={18} className="text-emerald-600" />
          <span className="capitalize">{fecha || "Hoy"}</span>
        </div>

        {/* Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Presentes"
            value={counts.aTiempo}
            subValue="+2 hoy"
            variant="success"
          />
          <StatCard
            title="Tardanzas"
            value={counts.tardanza}
            subValue="Tolerancia 15min"
            variant="warning"
          />
          <StatCard
            title="Ausentes"
            value={counts.ausente}
            subValue={`${counts.justificadas} justificadas`}
            variant="danger"
          />
        </section>

        {/* Filtros */}
        <div className="space-y-6">
          <div className="w-full">
            <Filters
              activeStatus={filters.status}
              onDateChange={actions.setFilterDate}
              onRoleChange={actions.setFilterRole}
              onStatusChange={actions.setFilterStatus}
            />
          </div>

          {/* Tabla de Asistencia */}
          <div className="w-full bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            <Table data={asistencias} />
          </div>
        </div>
      </div>
    </div>
  );
}
