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
export function sugerirMesas(personas: string, mesasDisponibles: Mesa[]) {
  const n = parseInt(personas);
  if (!n || n < 1) return [];
  // Una sola mesa que alcance
  const simple = mesasDisponibles.find(m => m.capacity >= n);
  if (simple) return [simple];
  // Combinación de dos mesas cuya suma alcance
  for (let i = 0; i < mesasDisponibles.length; i++) {
    for (let j = i + 1; j < mesasDisponibles.length; j++) {
      if (mesasDisponibles[i].capacity + mesasDisponibles[j].capacity >= n)
        return [mesasDisponibles[i], mesasDisponibles[j]];
    }
  }
  return mesasDisponibles.slice(0, 3); // fallback: primeras 3
}

export function getInitialAvatar(nombre: string, size: number = 36) {
  const initials = nombre.split(" ").slice(0,2).map(n => n[0]).join("").toUpperCase();
  const hue = (nombre.charCodeAt(0) * 37 + nombre.charCodeAt(1) * 17) % 360;
  return { initials, hue, size };
}
