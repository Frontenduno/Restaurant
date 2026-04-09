import React from "react";
import { UserCheck, ClockAlert, UserRoundX } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  variant: "success" | "warning" | "danger";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subValue,
  variant,
}) => {
  // Configuración de estilos según la variante
  const styles = {
    success: {
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      subColor: "text-emerald-600",
      icon: UserCheck,
    },
    warning: {
      bg: "bg-amber-50",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      subColor: "text-amber-600",
      icon: ClockAlert,
    },
    danger: {
      bg: "bg-rose-50",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      subColor: "text-rose-600",
      icon: UserRoundX,
    },
  };

  const currentStyle = styles[variant];

  return (
    <div className="flex items-center p-6 bg-white border border-gray-100 rounded-3xl shadow-sm min-w-[300px]">
      {/* Icono dinámico */}
      <div
        className={`flex items-center justify-center w-16 h-16 rounded-2xl ${currentStyle.iconBg}`}
      >
        <currentStyle.icon className={`w-8 h-8 ${currentStyle.iconColor}`} />
      </div>

      <div className="ml-6">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-4xl font-bold text-slate-800 my-1">{value}</h3>
        {subValue && (
          <p className={`text-sm font-semibold ${currentStyle.subColor}`}>
            {subValue}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
