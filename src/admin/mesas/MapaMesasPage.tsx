import { Table } from "lucide-react";
import { AdminHeader } from "@/admin/components/AdminHeader";
import { Button } from "@/components/ui/button";

import { MesaInfoModal } from "./components/MesaInfoModal";
import { FormularioMesaModal } from "./components/FormularioMesaModal";
import { EliminarMesaModal } from "./components/EliminarMesaModal";
import estadosData from "@/data/mesas/estados.json";
import { GridEstados } from "./components/GridEstados";
import { CardMesa } from "./components/CardMesa";
import { useMesas } from "./hooks/useMesas";

export const statusColors: Record<string, string> = {
  disponible: "bg-[#10b981]",
  ocupado: "bg-blue-500",
  reservado: "bg-orange-500",
};

export function MapaMesasPage() {
  const { mesas, modals, selectedMesa, actions, form } = useMesas();

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      <AdminHeader title="Mapa de Mesas" icon={Table} />

      <div className="px-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-[28px] font-semibold text-gray-800 leading-tight">Mapa de Mesas</h2>
            <p className="text-[15px] mt-1 text-gray-500">Gestión de disponibilidad y ocupación</p>
          </div>
          <Button
            className="bg-[#1d14e0] hover:bg-blue-800 text-white font-medium px-6 h-10 rounded-md"
            onClick={actions.openAddMesa}
          >
            Agregar Mesa
          </Button>
        </div>

        <GridEstados estados={estadosData} statusColors={statusColors} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {mesas.map((mesa) => (
            <CardMesa
              key={mesa.id}
              mesa={mesa}
              onClick={actions.openMesaInfo}
              statusColors={statusColors}
            />
          ))}
        </div>
      </div>

      <FormularioMesaModal
        open={modals.isFormOpen}
        onOpenChange={modals.setIsFormOpen}
        onSubmit={actions.handleFormSubmit}
        mesa={selectedMesa}
        form={form}
      />
      <MesaInfoModal
        open={modals.isInfoOpen}
        onOpenChange={modals.setIsInfoOpen}
        mesa={selectedMesa}
        onEditClick={actions.openEditFromInfo}
        onDeleteClick={actions.openDeleteFromInfo}
      />

      <EliminarMesaModal
        open={modals.isDeleteOpen}
        onOpenChange={modals.setIsDeleteOpen}
        mesa={selectedMesa}
        onConfirm={actions.handleDeleteMesa}
      />
    </div>
  );
}
