import { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";

export function TimerComanda({ fechaInicio }: { fechaInicio: string }) {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const calcularDiferencia = () => {
      const inicio = new Date(fechaInicio).getTime();
      const ahora = new Date().getTime();
      setSegundos(Math.floor((ahora - inicio) / 1000));
    };

    calcularDiferencia();
    const intervalo = setInterval(calcularDiferencia, 1000);

    return () => clearInterval(intervalo);
  }, [fechaInicio]);

  const minutos = Math.floor(segundos / 60);
  const segRestantes = segundos % 60;
  const tiempoFormateado = `${minutos}:${segRestantes.toString().padStart(2, "0")}`;

  // 0 a 10 minutos Normal
  // 10 a 15 minutos Advertencia
  // Más de 15 minutos Retrasado
  let estilo: "normal" | "advertencia" | "retrasado" = "normal";
  if (minutos >= 15) estilo = "retrasado";
  else if (minutos >= 10) estilo = "advertencia";

  const config = {
    normal: { text: "text-green-500", label: "TRANSCURRIDO", Icon: Clock },
    advertencia: { text: "text-orange-500", label: "RIESGO", Icon: Clock },
    retrasado: {
      text: "text-red-500",
      label: "RETRASADO",
      Icon: AlertTriangle,
    },
  };

  const { text, label, Icon } = config[estilo];

  return (
    <div
      className={`flex flex-col items-end ${text} transition-colors duration-500`}
    >
      <div className="flex items-center gap-1.5 font-black text-xl tracking-tighter">
        <Icon size={18} className="stroke-[3]" />
        <span>{tiempoFormateado}</span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider leading-none">
        {label}
      </span>
    </div>
  );
}
