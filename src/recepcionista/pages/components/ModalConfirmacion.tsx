import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import type { Mesa } from "@/types/mesas/mesa";
import { useState, useEffect } from "react";
import usuariosData from "@/data/usuario/users.json";

// Iconos SVG sacados de CardMesa (o similares) para no depender de otros archivos
const TableRoundIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
    <circle cx="12" cy="12" r="5" fill="white" />
    <path d="M12 2v2 M12 20v2 M2 12h2 M20 12h2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4" />
  </svg>
);

const TableRectIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
    <rect x="4" y="8" width="16" height="8" rx="1" fill="white" />
    <path d="M7 8V5a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1v3" />
    <path d="M15 8V5a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1v3" />
    <path d="M7 16v3a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1v-3" />
    <path d="M15 16v3a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1v-3" />
  </svg>
);

// Mapas de colores según estado
const statusThemes: Record<string, { dot: string, text: string, lightBg: string }> = {
  disponible: { dot: "bg-[#10b981]", text: "text-[#10b981]", lightBg: "bg-[#10b981]/15" },
  ocupado: { dot: "bg-blue-500", text: "text-blue-600", lightBg: "bg-blue-100" },
  reservado: { dot: "bg-orange-500", text: "text-orange-600", lightBg: "bg-orange-100" },
  sucio: { dot: "bg-red-500", text: "text-red-600", lightBg: "bg-red-100" }
};

interface ModalConfirmacionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mesa?: Mesa | null;
  onConfirm: (mesa: Mesa, meseroId?: number) => void;
}

export function ModalConfirmacion({ open, onOpenChange, mesa, onConfirm }: ModalConfirmacionProps) {
  const [animOcupar, setAnimOcupar] = useState(false);
  const [meseroSeleccionado, setMeseroSeleccionado] = useState<string>("");

  // Limpiar estados cada vez que se ABRE la ventana 
  // Así evitamos reseteos raros cuando se está cerrando la animación
  useEffect(() => {
    if (open) {
      setMeseroSeleccionado("");
      setAnimOcupar(false);
    }
  }, [open, mesa]);

  if (!mesa) return null;

  // Filtrar meseros (rol Mesero) cuya area asignada coincida con la ubicación (location.detalle) de la mesa seleccionada
  const meserosDisponibles = usuariosData.filter(
    (u) => u.rol.nombre === "Mesero" && u.area.nombre === mesa.location.detalle
  );

  const estadoStr = mesa.status.detalle.toLowerCase();
  const theme = statusThemes[estadoStr] || statusThemes["ocupado"];
  
  // Condición copiada de tu JXS viejo para ver si es clickeable/ocupable
  const esOcupable = estadoStr === "disponible" || estadoStr === "reservado";

  const handleConfirm = () => {
    // Breve explicacion: si es un estado ocupable pero el recepcionista no eligió mesero, no lo dejamos continuar
    if (esOcupable && meserosDisponibles.length > 0 && !meseroSeleccionado) {
      // Usamos el diseño nativo de Notificación para avisar que falta
      toast.warning("Falta acción", { description: "Debes seleccionar un mesero para encargarse de esta mesa." });
      return;
    }

    setAnimOcupar(true);
    
    // Obtenemos el objeto completo del mesero para mostrar su nombre
    const meseroElegido = meserosDisponibles.find(m => m.id.toString() === meseroSeleccionado);
    const meseroIdParaGuardar = meseroElegido ? meseroElegido.id : undefined;

    // Ejecutamos la acción principal con el meseroId
    onConfirm(mesa, meseroIdParaGuardar);
    
    // Mostramos la notificación reproduciendo tu diseño oscuro y centrado en la base
    const meseroNombreExtendido = `${meseroElegido?.nombre} ${meseroElegido?.apellido?.charAt(0)}.`;
    toast(`✅ ${mesa.name} ahora está ocupada. Asignada a ${meseroNombreExtendido}`, { 
      position: "bottom-center",
      className: "!bg-[#111827] !text-white !border-none !rounded-[12px] !font-medium !text-[13px] !shadow-[0_8px_30px_rgba(0,0,0,0.2)] !px-5 !py-3 !w-auto !max-w-none whitespace-nowrap"
    });
    
    // Cerramos el modal inmediatamente
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-100 p-0 overflow-hidden bg-white border-0 rounded-3xl shadow-2xl">
        {/* Cabecera (Botón X) */}
        <div className="flex justify-end p-4 pb-0">
          <DialogTitle className="sr-only">Confirmar ocupación de la {mesa.name}</DialogTitle>
          <button 
            type="button" 
            onClick={() => onOpenChange(false)} 
            className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5 stroke-2" />
          </button>
        </div>

        <div className="p-6 pt-0 flex flex-col items-center">
          {/* Icono Principal (En un circulo) */}
          <div className="flex justify-center mb-4">
            <div className="bg-[#f0f9ff] border-2 border-[#bae6fd] rounded-full w-20 h-20 flex items-center justify-center">
              {mesa.shape.detalle.toLowerCase() === "redonda" ? <TableRoundIcon /> : <TableRectIcon />}
            </div>
          </div>

          <h2 className="text-[22px] font-bold text-[#111827] mb-2">{mesa.name}</h2>
          
          {/* Badge de Estado */}
          <div className="flex justify-center mb-6">
             <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 ${theme.lightBg}`}>
                <span className={`w-2.5 h-2.5 rounded-full ${theme.dot}`} />
                <span className={`text-sm font-bold capitalize ${theme.text}`}>
                   {mesa.status.detalle}
                </span>
             </div>
          </div>

          {/* Caja de Detalles */}
          <div className="bg-[#f8fafc] w-full rounded-2xl p-4 flex flex-col gap-3 mb-6">
            <div className="flex justify-between items-center text-[14px]">
              <span className="text-gray-500 font-medium">Capacidad</span>
              <span className="text-gray-900 font-bold">{mesa.capacity} personas</span>
            </div>
            <div className="flex justify-between items-center text-[14px]">
              <span className="text-gray-500 font-medium">Ubicación</span>
              <span className="text-gray-900 font-bold">{mesa.location.detalle}</span>
            </div>
            <div className="flex justify-between items-center text-[14px]">
              <span className="text-gray-500 font-medium">Estado actual</span>
              <span className="text-gray-900 font-bold capitalize">{mesa.status.detalle}</span>
            </div>
            
            {/* Si está ocupable, mostramos selector de meseros del área */}
            {esOcupable && (
              <div className="border-t border-gray-200 mt-2 pt-3">
                <span className="text-gray-600 font-semibold mb-2 block text-sm">Asignar Mesero de {mesa.location.detalle}</span>
                {meserosDisponibles.length > 0 ? (
                  <Select value={meseroSeleccionado} onValueChange={(val) => setMeseroSeleccionado(val || "")}>
                    <SelectTrigger className="w-full bg-white text-gray-700 h-10 border-gray-200 rounded-lg">
                      <SelectValue placeholder="Selecciona un mesero...">
                        {meseroSeleccionado && meserosDisponibles.find(m => m.id.toString() === meseroSeleccionado)
                          ? `${meserosDisponibles.find(m => m.id.toString() === meseroSeleccionado)?.nombre} ${meserosDisponibles.find(m => m.id.toString() === meseroSeleccionado)?.apellido}`
                          : "Selecciona un mesero..."}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {meserosDisponibles.map((mesero) => (
                        <SelectItem key={mesero.id} value={mesero.id.toString()}>
                          {mesero.nombre} {mesero.apellido}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-sm text-red-500 font-medium">No hay meseros asignados a {mesa.location.detalle}</span>
                )}
              </div>
            )}
          </div>

          {/* Botón Inferior */}
          {esOcupable ? (
            <Button 
                onClick={handleConfirm} 
                disabled={animOcupar}
                className={`w-full h-12 rounded-xl font-bold text-white transition-all text-base disabled:opacity-100 ${animOcupar ? "bg-[#16a34a] hover:bg-green-700" : "bg-[#1d4ed8] hover:bg-blue-800"}`}
            >
              {animOcupar ? "✅ Procesando..." : "▶ OCUPAR MESA"}
            </Button>
          ) : (
            <div className="w-full text-center text-[14px] text-gray-500 bg-[#f3f4f6] rounded-xl py-3 font-medium">
              Esta mesa no está disponible para ocupar
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
