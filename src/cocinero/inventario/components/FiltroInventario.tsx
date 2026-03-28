import { Search } from "lucide-react";

interface FiltroInventarioProps {
  busqueda: string;
  setBusqueda: (val: string) => void;
  categoriaSeleccionada: string;
  setCategoriaSeleccionada: (cat: string) => void;
}

function FiltroInventario({
  busqueda,
  setBusqueda,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
}: FiltroInventarioProps) {
  const categorias = ["Todos", "Platillos", "Bebidas", "Postres"];

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white">
      {/* Barra de Búsqueda */}
      <div className="flex items-center flex-grow max-w-md relative group">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full pl-5 pr-14 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
        <button className="absolute right-2 p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Chips de Categoría */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
              categoriaSeleccionada === cat
                ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FiltroInventario;
