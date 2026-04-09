import React from "react";
import type { Asistencia } from "../types/asistencia";

const Table: React.FC<{ data: Asistencia[] }> = ({ data }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-50">
            <th className="p-6 text-xs font-bold text-slate-400 uppercase">
              Empleado
            </th>
            <th className="p-6 text-xs font-bold text-slate-400 uppercase">
              Rol
            </th>
            <th className="p-6 text-xs font-bold text-slate-400 uppercase">
              Horario
            </th>
            <th className="p-6 text-xs font-bold text-slate-400 uppercase">
              Ingreso
            </th>
            <th className="p-6 text-xs font-bold text-slate-400 uppercase">
              Estado
            </th>
            <th className="p-6 text-xs font-bold text-slate-400 uppercase text-right">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.map((row) => (
            <tr
              key={row.id_asistencia}
              className="hover:bg-slate-50/50 transition-colors"
            >
              <td className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    {/* Aquí iría la imagen del usuario */}
                    <img
                      src={`https://ui-avatars.com/api/?name=${row.user?.nombre}`}
                      alt="avatar"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">
                      {row.user?.nombre}
                    </p>
                    <p className="text-xs text-slate-400">
                      {row.user?.rol.nombre}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-6">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">
                  {row.user?.rol.area.nombre}
                </span>
              </td>
              <td className="p-6 text-sm text-slate-500 font-medium">
                08:00-16:00
              </td>
              <td className="p-6 text-sm font-bold text-slate-800">
                {row.hora_marcada || "--:--"}
              </td>
              <td className="p-6">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 w-fit
                  ${
                    row.estado === "A Tiempo"
                      ? "bg-emerald-50 text-emerald-600"
                      : row.estado === "Tardanza"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-rose-50 text-rose-600"
                  }
                `}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      row.estado === "A Tiempo"
                        ? "bg-emerald-500"
                        : row.estado === "Tardanza"
                          ? "bg-amber-500"
                          : "bg-rose-500"
                    }`}
                  />
                  {row.estado.toUpperCase()}
                </span>
              </td>
              <td className="p-6 text-right text-slate-400">
                {/* Acciones vacías por ahora */}
                ...
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
