import { useState } from "react";
import { Bell, Table } from "lucide-react";
import { Button } from "@/components/ui/button";

import { AgregarMesaModal } from "./components/AgregarMesaModal";
import { MesaInfoModal } from "./components/MesaInfoModal";
import { EditarMesaModal } from "./components/EditarMesaModal";
import type { Mesa } from "./components/EditarMesaModal";
import { EliminarMesaModal } from "./components/EliminarMesaModal";
import { ConfirmacionModal } from "./components/ConfirmacionModal";

const initialMesas: Mesa[] = [
  { id: 1, name: "Mesa 1", capacity: 4, location: "Ventana", status: "disponible", shape: "rectangle" },
  { id: 2, name: "Mesa 2", capacity: 2, location: "Interior", status: "ocupado", shape: "round" },
  { id: 3, name: "Mesa 3", capacity: 2, location: "Interior", status: "reservado", shape: "round" },
  { id: 4, name: "Mesa 4", capacity: 2, location: "Interior", status: "sucio", shape: "round" },
  { id: 5, name: "Mesa 5", capacity: 2, location: "Interior", status: "ocupado", shape: "round" },
  { id: 6, name: "Mesa 6", capacity: 4, location: "Ventana", status: "ocupado", shape: "rectangle" },
  { id: 7, name: "Mesa 7", capacity: 2, location: "Interior", status: "disponible", shape: "round" },
  { id: 8, name: "Mesa 8", capacity: 2, location: "Interior", status: "sucio", shape: "round" },
  { id: 9, name: "Mesa 9", capacity: 4, location: "Ventana", status: "reservado", shape: "rectangle" },
  { id: 10, name: "Mesa 10", capacity: 4, location: "Ventana", status: "sucio", shape: "rectangle" },
];

const statusColors: Record<string, string> = {
  disponible: "bg-[#10b981]",
  ocupado: "bg-blue-500",
  reservado: "bg-orange-500",
  sucio: "bg-red-500",
};

const TableRoundIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
    <circle cx="12" cy="12" r="5" fill="white" />
    <path d="M12 2v2 M12 20v2 M2 12h2 M20 12h2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4" />
  </svg>
);

const TableRectIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
    <rect x="4" y="8" width="16" height="8" rx="1" fill="white" />
    <path d="M7 8V5a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1v3" />
    <path d="M15 8V5a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1v3" />
    <path d="M7 16v3a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1v-3" />
    <path d="M15 16v3a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1v-3" />
  </svg>
);

export function MapaMesasPage() {
  const [mesas, setMesas] = useState<Mesa[]>(initialMesas);
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  
  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null);

  const handleAddMesa = (data: Omit<Mesa, 'id'>) => {
    const newId = mesas.length > 0 ? Math.max(...mesas.map(m => m.id)) + 1 : 1;
    const newMesa = { ...data, id: newId };
    setMesas([...mesas, newMesa]);
    setIsAddOpen(false);
  };

  const handleEditMesa = (id: number, data: Omit<Mesa, 'id'>) => {
    setMesas(mesas.map(m => m.id === id ? { ...data, id } : m));
    setIsEditOpen(false);
  };

  const handleDeleteMesa = (id: number) => {
    setMesas(mesas.filter(m => m.id !== id));
    setIsDeleteOpen(false);
    setIsConfirmOpen(true);
  };

  const openMesaInfo = (mesa: Mesa) => {
    setSelectedMesa(mesa);
    setIsInfoOpen(true);
  };

  const openEditFromInfo = () => {
    setIsInfoOpen(false);
    setIsEditOpen(true);
  };

  const openDeleteFromInfo = () => {
    setIsInfoOpen(false);
    setIsDeleteOpen(true);
  };

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      <div className="bg-white rounded-[1rem] shadow-sm p-4 px-6 flex items-center justify-between border border-gray-100">
        <div className="flex items-center gap-3">
          <Table className="w-6 h-6 text-black" />
          <h1 className="text-2xl font-bold text-black">Mesas</h1>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="w-6 h-6 text-black" />
        </button>
      </div>

      <div className="px-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-[28px] font-semibold text-gray-800 leading-tight">Mapa de Mesas</h2>
            <p className="text-[15px] mt-1 text-gray-500">Gestión de disponibilidad y ocupación</p>
          </div>
          <Button 
            className="bg-[#1d14e0] hover:bg-blue-800 text-white font-medium px-6 h-10 rounded-md"
            onClick={() => setIsAddOpen(true)}
          >
            Agregar Mesa
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-6 mb-6 mt-6">
          <div className="flex items-center gap-2">
            <div className={`w-[10px] h-[10px] rounded-full ${statusColors.disponible}`}></div>
            <span className="text-sm text-gray-500 font-medium">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-[10px] h-[10px] rounded-full ${statusColors.ocupado}`}></div>
            <span className="text-sm text-gray-500 font-medium">Ocupado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-[10px] h-[10px] rounded-full ${statusColors.reservado}`}></div>
            <span className="text-sm text-gray-500 font-medium">Reservado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-[10px] h-[10px] rounded-full ${statusColors.sucio}`}></div>
            <span className="text-sm text-gray-500 font-medium">Sucio</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {mesas.map((mesa) => (
            <div
              key={mesa.id}
              onClick={() => openMesaInfo(mesa)}
              className="bg-white cursor-pointer border border-gray-200 rounded-[1rem] p-6 flex flex-col items-center justify-center relative shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div
                className={`absolute top-4 right-4 w-3 h-3 rounded-full ${statusColors[mesa.status]} group-hover:scale-110 transition-transform`}
              />

              <div className="mb-4 mt-2 text-gray-800">
                {mesa.shape === "round" ? <TableRoundIcon /> : <TableRectIcon />}
              </div>

              <h3 className="text-[15px] text-gray-800 font-semibold">{mesa.name}</h3>
              <p className="text-[12px] text-gray-400 mt-1">
                {mesa.capacity} Personas • {mesa.location}
              </p>
            </div>
          ))}
        </div>
      </div>

      <AgregarMesaModal 
        open={isAddOpen} 
        onOpenChange={setIsAddOpen} 
        onAdd={handleAddMesa} 
      />
      
      <MesaInfoModal 
        open={isInfoOpen} 
        onOpenChange={setIsInfoOpen} 
        mesa={selectedMesa} 
        onEditClick={openEditFromInfo} 
        onDeleteClick={openDeleteFromInfo} 
      />
      
      <EditarMesaModal 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen} 
        mesa={selectedMesa} 
        onEdit={handleEditMesa} 
      />
      
      <EliminarMesaModal 
        open={isDeleteOpen} 
        onOpenChange={setIsDeleteOpen} 
        mesa={selectedMesa} 
        onConfirm={handleDeleteMesa} 
      />
      
      <ConfirmacionModal 
        open={isConfirmOpen} 
        onOpenChange={setIsConfirmOpen} 
      />
    </div>
  );
}
