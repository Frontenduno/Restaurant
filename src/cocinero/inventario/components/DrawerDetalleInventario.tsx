import { useState, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import type { Menu } from "../../types/index";

interface DrawerDetalleInventarioProps {
  isOpen: boolean;
  onClose: () => void;
  item: Menu | null;
  onActualizar: (id: number, nuevoStock: number) => void;
}

function DrawerDetalleInventario({
  isOpen,
  onClose,
  item,
  onActualizar,
}: DrawerDetalleInventarioProps) {
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (item && isOpen) {
      setStock((item as any).stock ?? 22);
    }
  }, [item, isOpen]);

  if (!item) return null;

  const sinStock = !item.estado || stock === 0;
  const stockBajo = !sinStock && stock > 0 && stock <= 5;

  const configBadges = {
    stockBg: sinStock
      ? "bg-red-50"
      : stockBajo
        ? "bg-orange-50"
        : "bg-emerald-50",
    stockText: sinStock
      ? "text-red-600"
      : stockBajo
        ? "text-orange-600"
        : "text-emerald-600",
    stockLabel: sinStock ? "Agotado" : stockBajo ? "Stock Bajo" : "En Stock",
  };

  // Función para manejar el guardado
  const handleAceptar = () => {
    onActualizar(item.id, stock);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity z-50 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out font-sans flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Detalle del Producto
          </h1>
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <div className="w-full aspect-[16/10] overflow-hidden rounded-[32px] border border-slate-100">
            <img
              src={item.imagen_url}
              alt={item.nombre}
              className={`w-full h-full object-cover ${sinStock ? "grayscale opacity-70" : ""}`}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-tighter ${configBadges.stockBg} ${configBadges.stockText}`}
              >
                {configBadges.stockLabel}
              </span>
              <span className="px-3 py-1 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                {item.tipo.detalle}
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-slate-900 text-[26px] font-extrabold leading-tight">
                {item.nombre}
              </h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {item.descripcion}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-[28px] p-6 border border-slate-100">
            <h3 className="text-slate-900/90 text-[13px] font-bold uppercase tracking-widest text-center mb-5">
              Ajustar Inventario
            </h3>
            <div className="flex justify-center items-center gap-6">
              <button
                onClick={() => setStock((prev) => Math.max(0, prev - 1))}
                className="w-16 h-16 flex justify-center items-center bg-white border border-slate-200 rounded-full text-slate-500 hover:text-slate-800"
              >
                <Minus className="w-7 h-7" strokeWidth={2.5} />
              </button>

              <div className="text-center min-w-[100px]">
                <span className="text-slate-950 text-6xl font-black tabular-nums">
                  {stock}
                </span>
                <span className="block text-slate-400/90 text-xs font-bold uppercase tracking-wider mt-1.5">
                  Unidades
                </span>
              </div>

              <button
                onClick={() => setStock((prev) => prev + 1)}
                className="w-16 h-16 flex justify-center items-center bg-white border border-slate-200 rounded-full text-slate-500 hover:text-slate-800"
              >
                <Plus className="w-7 h-7" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-white">
          <button
            onClick={handleAceptar} // Ahora llama a la función de actualización
            className="w-full py-4.5 bg-blue-600 hover:bg-blue-700 transition-colors rounded-3xl text-white text-lg font-black uppercase tracking-widest shadow-md shadow-blue-200 active:scale-[0.98]"
          >
            Aceptar
          </button>
        </div>
      </div>
    </>
  );
}

export default DrawerDetalleInventario;
