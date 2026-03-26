import type { Mesa } from "@/types";

export const HOY = new Date().toLocaleDateString("es-PE", {
  weekday: "long", year: "numeric", month: "long", day: "numeric",
});

export const HORAS = Array.from({ length: 29 }, (_, i) => {
  const totalMin = 8 * 60 + i * 30;
  const h = String(Math.floor(totalMin / 60)).padStart(2, "0");
  const m = totalMin % 60 === 0 ? "00" : "30";
  return `${h}:${m}`;
}); // 08:00 → 22:00

export const ESTADO_STYLES: Record<string, { bg: string, color: string, border: string, label: string }> = {
  confirmada: { bg: "bg-green-50", color: "text-green-600", border: "border-green-200", label: "Confirmada" },
  pendiente:  { bg: "bg-amber-50", color: "text-amber-600", border: "border-amber-200", label: "Pendiente"  },
};

// Devuelve la(s) mesa(s) sugeridas para una cantidad de personas
// Busca la mejor combinación de mesas disponibles en el área (minimiza overflow y cantidad de mesas)
export function sugerirMesas(personas: string, mesasDisponibles: Mesa[]) {
  const n = parseInt(personas);
  if (!n || n < 1) return [];

  // Filtrar solo mesas disponibles (status.detalle == "disponible")
  const disponibles = mesasDisponibles.filter(m => m.status.detalle === "disponible");
  if (disponibles.length === 0) return [];

  // Ordenar para facilitar el análisis y la preferencia de mesas más pequeñas primero
  const sorted = [...disponibles].sort((a, b) => a.capacity - b.capacity);

  let mejor: Mesa[] = [];
  let mejorTotal = Number.POSITIVE_INFINITY;

  const total = sorted.length;
  const maxMask = 1 << total;

  for (let mask = 1; mask < maxMask; mask++) {
    const subset: Mesa[] = [];
    let sum = 0;

    for (let i = 0; i < total; i++) {
      if ((mask >> i) & 1) {
        subset.push(sorted[i]);
        sum += sorted[i].capacity;
      }
    }

    if (sum >= n) {
      if (sum < mejorTotal || (sum === mejorTotal && subset.length < mejor.length)) {
        mejor = subset;
        mejorTotal = sum;
      }
    }
  }

  return mejor;
}

export function getInitialAvatar(nombre: string, size: number = 36) {
  const initials = nombre.split(" ").slice(0,2).map(n => n[0]).join("").toUpperCase();
  const hue = (nombre.charCodeAt(0) * 37 + nombre.charCodeAt(1) * 17) % 360;
  return { initials, hue, size };
}
