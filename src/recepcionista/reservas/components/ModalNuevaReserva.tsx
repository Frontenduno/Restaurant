import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HOY, HORAS, sugerirMesas } from "../utils/reservasUtils";
import type { Mesa } from "@/types";

interface ModalNuevaReservaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: any;
  setForm: any;
  errores: any;
  mesasDisponibles: Mesa[];
  getMesas: (ids: any) => Mesa[];
  onGuardar: () => void;
}

export function ModalNuevaReserva({
  open, onOpenChange, form, setForm, errores, mesasDisponibles, getMesas, onGuardar
}: ModalNuevaReservaProps) {
  const [advertencia, setAdvertencia] = useState("");

  const campo = (key: string, label: string, tipo = "text", placeholder = "") => (
    <div className="flex flex-col gap-1.5 pt-2">
      <label className="text-xs font-semibold text-gray-700 tracking-wide">
        {label}
      </label>
      <input
        type={tipo}
        value={form[key]}
        placeholder={placeholder}
        min={tipo === "number" ? 1 : undefined}
        onChange={e => setForm((p: any) => ({ ...p, [key]: e.target.value }))}
        className={`px-3 py-2 rounded-lg text-sm transition-colors outline-none border-[1.5px] ${
            errores[key] ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-gray-200 bg-gray-50 focus:border-indigo-500'
        } text-gray-900`}
      />
      {errores[key] && <span className="text-[11px] text-red-500">{errores[key]}</span>}
    </div>
  );

  const mesasFiltradas = form.area === "Todas" || !form.area 
    ? mesasDisponibles 
    : mesasDisponibles.filter(m => m.location?.detalle === form.area);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md bg-white p-6 sm:p-7 rounded-[24px] border-none shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
        <DialogHeader className="mb-4">
            <DialogTitle className="m-0 text-[18px] font-bold text-gray-900 leading-tight">
              Nueva Reserva
            </DialogTitle>
            <p className="m-0 mt-1 text-[12px] text-gray-500 capitalize">
              {HOY}
            </p>
        </DialogHeader>

        {/* Sección cliente */}
        <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">Datos del cliente</div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {campo("nombre",   "Nombre",   "text", "Ej. María")}
          {campo("apellido", "Apellido", "text", "Ej. Torres")}
        </div>
        
        {/* personas con auto-sugerencia */}
        <div className="flex flex-col gap-1.5 pt-1 mb-5">
          <label className="text-xs font-semibold text-gray-700 tracking-wide">
            Número de personas
          </label>
          <input
            type="number" min={1} value={form.personas}
            placeholder="Ej. 6"
            onChange={e => {
              const val = e.target.value;
              const disponibles = mesasFiltradas.filter(m => m.status.detalle === "disponible");
              const sugeridas = val ? sugerirMesas(val, disponibles).map(m => m.id) : [];
              setForm((p: any) => ({ ...p, personas: val, mesas: sugeridas }));
              if (val && sugeridas.length === 0) {
                setAdvertencia(`No hay combinación de mesas disponibles en "${form.area}" para ${val} personas.`);
              } else {
                setAdvertencia("");
              }
            }}
            className={`px-3 py-2 rounded-lg text-sm transition-colors outline-none border-[1.5px] ${
              errores.personas ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-gray-200 bg-gray-50 focus:border-indigo-500'
            } text-gray-900`}
          />
          {errores.personas && <span className="text-[11px] text-red-500">{errores.personas}</span>}
        </div>


        {/* Área selector */}
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-xs font-semibold text-gray-700 tracking-wide">
            Área preferida
          </label>
          <Select 
            value={form.area || "Todas"} 
            onValueChange={(val) => {
              setForm((p: any) => ({ ...p, area: val || "Todas", mesas: [] }));
              setAdvertencia("");
            }}
          >
            <SelectTrigger className="w-full bg-white shadow-sm border-gray-200 h-9">
              <SelectValue placeholder="Seleccionar un área" />
            </SelectTrigger>
            <SelectContent>
              {["Todas", "Interior", "Ventana", "Terraza"].map(area => (
                <SelectItem key={area} value={area}>
                  {area === "Todas" ? "Todas las áreas" : area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mesa selector — chips con auto-sugerencia */}
        <div className="flex flex-col gap-2 mb-5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-gray-700 tracking-wide">
              Mesa(s) asignada(s)
            </label>
            {form.personas && (
              <span className="text-[11px] text-[#0D00FF] font-bold cursor-pointer hover:underline"
                onClick={() => {
                  const disponibles = mesasFiltradas.filter(m => m.status.detalle === "disponible");
                  const sugeridas = sugerirMesas(form.personas, disponibles);
                  if (sugeridas.length === 0) {
                    setAdvertencia(`No hay combinación de mesas disponibles en "${form.area}" para ${form.personas} personas.`);
                  } else {
                    setAdvertencia("");
                    setForm((p: any) => ({ ...p, mesas: sugeridas.map(m => m.id) }));
                  }
                }}>
                ✨ Auto-sugerir
              </span>
            )}
          </div>
          {form.mesas.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-xs text-green-700 font-semibold shadow-sm">
              {form.mesas.length > 1 ? "🔗 Mesas combinadas: " : "🪑 Mesa: "}
              {getMesas(form.mesas).map(m => `${m.name} (${m.capacity}p)`).join(" + ")}
              {" "}= {getMesas(form.mesas).reduce((s, m) => s + m.capacity, 0)} asientos
            </div>
          )}
          <div className="flex flex-wrap gap-2 mt-1 max-h-[140px] overflow-y-auto pr-1">
            {mesasFiltradas.length > 0 ? mesasFiltradas.map(m => {
              const sel = form.mesas.includes(m.id);
              const ocupada = m.status.detalle === "ocupado";
              const reservada = m.status.detalle === "reservado";
              const bloqueada = ocupada || reservada;
              return (
                <div
                  key={m.id}
                  onClick={() => {
                    if (bloqueada) return;
                    const nuevas = sel ? form.mesas.filter((id: number) => id !== m.id) : [...form.mesas, m.id];
                    setForm((p: any) => ({ ...p, mesas: nuevas }));
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border-[1.5px] transition-all cursor-pointer ${
                    bloqueada ? (ocupada ? 'border-blue-500 bg-blue-50 text-blue-700 cursor-not-allowed' : 'border-amber-500 bg-amber-50 text-amber-700 cursor-not-allowed') :
                    sel ? 'bg-indigo-50 border-[#0D00FF] text-[#0D00FF] shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:bg-slate-50'
                  }`}
                >
                  {m.name} <span className="opacity-60 text-[10px] ml-0.5 font-medium">·{m.capacity}p</span>
                  {ocupada && <span className="ml-1 text-blue-600">🚫</span>}
                  {reservada && <span className="ml-1 text-orange-600">🚫</span>}
                </div>
              );
            }) : (
              <span className="text-xs text-gray-400 italic">No hay mesas en esta área.</span>
            )}
          </div>
          {advertencia && <span className="text-[11px] text-amber-600 font-bold mt-1 block">{advertencia}</span>}
          {errores.mesas && <span className="text-[11px] text-red-500 mt-1">{errores.mesas}</span>}
        </div>

        {/* Hora selector — franjas de turno */}
        <div className="flex flex-col gap-3 mb-8">
          <label className="text-xs font-semibold text-gray-700 tracking-wide">
            Hora del servicio
          </label>
          {[
            { label: "☀️ Mañana",  rango: [8,  12], color: "text-amber-500 border-amber-500 bg-amber-500", bgActive: "bg-amber-50", borderActive: "border-amber-300" },
            { label: "🌤 Tarde",   rango: [12, 18], color: "text-sky-500 border-sky-500 bg-sky-500", bgActive: "bg-sky-50", borderActive: "border-sky-300" },
            { label: "🌙 Noche",   rango: [18, 22], color: "text-indigo-500 border-indigo-500 bg-indigo-500", bgActive: "bg-indigo-50", borderActive: "border-indigo-300" },
          ].map(turno => {
            const horasTurno = HORAS.filter(h => {
              const hr = parseInt(h.split(":")[0]);
              return hr >= turno.rango[0] && hr < turno.rango[1];
            });
            const tieneSeleccion = horasTurno.includes(form.hora);
            
            return (
              <div key={turno.label} className={`
                border-[1.5px] rounded-xl overflow-hidden transition-colors
                ${tieneSeleccion ? turno.borderActive : "border-gray-200"}
              `}>
                {/* Cabecera del turno */}
                <div className={`
                  px-3 py-2 flex items-center justify-between border-b transition-colors
                  ${tieneSeleccion ? `${turno.bgActive} border-b-black/5` : "bg-gray-50 border-gray-100"}
                `}>
                  <span className={`text-[11px] font-bold ${tieneSeleccion ? turno.color.split(' ')[0] : "text-gray-500"}`}>
                    {turno.label}
                  </span>
                  {tieneSeleccion && (
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white border ${turno.borderActive} ${turno.color.split(' ')[0]}`}>
                      {form.hora}
                    </span>
                  )}
                </div>
                {/* Horas del turno */}
                <div className="p-2.5 flex flex-wrap gap-1.5 bg-white">
                  {horasTurno.map(h => {
                    const sel = form.hora === h;
                    return (
                      <button key={h}
                        onClick={() => setForm((p: any) => ({ ...p, hora: h }))}
                        className={`
                          px-2.5 py-1.5 rounded-md text-[11px] font-bold border-[1.5px] transition-all hover:-translate-y-0.5 hover:shadow-sm
                          ${sel ? `text-white ${turno.color.split(' ')[2]} border-transparent shadow` : `bg-white border-gray-200 text-gray-600 hover:border-gray-300`}
                        `}
                      >{h}</button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {errores.hora && <span className="text-[11px] text-red-500">{errores.hora}</span>}
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button 
            onClick={() => onOpenChange(false)} 
            className="flex-1 py-3 border-[1.5px] border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl text-gray-700 font-bold text-sm transition-colors"
            >
            Cancelar
          </button>
          <button 
            onClick={onGuardar} 
            className="flex-2 py-3 border-none bg-[#0D00FF] hover:bg-blue-800 rounded-xl text-white font-bold text-sm transition-colors shadow-lg shadow-blue-500/20"
            >
            ✓ Confirmar Reserva
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
