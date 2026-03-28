/**
 * Componente de cabecera para las páginas del mesero.
 * Muestra el título de la página con un ícono y un botón de notificaciones.
 */

import { Bell, type LucideIcon } from "lucide-react";

// Props del componente MeserHeader
interface MeserHeaderProps {
  title: string; // Título a mostrar en la cabecera
  icon: LucideIcon; // Ícono de Lucide a mostrar junto al título
}

/**
 * Componente funcional que renderiza la cabecera del mesero.
 * Incluye el título, ícono y un botón de campana para notificaciones.
 */
export function MeserHeader({ title, icon: Icon }: MeserHeaderProps) {
  return (
    <div className="bg-white rounded-[1rem] shadow-sm p-4 px-6 flex items-center justify-between border border-gray-100 mb-6">
      {/* Sección izquierda: ícono y título */}
      <div className="flex items-center gap-3">
        <Icon className="w-6 h-6 text-black" />
        <h1 className="text-2xl font-bold text-black">{title}</h1>
      </div>
      {/* Botón de notificaciones en la derecha */}
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
        <Bell className="w-6 h-6 text-black" />
      </button>
    </div>
  );
}
