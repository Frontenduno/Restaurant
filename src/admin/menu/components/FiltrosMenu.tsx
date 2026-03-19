import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterCombobox } from "./FilterCombobox";
import type { Tipo, Categoria, SubCategoria, FiltroMenu } from "../types";

interface FiltrosMenuProps {
    tipos: Tipo[];
    categorias: Categoria[];
    subcategorias: SubCategoria[];
    activeTab: number;
    filtros: FiltroMenu;
    onChangeTab: (tipoId: number) => void;
    onSetFiltro: <K extends keyof FiltroMenu>(key: K, value: FiltroMenu[K]) => void;
    onSearch: (term: string) => void;
    onAgregar: () => void;
}

const ESTADO_OPTIONS = [
    { id: null, detalle: "Todos" },
    { id: 1, detalle: "Activo" },
    { id: 0, detalle: "Inactivo" },
];

export function FiltrosMenu({
    tipos,
    categorias,
    subcategorias,
    activeTab,
    filtros,
    onChangeTab,
    onSetFiltro,
    onSearch,
    onAgregar,
}: FiltrosMenuProps) {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchValue);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100 p-5 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
                <form onSubmit={handleSearchSubmit} className="relative flex-1 min-w-[200px] max-w-[340px]">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="w-full h-10 pl-4 pr-12 rounded-full border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50"
                    />
                    <button
                        type="submit"
                        className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <Search className="w-3.5 h-3.5 text-white" />
                    </button>
                </form>

                <div className="flex items-center gap-2 ml-auto">
                    {tipos.map((tipo) => (
                        <button
                            key={tipo.id}
                            onClick={() => {
                                onChangeTab(tipo.id);
                                setSearchValue("");
                            }}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer",
                                activeTab === tipo.id
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                    : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
                            )}
                        >
                            {tipo.detalle}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <FilterCombobox
                    label="Categoría"
                    options={categorias}
                    value={filtros.categoria ?? null}
                    onChange={(val) => onSetFiltro("categoria", val)}
                />

                <FilterCombobox
                    label="Sub"
                    options={subcategorias}
                    value={filtros.subcategoria ?? null}
                    onChange={(val) => onSetFiltro("subcategoria", val)}
                />

                <FilterCombobox
                    label="Estado"
                    options={ESTADO_OPTIONS}
                    value={filtros.estado ?? null}
                    onChange={(val) => onSetFiltro("estado", val)}
                />

                <button
                    onClick={onAgregar}
                    className="ml-auto px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    Agregar
                </button>
            </div>
        </div>
    );
}
