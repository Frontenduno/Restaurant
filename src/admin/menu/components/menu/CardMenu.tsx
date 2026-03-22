import { Pencil } from "lucide-react";
import type { Menu } from "@/admin/menu/types";

interface CardMenuProps {
    item: Menu;
    onEdit: (item: Menu) => void;
}
const BADGE_COLORS = [
    { bg: "#FEE2E2", text: "#991B1B" },
    { bg: "#DBEAFE", text: "#1E3A8A" },
    { bg: "#D1FAE5", text: "#065F46" },
    { bg: "#FEF3C7", text: "#92400E" },
    { bg: "#E0E7FF", text: "#3730A3" },
    { bg: "#FCE7F3", text: "#9D174D" },
    { bg: "#CCFBF1", text: "#134E4A" },
    { bg: "#F3E8FF", text: "#6B21A8" },
];

export function CardMenu({ item, onEdit }: CardMenuProps) {
    return (
        <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col transition-shadow hover:shadow-[0_4px_20px_rgb(0,0,0,0.1)]">
            <div className="relative h-44 overflow-hidden">
                <img
                    src={item.imagen_url || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop"}
                    alt={item.nombre}
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={() => onEdit(item)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center shadow-md transition-colors cursor-pointer"
                    aria-label={`Editar ${item.nombre}`}
                >
                    <Pencil className="w-4 h-4 text-white" />
                </button>
            </div>

            <div className="p-4 flex flex-col flex-1 gap-2">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-[15px] text-gray-900 leading-tight">
                        {item.nombre}
                    </h3>
                    <div className="flex flex-col items-end gap-1.5 mt-0.5">
                        <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                            {item.categoria.detalle}
                        </span>
                    </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {item.descripcion}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-1">
                    {item.ingredientes.slice(0, 6).map((ing, idx) => {
                        const color = BADGE_COLORS[idx % BADGE_COLORS.length];
                        return (
                            <span
                                key={ing.id}
                                className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                                style={{ backgroundColor: color.bg, color: color.text }}
                            >
                                {ing.nombre}
                            </span>
                        );
                    })}
                </div>

                <div className="mt-auto pt-2 flex justify-between">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${item.estado
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                        }`}>
                        {item.estado ? 'Activo' : 'Inactivo'}
                    </span>
                    <span className="text-base font-bold text-gray-800">
                        $ {item.precio.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}
