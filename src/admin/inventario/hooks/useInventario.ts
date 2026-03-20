import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Categoria, Insumo, Estado } from "../types";
import inventarioData from "../data/inventario-data.json";

const insumoSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio"),
  idCategoria: z.string().min(1, "Seleccione una categoría"),
  stock: z.coerce.number().min(0, "Mínimo 0"),
  unidadMedida: z.string().min(1, "Seleccione una unidad"),
  idEstado: z.string().min(1, "Seleccione un estado"),
});

type InsumoFormValues = z.infer<typeof insumoSchema>;

export function useInventario() {
  const [allItems, setAllItems] = useState<Insumo[]>(
    inventarioData.insumos as Insumo[],
  );

  const allCategorias = useMemo(
    () => inventarioData.categorias as Categoria[],
    [],
  );
  const allEstados = useMemo(() => inventarioData.estados as Estado[], []);

  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [activeEstado, setActiveEstado] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInsumo, setSelectedInsumo] = useState<Insumo | null>(null);

  const form = useForm<InsumoFormValues>({
    resolver: zodResolver(insumoSchema) as any,
    mode: "all",
    defaultValues: {
      nombre: "",
      idCategoria: "",
      stock: 0,
      unidadMedida: "",
      idEstado: "",
    },
  });

  const prepareForm = (insumo?: Insumo) => {
    if (insumo) {
      form.reset({
        nombre: insumo.nombre,
        idCategoria: insumo.categoria.detalle,
        stock: insumo.stock,
        unidadMedida: insumo.unidad,
        idEstado: insumo.estado.detalle,
      });
    } else {
      form.reset({
        nombre: "",
        idCategoria: "",
        stock: 0,
        unidadMedida: "",
        idEstado: "",
      });
    }
  };

  const onSubmit = (data: InsumoFormValues) => {
    const categoriaEncontrada = allCategorias.find(
      (c) => c.detalle === data.idCategoria,
    );
    const estadoEncontrado = allEstados.find(
      (e) => e.detalle === data.idEstado,
    );

    if (!categoriaEncontrada || !estadoEncontrado) return;

    const nuevoInsumo: Insumo = {
      id:
        selectedInsumo?.id ||
        (allItems.length > 0 ? Math.max(...allItems.map((i) => i.id)) + 1 : 1),
      nombre: data.nombre,
      stock: data.stock,
      unidad: data.unidadMedida,
      categoria: { ...categoriaEncontrada },
      estado: { ...estadoEncontrado },
    };

    if (selectedInsumo) {
      setAllItems((prev) =>
        prev.map((item) =>
          item.id === selectedInsumo.id ? nuevoInsumo : item,
        ),
      );
    } else {
      setAllItems((prev) => [...prev, nuevoInsumo]);
    }

    // Si llegamos aquí, la validación de Zod PASÓ
    setIsModalOpen(false);
    form.reset();
  };

  // ... resto de tus funciones handleEdit, handleAdd y filteredInsumos se mantienen igual

  const handleEdit = (insumo: Insumo) => {
    setSelectedInsumo(insumo);
    prepareForm(insumo);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedInsumo(null);
    prepareForm();
    setIsModalOpen(true);
  };

  const filteredInsumos = useMemo(() => {
    return allItems.filter((item) => {
      const matchesTab = activeTab === null || item.categoria.id === activeTab;
      const matchesEstado =
        activeEstado === null || item.estado.id === activeEstado;
      return matchesTab && matchesEstado;
    });
  }, [activeTab, activeEstado, allItems]);

  return {
    insumos: filteredInsumos,
    categorias: allCategorias,
    estados: allEstados,
    form,
    isModalOpen,
    setIsModalOpen,
    selectedInsumo,
    isEditing: !!selectedInsumo,
    onSubmit,
    activeTab,
    setActiveTab,
    activeEstado,
    setActiveEstado,
    handleEdit,
    handleAdd,
  };
}
