import { Search, Calendar, ChevronDown } from "lucide-react";

interface Props {
  onSearchChange: (id: string) => void;
  onEstadoChange: (estado: string) => void;
  onFechaInicioChange: (fecha: string) => void;
  onFechaFinChange: (fecha: string) => void;
}

function FiltroHistorialComanda({
  onSearchChange,
  onEstadoChange,
  onFechaInicioChange,
  onFechaFinChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-6 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
      {/* Buscador por ID */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por id..."
            className="w-56 pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 placeholder:text-slate-400 font-medium"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <button className="p-2.5 bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
          <Search className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Selector de Estado */}
      <div className="flex items-center gap-3">
        <span className="font-extrabold text-slate-900 text-lg">Estado</span>
        <div className="relative group">
          <select
            className="appearance-none bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-[140px]"
            onChange={(e) => onEstadoChange(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Listo">Listo</option>
            <option value="Cancelado">Cancelado</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
        </div>
      </div>

      {/* Selector de Rango de Fechas */}
      <div className="flex items-center gap-3">
        <span className="font-extrabold text-slate-900 text-lg">Fecha</span>

        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
          {/* Fecha Inicio */}
          <div className="relative">
            <input
              type="date"
              className="bg-white border border-slate-200 rounded-xl pl-3 pr-2 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              onChange={(e) => onFechaInicioChange(e.target.value)}
            />
          </div>

          <span className="text-slate-400 font-bold text-sm px-1">al</span>

          {/* Fecha Fin */}
          <div className="relative">
            <input
              type="date"
              className="bg-white border border-slate-200 rounded-xl pl-3 pr-2 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              onChange={(e) => onFechaFinChange(e.target.value)}
            />
          </div>

          <div className="pr-2 pl-1">
            <Calendar className="w-5 h-5 text-slate-900" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FiltroHistorialComanda;
