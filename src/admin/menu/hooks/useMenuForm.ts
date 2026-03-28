import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuSchema, type MenuFormValues } from "@/schemas/Validaciones";
import type { Menu, Tipo, Categoria, SubCategoria, Ingredientes } from "../types";
import type { IngredienteDisponible, Unidad } from "../types/ingredientes";
import menuData from "../data/menu-data.json";

interface UseMenuFormProps {
    open: boolean;
    item?: Menu | null;
    tipos: Tipo[];
    categorias: Categoria[];
    subcategorias: SubCategoria[];
    onClose: () => void;
    onSave: (item: Menu) => void;
}

export function useMenuForm({
    open,
    item,
    tipos,
    categorias,
    subcategorias,
    onClose,
    onSave,
}: UseMenuFormProps) {
    const isEditing = !!item;

    const form = useForm<MenuFormValues>({
        resolver: zodResolver(menuSchema),
        defaultValues: {
            nombre: "",
            descripcion: "",
            precio: 0,
            tipoId: 0,
            categoriaId: 0,
            subcategoriaId: 0,
            imagen_url: "",
            estado: true,
        },
    });

    const { reset, watch, handleSubmit } = form;

    const [ingredientes, setIngredientes] = useState<Ingredientes[]>([]);
    const [ingNombre, setIngNombre] = useState("");
    const [ingCantidad, setIngCantidad] = useState("");
    const [ingUnidad, setIngUnidad] = useState("g");
    const [editingIngredienteId, setEditingIngredienteId] = useState<number | null>(null);

    const imagenUrl = watch("imagen_url");
    const tipoId = watch("tipoId");
    const categoriaId = watch("categoriaId");
    const subcategoriaId = watch("subcategoriaId");
    const estado = watch("estado");

    const availableCategorias = useMemo(() => categorias.filter(c => c.idTipo === tipoId), [categorias, tipoId]);
    const availableSubcategorias = useMemo(() => subcategorias.filter(s => s.idCategoria === categoriaId), [subcategorias, categoriaId]);

    const selectedCategoria = useMemo(() => availableCategorias.find(c => c.id === categoriaId)?.detalle ?? "", [availableCategorias, categoriaId]);
    const selectedSubcategoria = useMemo(() => availableSubcategorias.find(s => s.id === subcategoriaId)?.detalle ?? "", [availableSubcategorias, subcategoriaId]);

    useEffect(() => {
        if (!open) return;
        if (item) {
            reset({ ...item, tipoId: item.tipo.id, categoriaId: item.categoria.id, subcategoriaId: item.subcategoria.id, imagen_url: item.imagen_url ?? "" });
            setIngredientes([...item.ingredientes]);
        } else {
            reset({ nombre: "", descripcion: "", precio: 0, tipoId: 0, categoriaId: 0, subcategoriaId: 0, imagen_url: "", estado: true });
            setIngredientes([]);
        }
        setIngNombre(""); setIngCantidad(""); setIngUnidad("g"); setEditingIngredienteId(null);
    }, [open, item, reset]);

    const handleAddIngrediente = useCallback(() => {
        if (!ingNombre || !ingCantidad) return;
        
        if (editingIngredienteId) {
            setIngredientes(prev => prev.map(ing => 
                ing.id === editingIngredienteId 
                    ? { ...ing, nombre: ingNombre, cantidad: Number(ingCantidad), unidad: ingUnidad }
                    : ing
            ));
            setEditingIngredienteId(null);
        } else {
            const nuevo: Ingredientes = {
                id: Date.now(),
                nombre: ingNombre,
                cantidad: Number(ingCantidad),
                unidad: ingUnidad,
            };
            setIngredientes((prev) => [...prev, nuevo]);
        }
        setIngNombre("");
        setIngCantidad("");
        setIngUnidad("g");
    }, [ingNombre, ingCantidad, ingUnidad, editingIngredienteId]);

    const handleEditIngrediente = useCallback((ingrediente: Ingredientes) => {
        setEditingIngredienteId(ingrediente.id);
        setIngNombre(ingrediente.nombre);
        setIngCantidad(ingrediente.cantidad.toString());
        setIngUnidad(ingrediente.unidad);
    }, []);

    const handleCancelEditIngrediente = useCallback(() => {
        setEditingIngredienteId(null);
        setIngNombre("");
        setIngCantidad("");
        setIngUnidad("g");
    }, []);

    const handleRemoveIngrediente = useCallback((id: number) => {
        setIngredientes((prev) => prev.filter((i) => i.id !== id));
    }, []);

    const onSubmit = (data: MenuFormValues) => {
        const selectedTipoObj = tipos.find(t => t.id === data.tipoId);
        const selectedCategoriaObj = categorias.find(c => c.id === data.categoriaId);
        const selectedSubcategoriaObj = subcategorias.find(s => s.id === data.subcategoriaId);

        if (!selectedTipoObj || !selectedCategoriaObj || !selectedSubcategoriaObj) {
            console.error("Faltan selecciones obligatorias");
            return;
        }

        const newItem: Menu = {
            id: item?.id ?? Date.now(),
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            categoria: selectedCategoriaObj,
            subcategoria: selectedSubcategoriaObj,
            tipo: selectedTipoObj,
            ingredientes: ingredientes,
            imagen_url: data.imagen_url || "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
            estado: data.estado ?? true,
        };

        onSave(newItem);
        onClose();
    };

    return {
        form,
        isEditing,
        imagenUrl,
        tipoId,
        estado,
        availableCategorias,
        availableSubcategorias,
        selectedCategoria,
        selectedSubcategoria,
        ingredientesData: {
            items: ingredientes,
            nombre: ingNombre,
            cantidad: ingCantidad,
            unidad: ingUnidad,
            editingId: editingIngredienteId,
            setNombre: setIngNombre,
            setCantidad: setIngCantidad,
            setUnidad: setIngUnidad,
            add: handleAddIngrediente,
            edit: handleEditIngrediente,
            cancelEdit: handleCancelEditIngrediente,
            remove: handleRemoveIngrediente,
            disponibles: menuData.ingredientesDisponibles as IngredienteDisponible[],
            unidades: menuData.unidades as Unidad[],
        },
        handleSubmit: handleSubmit(onSubmit),
    };
}
