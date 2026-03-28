import { Search, User, X } from "lucide-react";
import { useState, useMemo } from "react";
import type { user } from "../../../types";

interface TransferirModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransferir: (cocineroId: number) => void;
}

const COMPAÑEROS_RECIENTES: user[] = [
  { id_usuario: 1, nombre: "Chef Alberto García", rol: "Cocinero" },
  { id_usuario: 2, nombre: "Elena Beltrán", rol: "Cocinero" },
  { id_usuario: 3, nombre: "Marcos Ruiz", rol: "Cocinero" },
  { id_usuario: 4, nombre: "Sofía Méndez", rol: "Cocinero" },
];

export default function TransferirModal({
  isOpen,
  onClose,
  onTransferir,
}: TransferirModalProps) {
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [searchTerm, setSearchTerm] = useState(""); // 1. Estado para el buscador

  const compañerosFiltrados = useMemo(() => {
    return COMPAÑEROS_RECIENTES.filter((companero) =>
      companero.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-6 mx-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Transferir Comanda
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>
        <p className="text-slate-500 text-sm mb-6">
          Selecciona un compañero para delegar la preparación de esta orden.
        </p>

        {/* Buscador */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar compañero cocinero..."
            value={searchTerm} // 3. Controlamos el input
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
          />
        </div>

        {/* Lista de Compañeros */}
        <div className="space-y-3 mb-8">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">
            {searchTerm ? "Resultados de búsqueda" : "Compañeros Recientes"}
          </h3>

          <div className="max-h-[300px] overflow-y-auto pr-1 space-y-3">
            {compañerosFiltrados.length > 0 ? (
              compañerosFiltrados.map((chef) => (
                <div
                  key={chef.id_usuario}
                  onClick={() => setSelectedId(chef.id_usuario)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedId === chef.id_usuario
                      ? "border-blue-500 bg-blue-50/30"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">
                        {chef.nombre}
                      </h4>
                      <p className="text-sm text-slate-400 font-medium">
                        {chef.rol}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedId === chef.id_usuario
                        ? "border-blue-500"
                        : "border-slate-200"
                    }`}
                  >
                    {selectedId === chef.id_usuario && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              // 4. Estado vacío si no hay resultados
              <div className="text-center py-8">
                <p className="text-slate-400 font-medium">
                  No se encontraron cocineros
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Acciones */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            className="py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all active:scale-95"
          >
            CANCELAR
          </button>
          <button
            onClick={() => selectedId && onTransferir(selectedId)}
            disabled={!selectedId}
            className="py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            TRANSFERIR
          </button>
        </div>
      </div>
    </div>
  );
}
