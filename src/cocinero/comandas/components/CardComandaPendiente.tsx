import { UserRound } from "lucide-react";

const statusColors = {
  Pendiente: "bg-blue-100 text-blue-700",
  "En Cocina": "bg-yellow-100 text-yellow-800",
  Listo: "bg-green-100 text-green-700",
};

interface CardComandaPendienteProps {
  mesa?: string;
  estado?: "Pendiente" | "En Cocina" | "Listo";
  idPedido?: string;
  mesero?: string;
  productos?: number;
  bebidas?: number;
  nota?: string;
  onAceptar?: () => void;
  onTransferir?: () => void;
}

function CardComandaPendiente({
  mesa = "5",
  estado = "Pendiente",
  idPedido = "12345",
  mesero = "Juan Pérez",
  productos = 3,
  bebidas = 2,
  nota = "Sin cebolla en la hamburguesa",
  onAceptar,
  onTransferir,
}: CardComandaPendienteProps) {
  const colorEstado = statusColors[estado] || "bg-gray-100 text-gray-700";
  return (
    <div className="w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-slate-300 font-sans">
      <div className="p-5">
        {/* Fila superior: Mesa, Estado e ID */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            {/* Numero de Mesa */}
            <h2 className="text-lg font-extrabold text-slate-950 tracking-tight">
              Mesa {mesa}
            </h2>
            {/* Badge de Estado */}
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${colorEstado}`}
            >
              {estado}
            </span>
          </div>
          {/* ID de pedido*/}
          <span className="text-xs font-bold text-slate-400">{idPedido}</span>
        </div>

        {/* Información del Mesero con Icono */}
        <div className="flex items-center gap-2.5 text-slate-600 mb-6">
          <UserRound className="w-5 h-5 stroke-[1.5]" />
          <span className="text-sm font-medium">Mesero: {mesero}</span>
        </div>

        {/* Resumen de Productos (Bold y Gris Oscuro) */}
        <div className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2">
          <span>{productos} Productos</span>
          <span className="text-slate-400">•</span>
          <span>{bebidas} Bebidas</span>
        </div>

        {/* Nota / Estado Secundario (Itálica y Gris Claro) */}
        {nota && (
          <p className="text-base text-slate-400 italic mb-10">{nota}</p>
        )}

        {/* Botones de Acción */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button
            onClick={onAceptar}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3.5 px-6 rounded-full transition duration-150 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Aceptar
          </button>
          <button
            onClick={onTransferir}
            className="w-full bg-slate-500 hover:bg-slate-600 text-white text-sm font-bold py-3.5 px-6 rounded-full transition duration-150 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Transferir
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardComandaPendiente;
