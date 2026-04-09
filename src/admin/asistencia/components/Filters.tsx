import React from "react";

interface FiltersProps {
  activeStatus: string;
  onStatusChange: (status: string) => void;
  onRoleChange: (role: string) => void;
  onDateChange: (date: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  activeStatus,
  onStatusChange,
  onRoleChange,
  onDateChange,
}) => {
  // Definimos los colores por estado
  const statusConfig: Record<string, string> = {
    Todos: "active:bg-slate-900 active:text-white bg-slate-900 text-white",
    Presente:
      "active:bg-emerald-100 active:text-emerald-700 bg-emerald-50 text-emerald-600",
    Tardanza:
      "active:bg-amber-100 active:text-amber-700 bg-amber-50 text-amber-600",
    Ausente: "active:bg-rose-100 active:text-rose-700 bg-rose-50 text-rose-600",
  };

  const statusOptions = ["Todos", "Presente", "Tardanza", "Ausente"];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
      {/* Botones de Estado con colores dinámicos */}
      <div className="flex gap-2">
        {statusOptions.map((status) => {
          const isActive = activeStatus === status;
          return (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${
                isActive
                  ? statusConfig[status]
                  : "bg-white text-slate-400 hover:bg-slate-50"
              }`}
            >
              {status}
            </button>
          );
        })}
      </div>

      {/* Inputs de Fecha y Rol */}
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Filtrar por
        </span>

        {/* Filtro de Fecha */}
        <input
          type="date"
          onChange={(e) => onDateChange(e.target.value)}
          className="bg-white border-none rounded-2xl px-4 py-2 text-xs font-bold text-slate-500 shadow-sm focus:ring-2 focus:ring-slate-100 outline-none cursor-pointer"
        />

        {/* Filtro de Roles */}
        <select
          onChange={(e) => onRoleChange(e.target.value)}
          className="bg-white border-none rounded-2xl px-4 py-2 text-xs font-bold text-slate-500 shadow-sm focus:ring-2 focus:ring-slate-100 outline-none min-w-[160px] cursor-pointer"
        >
          <option value="Todos">Todos los Roles</option>
          <option value="Cocinero">Cocinero</option>
          <option value="Mesero">Mesero</option>
          <option value="Cajero">Cajero</option>
          <option value="Recepcionista">Recepcionista</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
