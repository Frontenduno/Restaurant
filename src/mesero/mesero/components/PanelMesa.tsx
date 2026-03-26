import { useState, useEffect } from "react";
import { X, Users, MapPin, Circle, UtensilsCrossed, ClipboardList, Timer, CheckCircle, Trash2 } from "lucide-react";
import type { Mesa } from "@/types";
import { ModalMesa } from "./Modalmesa";

const ESTADO_STYLES: Record<string, { label: string; bg: string; color: string; border: string }> = {
  disponible: { label: "Disponible", bg: "bg-green-50", color: "text-green-600", border: "border-green-200" },
  ocupado:    { label: "Ocupado",    bg: "bg-blue-50",  color: "text-blue-600",  border: "border-blue-200"  },
  reservado:  { label: "Reservado",  bg: "bg-orange-50",color: "text-orange-600",border: "border-orange-200"},
  sucio:      { label: "Sucio",      bg: "bg-red-50",   color: "text-red-600",   border: "border-red-200"   },
};

interface PanelMesaProps {
  mesa: Mesa & { cliente?: string; comanda?: any[]; fase?: string; pct?: number; cookStartTime?: number };
  onClose: () => void;
  onStatusChange: (mesaId: number, newState: string) => void;
  onUpdateComanda: (mesaId: number, items: any[]) => void;
  onUpdateFase: (mesaId: number, newFase: string) => void;
  onUpdateProgress: (mesaId: number, pct: number) => void;
}

/* ────────────────────────────────────────────
   Bloque de info de la mesa (siempre visible)
──────────────────────────────────────────── */
function InfoBlock({ mesa, est }: { mesa: Mesa & { cliente?: string }; est: typeof ESTADO_STYLES[string] }) {
  const infoRows: { icon: React.ReactNode; label: string; valor: React.ReactNode }[] = [
    { icon: <UtensilsCrossed className="w-4 h-4 text-gray-400" />, label: "Mesa",      valor: mesa.name },
    { icon: <Users           className="w-4 h-4 text-gray-400" />, label: "Capacidad", valor: `${mesa.capacity} personas` },
    { icon: <MapPin          className="w-4 h-4 text-gray-400" />, label: "Zona",      valor: mesa.location.detalle },
  ];

  if (mesa.cliente) {
    infoRows.push({ icon: <span className="text-[14px]">👤</span>, label: "Cliente", valor: mesa.cliente });
  }

  infoRows.push({
    icon: <Circle className="w-4 h-4 text-gray-400" />,
    label: "Estado",
    valor: (
      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${est.bg} ${est.color} ${est.border}`}>
        {est.label}
      </span>
    )
  });

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
      {infoRows.map(row => (
        <div key={row.label} className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-gray-500 font-medium">
            {row.icon} {row.label}
          </span>
          {typeof row.valor === "string"
            ? <span className="font-bold text-gray-900">{row.valor}</span>
            : row.valor
          }
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   Componente principal
──────────────────────────────────────────── */
export function PanelMesa({ mesa, onClose, onStatusChange, onUpdateComanda, onUpdateFase, onUpdateProgress }: PanelMesaProps) {
  const [faseComanda, setFaseComanda] = useState<any>(mesa.fase || "confirmacion");
  const [progresoCocina, setProgresoCocina] = useState(mesa.pct || 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState<"comanda" | "revisar" | "cancelar" | "precuenta">("comanda");
  const [comandaItems, setComandaItems] = useState<any[]>(mesa.comanda || []);

  const estado = mesa.status.detalle.toLowerCase();
  const est = ESTADO_STYLES[estado] ?? ESTADO_STYLES.disponible;

  // Lógica de progreso realista basada en tiempo (Simulación de cocina)
  useEffect(() => {
    let interval: any;
    
    // TIEMPO DE DEMORA: Por ahora 10 segundos (10,000ms)
    // Cuando el cocinero asigne un tiempo real, este valor (10000) vendrá de la mesa/reserva.
    const TIEMPO_TOTAL_COCINA = 10000; 

    if (faseComanda === "cocina" && mesa.cookStartTime) {
      interval = setInterval(() => {
        const transcurrido = Date.now() - mesa.cookStartTime!;
        const nuevoPct = Math.min(100, Math.floor((transcurrido / TIEMPO_TOTAL_COCINA) * 100));
        
        setProgresoCocina(nuevoPct);
        
        // Sincronizar con el storage para que MeseroPage sepa el progreso actual
        if (nuevoPct > progresoCocina) {
            onUpdateProgress(mesa.id, nuevoPct);
        }

        if (nuevoPct >= 100) {
            clearInterval(interval);
        }
      }, 500); // Actualizamos cada medio segundo para suavidad
    }
    return () => clearInterval(interval);
  }, [faseComanda, mesa.id, mesa.cookStartTime, onUpdateProgress, progresoCocina]);

  // Efecto separado para manejar el paso a "listo" sin error de renderizado
  useEffect(() => {
    // Si el progreso llega al 100%, cambiamos de fase automáticamente.
    // AQUÍ: En el futuro, esto se disparará cuando el cocinero marque "LISTO" manualmente.
    if (faseComanda === "cocina" && progresoCocina >= 100) {
        setFaseComanda("listo");
        onUpdateFase(mesa.id, "listo");
    }
  }, [progresoCocina, faseComanda, mesa.id, onUpdateFase]);

  // Sincronizar comandaItems con los datos de la mesa (cuando cambia la mesa seleccionada)
  useEffect(() => {
    setComandaItems(mesa.comanda || []);
    if (estado === 'ocupado') {
       setFaseComanda(mesa.fase || "confirmacion");
    }
  }, [mesa.id, mesa.comanda, mesa.fase, estado]);

  const handleSaveComanda = (items: any[], newFase?: string) => {
      setComandaItems(items);
      onUpdateComanda(mesa.id, items);
      if (newFase) {
         setFaseComanda(newFase);
         onUpdateFase(mesa.id, newFase);
      }
      setIsModalOpen(false);
      if (estado === "reservado") {
         onStatusChange(mesa.id, "ocupado");
      }
   };

  const totalComanda = comandaItems.reduce((sum, it) => sum + (it.precio * it.cantidad), 0);

  return (
    <>
    <div className="w-[450px] shrink-0 h-full flex flex-col bg-white border-l border-gray-200 overflow-y-auto animate-in slide-in-from-right-6 duration-250">


      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-gray-900">{mesa.name}</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Cuerpo */}
      <div className="flex-1 px-5 py-5 flex flex-col gap-6">
        {/* Info siempre visible */}
        <InfoBlock mesa={mesa} est={est} />

        {/* ── ESTADO: DISPONIBLE ── */}
        {estado === "disponible" && (
           <div className="flex flex-col items-center justify-center py-10 text-gray-400 gap-3">
             <div className="w-14 h-14 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
               <span className="text-2xl">✅</span>
             </div>
             <div className="text-center">
               <p className="text-sm font-semibold text-gray-600">Mesa disponible</p>
               <p className="text-xs text-gray-400 mt-1">No hay ninguna acción pendiente</p>
             </div>
           </div>
        )}

        {/* ── ESTADO: RESERVADO ── */}
        {estado === "reservado" && (
          <div className="flex flex-col gap-4">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-3 items-start">
              <span className="text-xl mt-0.5">📅</span>
              <div>
                <p className="text-sm font-bold text-orange-700">Mesa con reserva</p>
                <p className="text-xs text-orange-500 mt-1">
                  El cliente ha llegado. Crea la comanda para iniciar el servicio.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3 bg-[#0D00FF] hover:bg-blue-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <ClipboardList className="w-4 h-4" />
              Crear nueva comanda
            </button>
          </div>
        )}

        {/* ── ESTADO: OCUPADO ── */}
        {estado === "ocupado" && (
          <div className="flex flex-col gap-5">
            {/* FASE: PENDIENTE O CONFIRMADO */}
            {(faseComanda === "confirmacion" || faseComanda === "confirmado") && (
              <div className="flex flex-col gap-4">
                 <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                        Comanda {faseComanda === "confirmacion" ? "pendiente" : "confirmada"}
                    </p>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-lg border ${
                        faseComanda === "confirmacion" 
                        ? "bg-yellow-100 text-yellow-700 border-yellow-200" 
                        : "bg-green-100 text-green-700 border-green-200"
                    }`}>
                        {faseComanda === "confirmacion" ? "PENDIENTE" : "CONFIRMADO"}
                    </span>
                 </div>

                 <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                    {comandaItems.length > 0 ? (
                       comandaItems.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                             <div>
                                <span className="text-gray-600 block">{it.cantidad}x {it.nombre}</span>
                                {it.nota && <span className="text-[10px] text-orange-500 font-bold">📝 {it.nota}</span>}
                             </div>
                             <span className="font-bold text-gray-900 font-mono">S/ {(it.precio * it.cantidad).toFixed(2)}</span>
                          </div>
                       ))
                    ) : (
                       <div className="py-2 text-center text-gray-400 italic text-xs">Sin platos agregados</div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-300">
                       <span className="font-bold text-gray-500">Total</span>
                       <span className="text-lg font-bold text-[#0D00FF]">S/ {totalComanda.toFixed(2)}</span>
                    </div>
                 </div>

                 {faseComanda === "confirmacion" ? (
                   <>
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                            onClick={() => { setModalView("revisar"); setIsModalOpen(true); }}
                            className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-gray-200 bg-white hover:border-[#3461FF] text-gray-500 transition-all text-xs font-semibold"
                        >
                            <span className="text-xl">👁</span> Revisar con cliente
                        </button>
                        <button 
                            onClick={() => { setModalView("comanda"); setIsModalOpen(true); }}
                            className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-gray-200 bg-white hover:border-[#3461FF] text-gray-500 transition-all text-xs font-semibold"
                        >
                            <span className="text-xl">➕</span> Agregar platos
                        </button>
                    </div>
                    
                    <button 
                        onClick={() => { setModalView("cancelar"); setIsModalOpen(true); }}
                        className="w-full py-3 bg-red-50 text-red-600 hover:bg-red-100 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 border border-red-100"
                    >
                        < Trash2 className="w-4 h-4" /> Cancelar
                    </button>
                   </>
                 ) : (
                    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2">
                        <button 
                            onClick={() => {
                                setFaseComanda("cocina");
                                onUpdateFase(mesa.id, "cocina");
                            }}
                            className="w-full py-4 bg-[#0D00FF] hover:bg-blue-800 text-white font-black text-sm rounded-xl transition-colors shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                        >
                            👨‍🍳 ENVIAR A COCINA
                        </button>
                        <button 
                            onClick={() => { setModalView("cancelar"); setIsModalOpen(true); }}
                            className="w-full py-3 bg-red-50 text-red-600 hover:bg-red-100 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 border border-red-100"
                        >
                            < Trash2 className="w-4 h-4" /> Cancelar comanda
                        </button>
                    </div>
                 )}
              </div>
            )}

            {/* FASE: EN COCINA */}
            {faseComanda === "cocina" && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm relative">
                   <Timer className="w-8 h-8 text-blue-500 animate-pulse" />
                   <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-blue-100" />
                      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-blue-500 transition-all duration-300" strokeDasharray="188.5" strokeDashoffset={188.5 - (188.5 * progresoCocina) / 100} />
                   </svg>
                </div>
                <div>
                   <h3 className="text-blue-900 font-bold text-lg">Enviado a Cocina</h3>
                   <p className="text-blue-600 text-sm mt-1">El chef está preparando el pedido</p>
                </div>
                 <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
                    <div 
                       className="bg-blue-500 h-full transition-all duration-500 ease-linear" 
                       style={{ width: `${progresoCocina}%` }}
                    />
                 </div>
                 <div className="flex justify-between items-center w-full px-1">
                    <span className="text-[10px] text-blue-400 font-bold uppercase tracking-tight">Preparando...</span>
                    {/* CÁLCULO DE SEGUNDOS RESTANTES: (10s - transcurrido) 
                        Cuando esté el chef, el '10' será una variable dinámica de la reserva */}
                    <span className="text-xs font-mono font-bold text-blue-600">
                        {Math.max(0, 10 - Math.floor(progresoCocina / 10))}s restantes
                    </span>
                 </div>
              </div>
            )}

            {/* FASE: LISTO PARA SERVIR / COBRAR */}
            {faseComanda === "listo" && (
              <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-300">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3 items-center">
                   <CheckCircle className="w-6 h-6 text-green-600" />
                   <span className="text-sm font-bold text-green-700">¡Pedido terminado!</span>
                </div>

                <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                   <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between">
                      <span className="text-xs font-bold text-gray-500 uppercase">Resumen de consumo</span>
                      <span className="text-xs font-bold text-gray-400">#0042</span>
                   </div>
                   <div className="p-4 space-y-2">
                       {comandaItems.map((it, idx) => (
                           <div key={idx} className="flex justify-between text-sm">
                             <span className="text-gray-600">{it.nombre} x{it.cantidad}</span>
                             <span className="font-bold font-mono">S/ {(it.precio * it.cantidad).toFixed(2)}</span>
                           </div>
                       ))}
                       <div className="border-t border-dashed border-gray-200 my-2 pt-2 flex justify-between text-lg">
                          <span className="font-bold text-gray-900">Total</span>
                          <span className="font-bold text-[#0D00FF]">S/ {totalComanda.toFixed(2)}</span>
                       </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                   <button 
                     onClick={() => { setModalView("precuenta"); setIsModalOpen(true); }}
                     className="py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm rounded-xl transition-colors"
                   >
                      🧾 Pre-cuenta
                   </button>
                   <button 
                     onClick={() => onStatusChange(mesa.id, "sucio")}
                     className="py-3 px-4 bg-[#0D00FF] hover:bg-blue-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
                   >
                     💰 Finalizar y Cobrar
                   </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── ESTADO: SUCIO ── */}
        {estado === "sucio" && (
          <div className="flex flex-col gap-5">
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex flex-col items-center gap-4 text-center">
               <div className="text-4xl">🧹</div>
               <div>
                  <h3 className="text-red-900 font-bold">Mesa para Limpiar</h3>
                  <p className="text-red-500 text-sm mt-1">El cliente se ha retirado. Se requiere limpieza antes de volver a usar.</p>
               </div>
            </div>
            
            <button 
               onClick={() => {
                 if(confirm("¿La mesa está limpia ya?")) {
                    onStatusChange(mesa.id, "disponible");
                    onClose();
                 }
               }}
               className="w-full py-4 bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 font-black text-base rounded-2xl transition-all flex items-center justify-center gap-3 shadow-sm"
            >
               ✨ ¿MESA LIMPIA? MARCAR DISPONIBLE
            </button>
          </div>
        )}

      </div>
    </div>

    <ModalMesa 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mesaName={mesa.name}
        onSave={handleSaveComanda}
        onCancelComanda={() => onStatusChange(mesa.id, "disponible")}
        initialItems={comandaItems}
        viewMode={modalView}
    />
    </>
  );
}
