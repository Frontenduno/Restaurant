import type { StatusOption } from "../types";

// Cantidad de usuarios que se mostrarán por página en la tabla.
export const PAGE_SIZE = 5;

// Opciones disponibles para el menú desplegable del filtro "Estado".
export const statusOptions: StatusOption[] = [
  { value: "Todos", label: "Todos" },
  { value: "Activo", label: "Activo" },
  { value: "Inactivo", label: "Inactivo" },
];

//Diccionario (Mapa) que asocia el nombre de un rol con las clases CSS de Tailwind
//para darle su color característico en la tabla.
export const roleBadgeClasses: Record<string, string> = {
  Administrador: "bg-blue-50 text-blue-700",
  Cajero: "bg-orange-50 text-orange-700",
  Cocinero: "bg-red-50 text-red-700",
  Mesero: "bg-emerald-50 text-emerald-700",
  Recepcionista: "bg-sky-50 text-sky-700",
};

