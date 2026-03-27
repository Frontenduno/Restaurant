import { UserRound, Clock, AlertTriangle } from "lucide-react";

interface OrderItem {
  name: string;
  note?: string;
  quantity: number;
}

interface OrderCardProps {
  mesa?: string;
  mesero?: string;
  items?: OrderItem[];
  tiempo?: string;
  estado?: "normal" | "advertencia" | "retrasado";
}

function CardComandaEnCocina({
  mesa = "5",
  mesero = "Juan Pérez",
  items = [
    { name: "Hamburguesa", quantity: 2, note: "Sin cebolla" },
    { name: "Papas Fritas", quantity: 1, note: "Extra crujientes" },
  ],
  tiempo = "00:00",
  estado = "retrasado",
}: OrderCardProps) {
  const config = {
    normal: {
      border: "border-green-500",
      text: "text-green-500",
      label: "TRANSCURRIDO",
      Icon: Clock,
    },
    advertencia: {
      border: "border-orange-500",
      text: "text-orange-500",
      label: "TRANSCURRIDO",
      Icon: Clock,
    },
    retrasado: {
      border: "border-red-500",
      text: "text-red-500",
      label: "RETRASADO",
      Icon: AlertTriangle,
    },
  };

  const { border, text, label, Icon } = config[estado];
  return (
    <div
      className={`w-[350px] bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 ${border} font-sans`}
    >
      <div className="p-5">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div>
            {/* Tamaño Mesa */}
            <h2 className="text-lg font-extrabold text-slate-950 tracking-tight leading-none">
              Mesa {mesa}
            </h2>
            <div className="flex items-center gap-2 text-slate-400 mt-2">
              {/* Icono y Mesero */}
              <UserRound className="w-4 h-4 stroke-[1.5]" />
              <span className="text-sm font-medium">Mesero: {mesero}</span>
            </div>
          </div>

          <div className={`flex flex-col items-end ${text}`}>
            {/* Tiempo */}
            <div className="flex items-center gap-1.5 font-black text-xl tracking-tighter">
              <Icon size={18} className="stroke-[3]" />
              <span>{tiempo}</span>
            </div>
            {/* Label */}
            <span className="text-[10px] font-bold uppercase tracking-wider leading-none">
              {label}
            </span>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-3 mb-6 min-h-[100px]">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-baseline gap-2">
                {/* Texto de productos: text-base font-bold */}
                <span className="text-base font-bold text-slate-800">
                  {item.quantity}x
                </span>
                <span className="text-base font-bold text-slate-800">
                  {item.name}
                </span>
              </div>
              {item.note && (
                /* Nota */
                <span
                  className={`text-xs font-bold ${text} mt-0.5 ml-6 italic`}
                >
                  {item.note}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 px-4 rounded-xl transition duration-150 shadow-md active:scale-[0.95]">
            LISTO
          </button>
          <button className="w-full bg-gray-300 hover:bg-slate-200 text-slate-400 text-sm font-bold py-3 px-4 rounded-xl transition duration-150 active:scale-[0.95]">
            VER DETALLE
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardComandaEnCocina;
