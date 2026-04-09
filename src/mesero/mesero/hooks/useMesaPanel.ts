import { useState } from "react";
import type { Mesa } from "@/types";

export function useMesaPanel() {
  const [mesaSeleccionada, setMesaSeleccionada] = useState<Mesa | null>(null);

  const abrirPanel = (mesa: Mesa) => {
    // Si ya está seleccionada, la deselecciona (toggle)
    setMesaSeleccionada(prev => (prev?.id === mesa.id ? null : mesa));
  };

  const cerrarPanel = () => setMesaSeleccionada(null);

  return { mesaSeleccionada, abrirPanel, cerrarPanel };
}
