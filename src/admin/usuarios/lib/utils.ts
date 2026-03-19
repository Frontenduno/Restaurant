import { roleBadgeClasses } from "./config";

// Convierte un número en formato moneda sin decimales (Ej: 1500 -> $1,500).
export function formatCurrency(amount: number) {
  return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}
// Agrega ceros a la izquierda a un número para presentarlo como ID (Ej: 1 -> 001).
export function formatId(id: number) {
  return `#${String(id).padStart(3, "0")}`;
}
// Busca el color (clases CSS) correspondiente al rol. Si no existe, devuelve gris por defecto.
export function getRoleBadgeClass(roleName: string) {
  return roleBadgeClasses[roleName] ?? "bg-neutral-100 text-neutral-700";
}
// Pone las comas de separación de miles a la hora de visualizar el sueldo en el formulario.
export function formatSueldoDisplay(value: number | undefined) {
  if (value === undefined) return "";
  return value.toLocaleString("en-US");
}
// Limpia el texto que el usuario escribe en la casilla de sueldo (quita letras u otros signos)
// dejando internamente solo el número real.
export function parseSueldoInput(raw: string): number | undefined {
  const normalized = raw.replace(/[^0-9.]/g, "");
  if (normalized.trim() === "") return undefined;
  const n = Number(normalized);
  if (Number.isNaN(n)) return undefined;
  return n;
}
// Toma el nombre completo ingresado en el formulario y lo separa.
// Considera la primera palabra como 'nombre' y el resto como 'apellido'.
export function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return {
    nombre: parts[0] ?? "",
    apellido: parts.slice(1).join(" "),
  };
}

