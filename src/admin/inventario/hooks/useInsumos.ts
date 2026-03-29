import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Insumo, Categoria, Estado } from "../types";
import inventarioData from "../data/inventario-data.json";

const insumoSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio"),
  idCategoria: z.string().min(1, "Seleccione una categoría"),
  stock: z.coerce.number().min(0, "Mínimo 0"),
  unidadMedida: z.string().min(1, "Seleccione una unidad"),
  idEstado: z.string().min(1, "Seleccione un estado"),
});

export type InsumoFormValues = z.infer<typeof insumoSchema>;

export function useInsumos(allCategorias: Categoria[]) {
  const [allItems, setAllItems] = useState<Insumo[]>(
    inventarioData.insumos as Insumo[],
  );
  const allEstados = useMemo(() => inventarioData.estados as Estado[], []);

  const [selectedInsumo, setSelectedInsumo] = useState<Insumo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const cat = allCategorias.find((c) => c.detalle === data.idCategoria);
    const est = allEstados.find((e) => e.detalle === data.idEstado);

    if (!cat || !est) return;

    // Si hay selectedInsumo, mantenemos su ID original
    const idInsumo = selectedInsumo
      ? selectedInsumo.id
      : allItems.length > 0
        ? Math.max(...allItems.map((i) => i.id)) + 1
        : 1;

    const nuevoInsumo: Insumo = {
      id: idInsumo,
      nombre: data.nombre,
      stock: data.stock,
      unidad: data.unidadMedida,
      categoria: { ...cat },
      estado: { ...est },
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
    setSelectedInsumo(null); // Limpiamos después de guardar
  };

  return {
    allItems,
    setAllItems,
    allEstados,
    form,
    selectedInsumo,
    setSelectedInsumo,
    isModalOpen,
    setIsModalOpen,
    prepareForm,
    onSubmit,
  };
}
