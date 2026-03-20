import { Pencil, Trash2 } from "lucide-react";
import type { Insumo } from "../types";

interface TableInventarioProps {
  data: Insumo[];
  onEdit: (insumo: Insumo) => void;
  onDelete: (insumo: Insumo) => void;
}
function TableInventario({ data, onEdit, onDelete }: TableInventarioProps) {
  const statusConfig = {
    0: "bg-emerald-50 text-emerald-700 border-emerald-100", // SUFICIENTE
    1: "bg-red-50 text-red-700 border-red-100", // SIN STOCK
    2: "bg-amber-50 text-amber-700 border-amber-100", // STOCK BAJO
  };

  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-neutral-50 border-b border-neutral-100">
            <tr className="text-neutral-600 font-semibold">
              <th className="px-4 py-3 whitespace-nowrap">NOMBRE</th>
              <th className="px-4 py-3 whitespace-nowrap">CATEGORÍA</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">STOCK</th>
              <th className="px-4 py-3 whitespace-nowrap">U. MEDIDA</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">
                ESTADO
              </th>
              <th className="px-4 py-3 text-right whitespace-nowrap">
                ACCIONES
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100">
            {data.map((insumo) => (
              <tr
                key={insumo.id}
                className="hover:bg-neutral-50/60 transition-colors"
              >
                {/* NOMBRE */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-neutral-800 font-medium">
                    {insumo.nombre}
                  </span>
                </td>

                {/* CATEGORÍA */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-md bg-neutral-100 px-2.5 py-1 text-[11px] font-bold text-neutral-600 uppercase tracking-tight">
                    {insumo.categoria.detalle}
                  </span>
                </td>

                {/* STOCK */}
                <td
                  className={`px-4 py-3 whitespace-nowrap font-bold text-center ${
                    insumo.stock <= 5 ? "text-red-600" : "text-neutral-900"
                  }`}
                >
                  {insumo.stock}
                </td>

                {/* UNIDAD */}
                <td className="px-4 py-3 whitespace-nowrap text-neutral-500">
                  {insumo.unidad}
                </td>

                {/* ESTADO */}
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold ${
                      statusConfig[insumo.estado.id] ||
                      "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {insumo.estado.detalle}
                  </span>
                </td>

                {/* ACCIONES */}
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-1.5">
                    <button
                      onClick={() => onEdit(insumo)}
                      className="p-2 rounded-lg hover:bg-blue-50 transition-colors text-blue-600"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(insumo)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors text-red-500"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableInventario;
