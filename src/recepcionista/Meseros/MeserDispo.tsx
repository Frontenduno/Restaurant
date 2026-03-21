import { RecepHeader } from "../components/RecepHeader";
import { UserSearch } from "lucide-react";
import { useMesas } from "../pages/hooks/useMesas";
import usersData from "@/data/usuario/users.json";

export function MeserDispo() {
    const { mesas } = useMesas();
    
    // Obtener los meseros reales de users.json
    const meserosDb = usersData.filter(u => u.rol.nombre === "Mesero");

    // Computar las mesas que están a cargo de cada mesero (buscando meseroId en las mesas)
    const meseros = meserosDb.map(mesero => {
        const mesasDelMesero = mesas.filter((m: any) => m.meseroId === mesero.id && m.status.detalle === "ocupado");
        const mesasIds = mesasDelMesero.map((m: any) => m.id);

        return {
            ...mesero,
            mesas: mesasIds,
            mesasObjetos: mesasDelMesero
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