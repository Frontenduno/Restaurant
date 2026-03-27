import { Button } from "@/components/ui/button";
import { AdminHeader } from "../components/AdminHeader";
import { PackageIcon } from "lucide-react";
import { useInventario } from "./hooks/useInventario";
import FiltrosInventario from "./components/FiltrosInventario";
import TableInventario from "./components/Insumo/TableInsumo";
import FormInsumoModal from "./components/Insumo/FormInsumoModal";
import DeleteInsumoModal from "./components/Insumo/DeleteInsumoModal";
import FormCategoria from "./components/Categoria/FormCategoria";

export function InventarioPage() {
  const {
    // Datos y Filtros
    insumos,
    categorias,
    estados,
    activeTab,
    setActiveTab,
    activeEstado,
    setActiveEstado,

    // Lógica de Insumos (proveniente de useInsumos)
    form,
    isModalOpen,
    setIsModalOpen,
    selectedInsumo,
    isEditing,
    handleAdd,
    handleEdit,
    onSubmit,

    // Lógica de Borrado de Insumos
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    insumoToDelete,
    handleDeleteClick,
    onConfirmDelete,

    // Lógica de Categorías (proveniente de useCategorias)
    isCategoriaModalOpen,
    setIsCategoriaModalOpen,
    isCatActionModalOpen,
    setIsCatActionModalOpen,
    selectedCatForAction,
    handleAddCatClick,
    handleEditCatClick,
    handleSaveCategoria,
    handleDeleteCategoria,
  } = useInventario();

  return (
    <div className="w-full flex flex-col font-sans">
      <AdminHeader title="Inventario" icon={PackageIcon} />

      <div className="px-2">
        {/* Header de la sección */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">
              Inventario General
            </h2>
            <p className="text-neutral-400">
              Control de stock e insumos del restaurante.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsCategoriaModalOpen(true)}
              className="bg-[#E9EAED] w-41.25 border border-[#05014B] hover:bg-slate-200 text-[#05014B] font-medium px-6 h-10 rounded-md transition-colors"
            >
              Categorías
            </Button>
            <Button
              onClick={handleAdd}
              className="bg-[#05014B] w-41.25 hover:bg-blue-900 text-white font-medium px-6 h-10 rounded-md transition-colors"
            >
              Agregar Insumo
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <FiltrosInventario
          categoria={categorias}
          estado={estados}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeEstado={activeEstado}
          setActiveEstado={setActiveEstado}
        />

        {/* Tabla de Insumos */}
        <TableInventario
          data={insumos}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        {/* Modales de Insumos */}
        <FormInsumoModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          form={form}
          onSubmit={onSubmit}
          isEditing={isEditing}
          selectedInsumo={selectedInsumo}
          Categoria={categorias}
          Estado={estados}
        />

        <DeleteInsumoModal
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          insumo={insumoToDelete}
          onConfirm={onConfirmDelete}
        />

        {/* Panel Lateral de Categorías */}
        <FormCategoria
          open={isCategoriaModalOpen}
          onOpenChange={setIsCategoriaModalOpen}
          categorias={categorias}
          onAdd={handleAddCatClick}
          onEdit={handleEditCatClick}
          onDelete={handleDeleteCategoria}
          isCatActionModalOpen={isCatActionModalOpen}
          setIsCatActionModalOpen={setIsCatActionModalOpen}
          selectedCatForAction={selectedCatForAction}
          onSaveCategoria={handleSaveCategoria}
        />
      </div>
    </div>
  );
}
