import { useState, useMemo } from "react";
import { useCategorias } from "./useCategoria";
import { useInsumos } from "./useInsumos";
import type { Insumo } from "../types";

export function useInventario() {
  const {
    categorias,
    setAllCategorias,
    handleSaveCategoria,
    isCatActionModalOpen,
    setIsCatActionModalOpen,
    selectedCatForAction,
    handleAddCatClick,
    handleEditCatClick,
  } = useCategorias();

  const {
    allItems,
    setAllItems,
    prepareForm,
    allEstados,
    form,
    isModalOpen,
    setIsModalOpen,
    selectedInsumo,
    setSelectedInsumo, // Importante extraer esto
    onSubmit,
  } = useInsumos(categorias);

  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [activeEstado, setActiveEstado] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [insumoToDelete, setInsumoToDelete] = useState<any | null>(null);
  const [isCategoriaModalOpen, setIsCategoriaModalOpen] = useState(false);

  const filteredInsumos = useMemo(() => {
    return allItems.filter((item) => {
      const matchesTab = activeTab === null || item.categoria.id === activeTab;
      const matchesEstado =
        activeEstado === null || item.estado.id === activeEstado;
      return matchesTab && matchesEstado;
    });
  }, [activeTab, activeEstado, allItems]);

  const handleSaveCategoriaAndSync = (nombre: string, id?: number) => {
    handleSaveCategoria(nombre, id);
    if (id) {
      setAllItems((prev) =>
        prev.map((item) =>
          item.categoria.id === id
            ? { ...item, categoria: { ...item.categoria, detalle: nombre } }
            : item,
        ),
      );
    }
  };

  const handleDeleteCategoria = (id: number) => {
    if (allItems.some((item) => item.categoria.id === id)) {
      alert("No se puede eliminar una categoría con insumos asociados.");
      return;
    }
    setAllCategorias((prev) => prev.filter((cat) => cat.id !== id));
  };

  const handleDeleteClick = (insumo: any) => {
    setInsumoToDelete(insumo);
    setIsDeleteModalOpen(true);
  };

  const onConfirmDelete = (id: number) => {
    setAllItems((prev) => prev.filter((item) => item.id !== id));
    setIsDeleteModalOpen(false);
    setInsumoToDelete(null);
  };

  return {
    insumos: filteredInsumos,
    categorias,
    estados: allEstados,
    activeTab,
    setActiveTab,
    activeEstado,
    setActiveEstado,
    isCategoriaModalOpen,
    setIsCategoriaModalOpen,
    isCatActionModalOpen,
    setIsCatActionModalOpen,
    selectedCatForAction,
    handleAddCatClick,
    handleEditCatClick,
    handleSaveCategoria: handleSaveCategoriaAndSync,
    handleDeleteCategoria,
    form,
    isModalOpen,
    setIsModalOpen,
    selectedInsumo,
    isEditing: !!selectedInsumo,
    onSubmit,
    // CORRECCIÓN: Actualizamos el estado del hijo al editar/agregar
    handleEdit: (insumo: Insumo) => {
      setSelectedInsumo(insumo); // Notifica al hijo que estamos editando
      prepareForm(insumo);
      setIsModalOpen(true);
    },
    handleAdd: () => {
      setSelectedInsumo(null); // Notifica al hijo que es uno nuevo
      prepareForm();
      setIsModalOpen(true);
    },
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    insumoToDelete,
    handleDeleteClick,
    onConfirmDelete,
  };
}
