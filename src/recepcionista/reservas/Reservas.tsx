import { BookSearch, Search, Clock, Users, Plus } from "lucide-react";
import { Header } from "@/components/Header";
import { useMesas } from "../pages/hooks/useMesas";
import { useReservas } from "./hooks/useReservas";
import { HOY, ESTADO_STYLES } from "./utils/reservasUtils";
import { Avatar } from "./components/Avatar";
import { DetalleReserva } from "./components/DetalleReserva";
import { ModalNuevaReserva } from "./components/ModalNuevaReserva";

/*
  =====================================================
  PÁGINA DE RESERVAS — Gestión de reservas del día
  =====================================================
  
  PROPÓSITO:
  Centraliza toda la lógica de reservas para el recepcionista:
  - Ver reservas pendientes agrupadas por horario (Mañana, Mediodía, Noche)
  - Crear nuevas reservas
  - Ver detalles: mesas asignadas, capacidad total, etc.
  - Confirmar llegada o cancelar reservas
  
  DATOS:
  - MESAS_DISPONIBLES: Obtenidas del hook useMesas (sincronizadas con localStorage)
  - reservas: Obtenidas del hook useReservas (sincronizadas con localStorage)
  
  FLUJO DE CAMBIOS:
  1. Usuario crea/confirma/cancela reserva en DetalleReserva
  2. useReservas actualiza estado y localStorage
  3. Los cambios se sincronizan automáticamente en UI
  4. Si cancela/confirma una reserva, MeserDispo se entera si cambian mesas
*/

export function Reservas() {
  // CAMBIO: useMesas ahora trae datos de localStorage
  // Esto sincroniza automáticamente cambios de RecepcionistaPage (ocupar mesa + mesero)
  const { mesas: MESAS_DISPONIBLES, actions: mesaActions } = useMesas();
  
  // Hook de reservas: gestiona estado, validación, persistencia en localStorage
  const {
    reservas,
    totalReservas,
    seleccionada,
    setSeleccionada,
    modalAbierto,
    setModalAbierto,
    form,
    setForm,
    errores,
    notif,
    busqueda,
    setBusqueda,
    getMesas,
    actions
  } = useReservas(MESAS_DISPONIBLES, mesaActions.updateMesa);

  return (
    <div className="w-full flex flex-col font-sans h-screen overflow-hidden bg-slate-50">
      <Header title="Reservas" icon={BookSearch} usuarioId="recep123" />
      
      <div className="flex flex-col flex-1 overflow-hidden px-2 pt-4">
        {/* TOPBAR RESERVAS */}
        <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between flex-wrap gap-4 shrink-0 shadow-sm mx-1 mb-3">
          <div>
            <h1 className="m-0 text-[20px] font-bold text-gray-900 leading-tight">
              Reservas de hoy
            </h1>
            <p className="m-0 mt-1 text-xs text-gray-500 capitalize">
              {HOY}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Buscador */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                placeholder="Buscar cliente..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-lg text-xs border-[1.5px] border-gray-200 bg-slate-50 outline-none w-48 text-gray-900 focus:border-indigo-500 transition-colors"
              />
            </div>
            {/* Contador */}
            <div className="bg-blue-50 text-blue-700 rounded-lg px-3 py-1.5 text-xs font-bold leading-none flex items-center h-full border border-blue-100 min-h-[35px]">
              {totalReservas} reservas
            </div>
            {/* Botón agregar */}
            <button 
                onClick={actions.abrirModal} 
                className="bg-[#0D00FF] hover:bg-blue-800 text-white border-none rounded-lg px-4 py-2 text-sm font-bold cursor-pointer flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Agregar
            </button>
          </div>
        </div>

        {/* LAYOUT: LISTA + PANEL LATERAL */}
        <div className="flex flex-1 overflow-hidden mb-2 gap-3 mx-1">

          {/* LISTA DE CARDS */}
          <div className={`
              ${seleccionada ? 'w-[360px] border-r border-gray-200 pr-3' : 'flex-1'} 
              overflow-y-auto flex flex-col gap-2 transition-all duration-300 ease-in-out bg-transparent
          `}>
            {/* Agrupado por franja horaria */}
            {["Mañana (08:00–12:00)", "Mediodía (12:00–16:00)", "Noche (18:00–22:00)"].map(franja => {
              let desde = 0, hasta = 24;
              if (franja.includes("Mañana")) { desde = 8; hasta = 12; }
              else if (franja.includes("Mediodía")) { desde = 12; hasta = 16; }
              else if (franja.includes("Noche")) { desde = 18; hasta = 22; }
              
              const grupo = reservas.filter((r: any) => {
                const h = parseInt(r.hora.split(":")[0]);
                return h >= desde && h < hasta;
              });
              if (grupo.length === 0) return null;
              return (
                <div key={franja} className="mb-2">
                  <div className="text-[11px] font-bold text-gray-500 tracking-wider uppercase px-1 py-2">
                    {franja}
                  </div>
                  {grupo.map((r: any) => {
                    const est = ESTADO_STYLES[r.estado] || ESTADO_STYLES.pendiente;
                    const activa = seleccionada?.id === r.id;
                    return (
                      <div key={r.id}
                        onClick={() => setSeleccionada(activa ? null : r)}
                        className={`
                          group rounded-xl p-3 cursor-pointer mb-2 transition-all duration-200 flex items-center gap-3 shadow-sm hover:shadow
                          ${activa ? 'bg-blue-50 border-[1.5px] border-blue-300' : 'bg-white border-[1.5px] border-gray-200 hover:border-indigo-200'}
                        `}
                      >
                        <Avatar nombre={r.nombre} size={36} />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-[13.5px] text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
                              {r.nombre}
                          </div>
                          <div className="flex items-center gap-2.5 mt-1.5 flex-wrap">
                            <span className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                              <Clock className="w-3.5 h-3.5" /> {r.hora}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                              <Users className="w-3.5 h-3.5" /> {r.personas}
                            </span>
                          </div>
                        </div>
                        <span className={`
                            px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 border
                            ${est.bg} ${est.color} ${est.border}
                        `}>
                            {est.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {reservas.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center p-10 text-gray-400">
                <BookSearch className="w-12 h-12 mb-3 text-gray-300" />
                <p className="mt-2 text-[13px] font-medium">
                  {busqueda ? "No se encontraron resultados" : "No hay reservas para hoy"}
                </p>
              </div>
            )}
          </div>

          {/* PANEL LATERAL DERECHO — DETALLE */}
          {seleccionada && (
            <DetalleReserva 
              reserva={seleccionada}
              mesas={getMesas(seleccionada.mesas)}
              onClose={() => setSeleccionada(null)}
              onCancel={actions.cancelarReserva}
              onConfirmar={actions.confirmarReserva}
            />
          )}
        </div>
      </div>

      {/* MODAL AGREGAR RESERVA */}
      <ModalNuevaReserva 
        open={modalAbierto}
        onOpenChange={setModalAbierto}
        form={form}
        setForm={setForm}
        errores={errores}
        mesasDisponibles={MESAS_DISPONIBLES}
        getMesas={getMesas}
        onGuardar={actions.guardar}
      />

      {/* TOAST */}
      {notif && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-5 py-3 rounded-xl text-[13px] font-bold shadow-2xl z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 flex items-center gap-2">
          {notif}
        </div>
      )}
    </div>
  );
}
