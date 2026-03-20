import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Categoria, Insumo, Estado, FiltroInventario } from "../types";
import inventarioData from "../data/inventario-data.json";

const insumoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  idCategoria: z.string().min(1, "Seleccione una categoría"),
  stock: z.number().min(0, "El stock no puede ser negativo"),
  unidadMedida: z.string().min(1, "Seleccione una unidad"),
  idEstado: z.string().min(1, "Seleccione un estado"),
});

type InsumoFormValues = z.infer<typeof insumoSchema>;

// 2. Lógica de filtrado
export function useInventario() {
  // Datos base
  const allItems = inventarioData.insumos as Insumo[];
  const allCategorias = inventarioData.categorias as Categoria[];
  const allEstados = inventarioData.estados as Estado[];

  // Estados de UI
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [activeEstado, setActiveEstado] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInsumo, setSelectedInsumo] = useState<Insumo | null>(null);

  // Configuración de react-hook-form
  const form = useForm<InsumoFormValues>({
    resolver: zodResolver(insumoSchema),
    defaultValues: {
      nombre: "",
      idCategoria: "",
      stock: 0,
      unidadMedida: "",
      idEstado: "",
    },
  });

  const handleEdit = (insumo: Insumo) => {
    setSelectedInsumo(insumo);
    // Resetear el form con los valores del insumo a editar
    form.reset({
      nombre: insumo.nombre,
      idCategoria: insumo.categoria.id.toString(), // Zod/Select suelen preferir strings
      stock: insumo.stock,
      unidadMedida: insumo.unidad,
      idEstado: insumo.estado.id.toString(),
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedInsumo(null);
    form.reset({
      nombre: "",
      idCategoria: "",
      stock: 0,
      unidadMedida: "",
      idEstado: "",
    });
    setIsModalOpen(true);
  };

  // Lógica de filtrado
  const filteredInsumos = useMemo(() => {
    return allItems.filter((item) => {
      const matchesTab = activeTab === null || item.categoria.id === activeTab;
      const matchesEstado =
        activeEstado === null || item.estado.id === activeEstado;

      return matchesTab && matchesEstado;
    });
  }, [activeTab, activeEstado, allItems]);

  // Funciones de acción
  const handleOpenModal = (insumo?: Insumo) => {
    if (insumo) {
      setSelectedInsumo(insumo);
      form.reset({
        ...insumo,
        idCategoria: insumo.categoria.id.toString(),
        idEstado: insumo.estado.id.toString(),
      });
    } else {
      setSelectedInsumo(null);
      form.reset({
        nombre: "",
        idCategoria: "",
        stock: 0,
        unidadMedida: "",
        idEstado: "",
      });
    }
    setIsModalOpen(true);
  };

  const onSubmit = (data: InsumoFormValues) => {
    if (selectedInsumo) {
      console.log("Actualizando:", selectedInsumo.id, data);
    } else {
      console.log("Creando nuevo:", data);
    }
    setIsModalOpen(false);
  };

  return {
    // Datos
    insumos: filteredInsumos,
    categorias: allCategorias,
    estados: allEstados,

    // Estado del Formulario/Modal
    form,
    isModalOpen,
    setIsModalOpen,
    selectedInsumo,
    isEditing: !!selectedInsumo,

    // Acciones
    handleOpenModal,
    onSubmit,
    activeTab,
    setActiveTab,
    activeEstado,
    setActiveEstado,
    handleEdit,
    handleAdd,
  };
}
