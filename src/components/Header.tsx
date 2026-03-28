import { isValidElement, useState } from "react";
import { Bell, type LucideIcon } from "lucide-react";
import type { ReactNode, ComponentType } from "react";
import { NotificacionesPanel } from "./notificaciones/NotificacionesPanel";

// You can extend these props according to specific structural needs but keep it general
export interface HeaderProps {
  title: string;
  icon: LucideIcon | ReactNode | ComponentType<any>;
  // This helps simulating per-user notifications, default to 'admin123' if we don't know
  usuarioId?: string; 
}

export function Header({ title, icon: IconOrNode, usuarioId = "admin123" }: HeaderProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const renderIcon = () => {
    if (isValidElement(IconOrNode)) {
      return IconOrNode;
    }
    const Icon = IconOrNode as ComponentType<any>;
    return <Icon className="w-6 h-6 text-black" />;
  };

  return (
    <>
      <div className="bg-white rounded-[1rem] shadow-sm p-4 px-6 flex items-center justify-between border border-gray-100 mb-6 shrink-0 w-full">
        <div className="flex items-center gap-3">
          {renderIcon()}
          <h1 className="text-2xl font-bold text-black">{title}</h1>
        </div>
        
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          aria-label="Abrir notificaciones"
        >
          <Bell className="w-6 h-6 text-black" />
          {/* Example static badge if there were unread - the panel handles real count */}
          <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>

      <NotificacionesPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
        usuarioId={usuarioId} 
      />
    </>
  );
}
