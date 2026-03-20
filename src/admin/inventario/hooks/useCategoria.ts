import { useState } from "react";
import type { Categoria } from "../types";
import inventarioData from "../data/inventario-data.json";

export function useCategorias() {
  const [allCategorias, setAllCategorias] = useState<Categoria[]>(
    inventarioData.categorias as Categoria[],
  );

  const [isCatActionModalOpen, setIsCatActionModalOpen] = useState(false);
  const [selectedCatForAction, setSelectedCatForAction] =
    useState<Categoria | null>(null);

  const handleAddCatClick = () => {
    setSelectedCatForAction(null);
    setIsCatActionModalOpen(true);
  };

  const handleEditCatClick = (cat: Categoria) => {
    setSelectedCatForAction(cat);
    setIsCatActionModalOpen(true);
  };

  const handleSaveCategoria = (nombre: string, id?: number) => {
    if (id) {
      setAllCategorias((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, detalle: nombre } : cat)),
      );
    } else {
      const nuevaCategoria: Categoria = {
        id:
          allCategorias.length > 0
            ? Math.max(...allCategorias.map((c) => c.id)) + 1
            : 1,
        detalle: nombre,
      };
      setAllCategorias((prev) => [...prev, nuevaCategoria]);
    }
    setIsCatActionModalOpen(false);
  };

  return {
    categorias: allCategorias,
    setAllCategorias,
    isCatActionModalOpen,
    setIsCatActionModalOpen,
    selectedCatForAction,
    handleAddCatClick,
    handleEditCatClick,
    handleSaveCategoria,
  };
}
