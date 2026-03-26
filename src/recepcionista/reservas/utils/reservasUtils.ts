/**
 * Utilidades para la gestión de reservas del recepcionista.
 * Incluye datos estáticos, lógica de sugerencia de mesas y avatar de usuario.
 */
import type { Mesa } from "@/types";

/**
 * Fecha actual en formato largo localizado para Perú (es-PE).
 * Ejemplo: "jueves, 26 de marzo de 2026".
 */
export const HOY = new Date().toLocaleDateString("es-PE", {
  weekday: "long", year: "numeric", month: "long", day: "numeric",
});

/**
 * Horario disponible en bloques de 30 minutos entre 08:00 y 22:00.
 * Se usa para construir selectores de hora en reservaciones.
 */
export const HORAS = Array.from({ length: 29 }, (_, i) => {
  const totalMin = 8 * 60 + i * 30;
  const h = String(Math.floor(totalMin / 60)).padStart(2, "0");
  const m = totalMin % 60 === 0 ? "00" : "30";
  return `${h}:${m}`;
}); // 08:00 → 22:00

/**
 * Mapea cada estado de reserva a estilos CSS para la UI.
 *  - confirmada: verde
 *  - pendiente: ámbar
 */
export const ESTADO_STYLES: Record<string, { bg: string, color: string, border: string, label: string }> = {
  confirmada: { bg: "bg-green-50", color: "text-green-600", border: "border-green-200", label: "Confirmada" },
  pendiente:  { bg: "bg-amber-50", color: "text-amber-600", border: "border-amber-200", label: "Pendiente"  },
};

/**
 * sugerirMesas
 *
 * Genera una propuesta de mesas para atender el número de personas solicitado.
 * Buscamos una combinación de mesas disponibles que
 * 1) cubra el número de personas (sumatoria de capacidad >= requerido)
 * 2) minimice el overflow (menos capacidad sobrante)
 * 3) minimice la cantidad de mesas usadas (menos mesas en empate)
 *
 * @param personas - cantidad de personas solicitadas como string (desde un input)
 * @param mesasDisponibles - lista de mesas con propiedades de disponibilidad y capacidad
 * @returns array de mesas sugeridas (puede estar vacío)
 */
export function sugerirMesas(personas: string, mesasDisponibles: Mesa[]) {
  const n = parseInt(personas);
  if (!n || n < 1) return [];

  // Filtrar solo mesas marcadas como disponibles
  const disponibles = mesasDisponibles.filter(m => m.status.detalle === "disponible");
  if (disponibles.length === 0) return [];

  // Ordenar de menor a mayor capacidad para probar combinaciones pequeñas primero
  const sorted = [...disponibles].sort((a, b) => a.capacity - b.capacity);

  let mejor: Mesa[] = [];
  let mejorTotal = Number.POSITIVE_INFINITY;

  const total = sorted.length;
  const maxMask = 1 << total; // cada bit representa si la mesa i está en la combinación

  // Requiere O(2^n) evaluación de subsets; aceptable para n pequeño (número de mesas disponibles)
  for (let mask = 1; mask < maxMask; mask++) {
    const subset: Mesa[] = [];
    let sum = 0;

    for (let i = 0; i < total; i++) {
      if ((mask >> i) & 1) {
        subset.push(sorted[i]);
        sum += sorted[i].capacity;
      }
    }

    // Validar que la combinación cubra a todos los invitados
    if (sum >= n) {
      // Seleccionar la combinación más eficiente según restricciones definidas
      if (sum < mejorTotal || (sum === mejorTotal && subset.length < mejor.length)) {
        mejor = subset;
        mejorTotal = sum;
      }
    }
  }

  return mejor;
}

/**
 * getInitialAvatar
 *
 * Genera datos para avatar de usuario a partir del nombre.
 * - initials: dos primeras letras de nombre y apellido
 * - hue: valor de color calculado para consistencia visual
 * - size: tamaño del avatar (default 36px)
 */
export function getInitialAvatar(nombre: string, size: number = 36) {
  const initials = nombre.split(" ").slice(0,2).map(n => n[0]).join("").toUpperCase();
  const hue = (nombre.charCodeAt(0) * 37 + nombre.charCodeAt(1) * 17) % 360;
  return { initials, hue, size };
}
