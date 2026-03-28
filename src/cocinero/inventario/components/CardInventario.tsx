import type { Menu } from "../../types/index";

interface CardInventarioProps {
  item: Menu;
  onOpenModal: () => void;
}

function CardInventario({ item, onOpenModal }: CardInventarioProps) {
  const stockActual = (item as any).stock ?? 22;

  const sinStock = stockActual === 0;
  const esStockBajo = stockActual > 0 && stockActual <= 10;

  const getBadgeStyles = () => {
    if (sinStock) return "bg-red-50 text-red-600";
    if (esStockBajo) return "bg-orange-50 text-orange-600";
    return "bg-emerald-50 text-emerald-600";
  };

  const getBadgeLabel = () => {
    if (sinStock) return "Agotado";
    if (esStockBajo) return "Stock Bajo";
    return "En Stock";
  };

  return (
    <div
      onClick={() => onOpenModal()}
      className="w-[280px] bg-white rounded-[32px] shadow-md border border-slate-100 overflow-hidden flex flex-col transition-all hover:shadow-xl group cursor-pointer"
    >
      {/* Contenedor de Imagen */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.imagen_url}
          alt={item.nombre}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            sinStock ? "grayscale opacity-60" : ""
          }`}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            {item.categoria.detalle}
          </span>
        </div>
      </div>

      {/* Contenido de la Card */}
      <div className="p-5 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
            {item.tipo.detalle}
          </span>

          {/* Badge de Stock Dinámico */}
          <div
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-colors ${getBadgeStyles()}`}
          >
            {getBadgeLabel()}
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-slate-500 text-sm font-bold">
            Stock:{" "}
            <span className={sinStock ? "text-red-600" : "text-slate-700"}>
              {stockActual}uds
            </span>
          </span>
          <h3 className="text-slate-900 text-xl font-extrabold leading-tight mt-1">
            {item.nombre}
          </h3>
        </div>

        {/* Precio */}
        <div className="mt-2 flex items-center">
          <span className="text-blue-600 text-2xl font-black">
            ${item.precio.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CardInventario;
