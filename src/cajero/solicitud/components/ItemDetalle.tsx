import type { ItemSolicitud } from "../types/solicitud";

interface ItemDetalleProps {
  item: ItemSolicitud;
}

export function ItemDetalle({ item }: ItemDetalleProps) {
  const totalItem = item.cantidad * item.precioUnitario;

  return (
    <div className="py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">{item.nombre}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-orange-600 font-medium">
              {item.cantidad} × S/ {item.precioUnitario.toFixed(2)}
            </span>
            {item.nota && (
              <span className="text-xs text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
                📝 {item.nota}
              </span>
            )}
          </div>
        </div>
        <p className="text-sm font-bold text-gray-700 ml-4">
          S/ {totalItem.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
