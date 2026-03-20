import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Categoria, Insumo, Estado } from "../types";
import inventarioData from "../data/inventario-data.json";

interface InsumoFormaValues {
  nombre: string;
  idCategoria: string;
  stock: number;
  unidadMedida: string;
  idEstado: string;
}

const insumoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  idCategoria: z.string().min(1, "Seleccione una categoría"),
  stock: z.coerce.number().min(0, "El stock no puede ser negativo"),
  unidadMedida: z.string().min(1, "Seleccione una unidad"),
  idEstado: z.string().min(1, "Seleccione un estado"),
});

// Forzamos a que InsumoFormValues sea exactamente lo que Zod produce
type InsumoFormValues = z.infer<typeof insumoSchema>;

export function useInventario() {
  // Agregamos un estado para los items para que la UI se actualice al "guardar"
  const [allItems, setAllItems] = useState<Insumo[]>(
    inventarioData.insumos as Insumo[],
  );
  const allCategorias = inventarioData.categorias as Categoria[];
  const allEstados = inventarioData.estados as Estado[];

  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [activeEstado, setActiveEstado] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInsumo, setSelectedInsumo] = useState<Insumo | null>(null);

  const form = useForm<InsumoFormaValues>({
    resolver: zodResolver(insumoSchema) as any,
    defaultValues: {
      nombre: "",
      idCategoria: "",
      stock: 0,
      unidadMedida: "",
      idEstado: "",
    },
  });

  // Función unificada para resetear el formulario correctamente
  const prepareForm = (insumo?: Insumo) => {
    if (insumo) {
      form.reset({
        nombre: insumo.nombre,
        idCategoria: insumo.categoria.id.toString(),
        stock: insumo.stock,
        unidadMedida: insumo.unidad,
        idEstado: insumo.estado.id.toString(),
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

  const onSubmit = (data: InsumoFormValues) => {
    // Buscamos los detalles para reconstruir el objeto como le gusta a tu JSON
    const cat = allCategorias.find((c) => c.id.toString() === data.idCategoria);
    const est = allEstados.find((e) => e.id.toString() === data.idEstado);

    const nuevoInsumo: Insumo = {
      id: selectedInsumo?.id || Math.max(...allItems.map((i) => i.id)) + 1,
      nombre: data.nombre,
      stock: data.stock,
      unidad: data.unidadMedida,
      categoria: { id: Number(data.idCategoria), detalle: cat?.detalle || "" },
      estado: {
        id: Number(data.idEstado) as 0 | 1 | 2,
        detalle: est?.detalle || "",
      },
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

    setIsModalOpen(false);
  };

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
