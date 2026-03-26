import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Mesa } from "@/types";
import { mesaSchema, type MesaFormData } from "@/schemas/loginSchema";
import mesaData from "@/data/mesas/mesas.json";
import estadosData from "@/data/mesas/estados.json";
import areasData from "@/data/mesas/areas.json";
import tiposData from "@/data/mesas/tipos.json";
import reservasData from "@/data/reservas/reservas.json";

const initialMesas = mesaData as Mesa[];

export function useMesas() {
  const [mesas, setMesas] = useState<Mesa[]>(() => {
    const saved = localStorage.getItem("mesasApp");
    if (saved) return JSON.parse(saved);
    return initialMesas;
  });

  const [reservas, setReservas] = useState<any[]>(() => {
    const saved = localStorage.getItem("reservasApp");
    if (saved) return JSON.parse(saved);
    return reservasData;
  });

  // Persistencia y sincronización
  useEffect(() => {
    localStorage.setItem("mesasApp", JSON.stringify(mesas));
  }, [mesas]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "mesasApp" && e.newValue) {
        setMesas(JSON.parse(e.newValue));
      }
      if (e.key === "reservasApp" && e.newValue) {
        setReservas(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  
  // Modales
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null);

  // Inicialización del Formulario
  const form = useForm<MesaFormData>({
    resolver: zodResolver(mesaSchema) as any,
  });

  const { reset } = form;

  useEffect(() => {
    if (isFormOpen) {
      if (selectedMesa) {
        reset({
          name: selectedMesa.name,
          capacity: selectedMesa.capacity,
          locationId: selectedMesa.location.id,
          shapeId: selectedMesa.shape.id,
        });
      } else {
        reset({
          name: "",
          capacity: 1,
          locationId: areasData[0]?.id || 1,
          shapeId: tiposData[0]?.id || 1,
        });
      }
    }
  }, [isFormOpen, selectedMesa, reset]);

  // Manejador del Formulario
  const handleFormSubmit = (data: MesaFormData, id?: number) => {
    const selectedLocation = areasData.find(a => a.id === data.locationId) || areasData[0];
    const selectedShape = tiposData.find(t => t.id === data.shapeId) || tiposData[0];
    const defaultStatus = estadosData.find(e => e.detalle.toLowerCase() === "disponible") || estadosData[0];

    if (id) {
      setMesas(prev => prev.map(m => m.id === id ? { 
        ...m, 
        name: data.name,
        capacity: data.capacity,
        location: selectedLocation,
        shape: selectedShape,
      } : m));
    } else {
      const newId = mesas.length > 0 ? Math.max(...mesas.map(m => m.id)) + 1 : 1;
      const newMesa: Mesa = { 
        id: newId,
        name: data.name,
        capacity: data.capacity,
        location: selectedLocation,
        shape: selectedShape,
        status: defaultStatus
      };
      setMesas(prev => [...prev, newMesa]);
    }
    setIsFormOpen(false);
  };

  // Manejador de Eliminación
  const handleDeleteMesa = (id: number) => {
    setMesas(prev => prev.filter(m => m.id !== id));
    setIsDeleteOpen(false);
    
    toast.error("Mesa eliminada", {
      description: "La mesa ha sido eliminada correctamente",
      duration: 2500,
      className: "border-l-4 border-l-red-600 font-sans",
    });
  };

  // Combinar con clientes
  const mesasConClientes = mesas.map(mesa => {
    const reservaActiva = reservas.find(r => 
      r.mesas.includes(mesa.id) && 
      (
        (mesa.status.detalle.toLowerCase() === "ocupado" && r.estado === "confirmada") ||
        (mesa.status.detalle.toLowerCase() === "reservado" && r.estado === "pendiente")
      )
    );

    return {
      ...mesa,
      cliente: reservaActiva ? reservaActiva.nombre : undefined
    };
  });

  // Funciones de apertura de modales
  const openMesaInfo = (mesa: Mesa) => {
    const mesaConInfo = mesasConClientes.find(m => m.id === mesa.id) || mesa;
    setSelectedMesa(mesaConInfo);
    setIsInfoOpen(true);
  };

  const openAddMesa = () => {
    setSelectedMesa(null);
    setIsFormOpen(true);
  };

  const openEditFromInfo = () => {
    setIsInfoOpen(false);
    setIsFormOpen(true);
  };

  const openDeleteFromInfo = () => {
    setIsInfoOpen(false);
    setIsDeleteOpen(true);
  };

  return {
    mesas: mesasConClientes,
    modals: {
      isFormOpen, setIsFormOpen,
      isInfoOpen, setIsInfoOpen,
      isDeleteOpen, setIsDeleteOpen,
    },
    form,
    selectedMesa,
    actions: {
      handleFormSubmit,
      handleDeleteMesa,
      openMesaInfo,
      openAddMesa,
      openEditFromInfo,
      openDeleteFromInfo
    }
  };
}
