import { RecepHeader } from "../components/RecepHeader";
import { UserSearch } from "lucide-react";
import { useMesas } from "../pages/hooks/useMesas";
import usersData from "@/data/usuario/users.json";

/*
  ============================================
  SINCRONIZACIÓN DE MESAS Y MESEROS
  ============================================
  
  FLUJO DE DATOS:
  1. En RecepcionistaPage: Usuario ocupa una mesa y selecciona un mesero
  2. updateMesa() actualiza estado de la mesa: { status.detalle: "ocupado", meseroId: XXX }
  3. useEffect en useMesas.ts guarda cambios en localStorage
  4. Cuando navegas a MeserDispo, useMesas() carga datos desde localStorage
  5. MeserDispo filtra mesas donde (meseroId === mesero.id && status.detalle === "ocupado")
  6. Resultado: El mesero aparece como "Ocupado" con sus mesas asignadas
  
  IMPORTANTE: 
  - Ambas páginas usan el MISMO hook (useMesas)
  - localStorage actúa como la fuente de verdad entre navegaciones
  - Si no usáramos localStorage, los cambios se perderían al navegar
*/

export function MeserDispo() {
    // IMPORTANTE: Este hook usa el MISMO estado que RecepcionistaPage
    // Carga las mesas y reservas desde localStorage, incluyendo cambios guardados allá
    const { mesas, reservas } = useMesas();
    
    // Obtener los meseros reales de users.json (lista base de todos los meseros del sistema)
    const meserosDb = usersData.filter(u => u.rol.nombre === "Mesero");

    // Computar las mesas OCUPADAS que están a cargo de cada mesero
    // FILTRO: Buscamos mesas que cumplan DOS condiciones:
    //  1. m.meseroId === mesero.id -> La mesa está asignada a este mesero (se guardó en RecepcionistaPage)
    //  2. m.status.detalle === "ocupado" -> La mesa está en estado ocupado (minúsculas, como en JSON)
    // Esto asegura sincronización: cambios en RecepcionistaPage se reflejan aquí porque usan el mismo hook
    const meseros = meserosDb.map(mesero => {
        const mesasDelMesero = mesas.filter((m: any) =>
            m.meseroId === mesero.id &&
            (m.status.detalle === "ocupado" || m.status.detalle === "reservado")
        );

        const mesasDeReservas = reservas
            .filter((r: any) => r.meseroId === mesero.id && r.estado === "confirmada")
            .flatMap((r: any) => r.mesas)
            .map((mesaId: number) => mesas.find((m: any) => m.id === mesaId))
            .filter(Boolean) as any[];

        const mesasUnicas = Array.from(new Map([...mesasDelMesero, ...mesasDeReservas].map(m => [m.id, m])).values());
        const mesasIds = mesasUnicas.map((m: any) => m.id);

        return {
            ...mesero,
            mesas: mesasIds,
            mesasObjetos: mesasUnicas
        };
    });

    return (
        <div className="w-full flex flex-col gap-6 font-sans pb-10">
            <RecepHeader title="Meseros" icon={UserSearch} />
            <div className="px-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                        <h2 className="text-[28px] font-semibold text-gray-800 leading-tight">Meseros</h2>
                        <p className="text-[15px] mt-1 text-gray-500">Asignación de mesas por mesero</p>
                    </div>
                </div>
                
                <div className="flex flex-col gap-4 mt-2">
                    {meseros.map(mesero => {
                        return (
                            <div key={mesero.id} className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm">
                                {/* Cabecera del Módulo del Mesero */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0D00FF] flex items-center justify-center font-bold text-sm shrink-0">
                                        {mesero.nombre.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-[15px] text-gray-900">{mesero.nombre} {mesero.apellido}</div>
                                        <div className="text-xs text-gray-500">
                                            {mesero.mesas.length} mesa(s) atendiendo · Área: {mesero.area?.nombre || 'General'}
                                        </div>
                                    </div>
                                    <div className="ml-auto">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            mesero.mesas.length === 0 ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-700"
                                        }`}>
                                            {mesero.mesas.length === 0 ? "Disponible" : `Ocupado (${mesero.mesas.length} mesa${mesero.mesas.length > 1 ? 's' : ''})`}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Lista de mesas al cuidado de este mesero */}
                                {mesero.mesasObjetos && mesero.mesasObjetos.length > 0 ? (
                                    <div className="flex gap-2 flex-wrap mt-2">
                                        {mesero.mesasObjetos.map((m: any) => (
                                            <div key={m.id} className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 text-xs text-blue-700 font-medium tracking-tight">
                                                {m.name} · {m.capacity} pers.
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-xs text-gray-400 italic mt-2">
                                        Sin mesas asignadas actualmente
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>   
        </div>
    );
}