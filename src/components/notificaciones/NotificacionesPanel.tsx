import { useState, useMemo } from "react";
import { X, Bell, CheckCircle2, Info, AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import notificacionesData from "@/data/notificaciones.json";
import type { Notificacion, TipoNotificacion } from "@/types/notificacion";

interface NotificacionesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  usuarioId: string; // The ID of the currently logged-in user
}

const getIconForType = (tipo: TipoNotificacion) => {
  switch (tipo) {
    case "success":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "info":
      return <Info className="w-5 h-5 text-blue-500" />;
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case "error":
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-400" />;
  }
};

export function NotificacionesPanel({ isOpen, onClose, usuarioId }: NotificacionesPanelProps) {
  // In a real app, this would be global state (Redux/Zustand) or fetched from an API
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>(notificacionesData as Notificacion[]);

  // Filter notifications for the current user
  const userNotificaciones = useMemo(() => {
    return notificaciones
      .filter((n) => n.usuarioId === usuarioId)
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  }, [notificaciones, usuarioId]);

  const unreadCount = userNotificaciones.filter((n) => !n.leida).length;

  const markAsRead = (id: string) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.usuarioId === usuarioId ? { ...n, leida: true } : n))
    );
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 transition-opacity" 
          onClick={onClose} 
        />
      )}

      {/* Slide-over Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[400px] max-w-[100vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">Notificaciones</h2>
            {unreadCount > 0 && (
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                {unreadCount} nuevas
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Actions */}
        {userNotificaciones.length > 0 && (
          <div className="px-6 py-3 border-b border-gray-50 flex justify-end shrink-0">
            <button
              onClick={markAllAsRead}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Marcar todas como leídas
            </button>
          </div>
        )}

        {/* Notificaciones List */}
        <div className="flex-1 overflow-y-auto w-full p-4">
          {userNotificaciones.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <Bell className="w-12 h-12 text-gray-200 mb-4" />
              <p className="text-gray-500 font-medium">No tienes notificaciones</p>
              <p className="text-gray-400 text-sm mt-1">
                Aquí aparecerán tus alertas y mensajes importantes.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {userNotificaciones.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer relative origin-left",
                    notif.leida
                      ? "bg-white border-gray-100 hover:border-gray-200"
                      : "bg-blue-50/50 border-blue-100 hover:bg-blue-50 shadow-sm"
                  )}
                >
                  {!notif.leida && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  )}
                  <div className="flex gap-3">
                    <div className="mt-0.5 shrink-0">
                      {getIconForType(notif.tipo)}
                    </div>
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className={cn(
                        "text-sm font-semibold mb-1 truncate",
                        notif.leida ? "text-gray-700" : "text-gray-900"
                      )}>
                        {notif.titulo}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {notif.mensaje}
                      </p>
                      <p className="text-xs text-gray-400 mt-2 font-medium">
                        {new Date(notif.fecha).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
