import { useState } from "react";
import { SquarePen, Plus, Trash2, Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import type { Menu, Tipo, Categoria, SubCategoria } from "@/admin/menu/types";
import { useMenuForm } from "@/admin/menu/hooks/useMenuForm";
import { SearchableCombobox } from "./SearchableCombobox";

interface FormMenuProps {
    open: boolean;
    onClose: () => void;
    item?: Menu | null;
    tipos: Tipo[];
    categorias: Categoria[];
    subcategorias: SubCategoria[];
    onSave: (item: Menu) => void;
    onDelete: (id: number) => void;
}

const BADGE_COLORS = [
    { bg: "#FEE2E2", text: "#991B1B" },
    { bg: "#DBEAFE", text: "#1E3A8A" },
    { bg: "#D1FAE5", text: "#065F46" },
    { bg: "#FEF3C7", text: "#92400E" },
    { bg: "#E0E7FF", text: "#3730A3" },
    { bg: "#FCE7F3", text: "#9D174D" },
    { bg: "#CCFBF1", text: "#134E4A" },
    { bg: "#F3E8FF", text: "#6B21A8" },
];

const labelClass = "text-xs text-gray-500 uppercase tracking-wide font-semibold";

export function FormMenu(props: FormMenuProps) {
    const { open, onClose, item, tipos, onDelete } = props;
    const [deleteOpen, setDeleteOpen] = useState(false);

    const {
        form: { register, setValue, formState: { errors } },
        isEditing,
        imagenUrl,
        tipoId,
        estado,
        availableCategorias,
        availableSubcategorias,
        selectedCategoria,
        selectedSubcategoria,
        ingredientesData,
        handleSubmit,
    } = useMenuForm(props);

    const {
        items: ingredientes,
        nombre: ingNombre,
        cantidad: ingCantidad,
        unidad: ingUnidad,
        editingId,
        setNombre: setIngNombre,
        setCantidad: setIngCantidad,
        setUnidad: setIngUnidad,
        add: handleAddIngrediente,
        edit: handleEditIngrediente,
        cancelEdit: handleCancelEditIngrediente,
        remove: handleRemoveIngrediente,
        disponibles: INGREDIENTES_DISPONIBLES,
        unidades: UNIDADES,
    } = ingredientesData;

    const handleConfirmDelete = () => {
        if (!item) return;
        onDelete(item.id);
        setDeleteOpen(false);
        toast.success("Platillo eliminado correctamente", {
            description: `${item.nombre}`,
        });
    };

    return (
        <Sheet open={open} onOpenChange={(val) => { if (!val) onClose(); }}>
            <SheetContent side="right" className="sm:max-w-[800px] w-full overflow-y-auto p-0">
                <SheetHeader className="p-5 pb-0">
                    <SheetTitle className="flex items-center gap-2 text-lg font-bold">
                        {isEditing
                            ? <><SquarePen className="w-5 h-5" /> Editar</>
                            : <><Pencil className="w-5 h-5" /> Nuevo Platillo</>
                        }
                    </SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                    <div className="flex-1 overflow-y-auto px-5 pb-4 flex flex-col gap-4">
                        {/* Image preview */}
                        {imagenUrl ? (
                            <div className="relative w-full h-44 rounded-xl overflow-hidden border border-gray-100 mt-2">
                                <img src={imagenUrl} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setValue("imagen_url", "", { shouldValidate: true })}
                                    title="Editar imagen"
                                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center shadow-md cursor-pointer"
                                >
                                    <Pencil className="w-3.5 h-3.5 text-white" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-1.5 mt-2">
                                <Label htmlFor="imagen_url" className={labelClass}>Imagen URL</Label>
                                <Input id="imagen_url" placeholder="https://ejemplo.com/imagen.jpg" {...register("imagen_url")} />
                            </div>
                        )}

                        {/* Nombre */}
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="nombre" className={labelClass}>Nombre</Label>
                            <Input id="nombre" placeholder="Nombre del platillo" {...register("nombre")} aria-invalid={!!errors.nombre} />
                            {errors.nombre && <span className="text-xs text-red-500">{errors.nombre.message}</span>}
                        </div>

                        {/* Tipo */}
                        <div className="flex flex-col gap-1.5">
                            <Label className={labelClass}>Tipo</Label>
                            <Select
                                value={tipos.find(t => t.id === tipoId)?.detalle ?? ""}
                                onValueChange={(val) => {
                                    const found = tipos.find(t => t.detalle === val);
                                    setValue("tipoId", found?.id ?? 0, { shouldValidate: true });
                                    setValue("categoriaId", 0);
                                    setValue("subcategoriaId", 0);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccione un tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tipos.map(t => (
                                        <SelectItem key={t.id} value={t.detalle}>{t.detalle}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.tipoId && <span className="text-xs text-red-500">{errors.tipoId.message}</span>}
                        </div>

                        {/* Categoría + Subcategoría */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <Label className={labelClass}>Categoría</Label>
                                <SearchableCombobox
                                    value={selectedCategoria}
                                    onValueChange={(val) => {
                                        const found = availableCategorias.find(c => c.detalle === val);
                                        setValue("categoriaId", found?.id ?? 0, { shouldValidate: true });
                                        setValue("subcategoriaId", 0);
                                    }}
                                    options={availableCategorias.map(c => ({ label: c.detalle, value: c.detalle }))}
                                    placeholder="Seleccione..."
                                    disabled={!tipoId}
                                />
                                {errors.categoriaId && <span className="text-xs text-red-500">{errors.categoriaId.message}</span>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label className={labelClass}>Sub-categoría</Label>
                                <SearchableCombobox
                                    value={selectedSubcategoria}
                                    onValueChange={(val) => {
                                        const found = availableSubcategorias.find(s => s.detalle === val);
                                        setValue("subcategoriaId", found?.id ?? 0, { shouldValidate: true });
                                    }}
                                    options={availableSubcategorias.map(c => ({ label: c.detalle, value: c.detalle }))}
                                    placeholder="Seleccione..."
                                    disabled={!selectedCategoria}
                                />
                                {errors.subcategoriaId && <span className="text-xs text-red-500">{errors.subcategoriaId.message}</span>}
                            </div>
                        </div>

                        {/* Precio + Estado */}
                        <div className={`grid gap-3 ${isEditing ? "grid-cols-2" : "grid-cols-1"}`}>
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="precio" className={labelClass}>Precio</Label>
                                <Input
                                    id="precio"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    {...register("precio", { valueAsNumber: true })}
                                    aria-invalid={!!errors.precio}
                                />
                                {errors.precio && <span className="text-xs text-red-500">{errors.precio.message}</span>}
                            </div>

                            {isEditing && (
                                <div className="flex flex-col gap-1.5">
                                    <Label className={labelClass}>Estado</Label>
                                    <div className="flex items-center gap-3 h-10">
                                        <Switch
                                            checked={estado ?? true}
                                            onCheckedChange={(checked) => setValue("estado", checked, { shouldValidate: true })}
                                        />
                                        <span className={`text-sm font-medium ${estado ? "text-green-600" : "text-gray-400"}`}>
                                            {estado ? "Activo" : "Inactivo"}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Descripción */}
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="descripcion" className={labelClass}>Descripción</Label>
                            <Textarea
                                id="descripcion"
                                placeholder="Descripción del platillo..."
                                rows={3}
                                {...register("descripcion")}
                                aria-invalid={!!errors.descripcion}
                                className="resize-none"
                            />
                            {errors.descripcion && <span className="text-xs text-red-500">{errors.descripcion.message}</span>}
                        </div>

                        {/* Ingredientes */}
                        <div className="flex flex-col gap-2">
                            <Label className={labelClass}>Ingredientes</Label>

                            <div className="flex items-center gap-2">
                                <SearchableCombobox
                                    value={ingNombre}
                                    onValueChange={setIngNombre}
                                    options={INGREDIENTES_DISPONIBLES.map(i => ({ label: i.nombre, value: i.nombre }))}
                                    placeholder="Seleccione"
                                    className="flex-1"
                                />
                                <Input
                                    type="number"
                                    placeholder="Cant."
                                    min="0"
                                    value={ingCantidad}
                                    onChange={(e) => setIngCantidad(e.target.value)}
                                    className="w-20"
                                />
                                <SearchableCombobox
                                    value={ingUnidad}
                                    onValueChange={setIngUnidad}
                                    options={UNIDADES.map(u => ({ label: u.abreviatura, value: u.abreviatura }))}
                                    placeholder="Uni."
                                    className="w-24"
                                />
                                {editingId ? (
                                    <>
                                        <Button type="button" size="icon-sm" variant="default" onClick={handleAddIngrediente} className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white">
                                            <Check className="w-4 h-4" />
                                        </Button>
                                        <Button type="button" size="icon-sm" variant="outline" onClick={handleCancelEditIngrediente} className="shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50">
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </>
                                ) : (
                                    <Button type="button" size="icon-sm" variant="outline" onClick={handleAddIngrediente} className="shrink-0">
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>

                            {ingredientes.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                    {ingredientes.map((ing, idx) => {
                                        const color = BADGE_COLORS[idx % BADGE_COLORS.length];
                                        return (
                                            <button
                                                type="button"
                                                key={ing.id}
                                                onClick={() => handleEditIngrediente(ing)}
                                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold hover:opacity-80 transition-opacity"
                                                style={{ backgroundColor: color.bg, color: color.text }}
                                            >
                                                {ing.nombre} {ing.cantidad}{ing.unidad}
                                                <div
                                                    role="button"
                                                    onClick={(e) => { e.stopPropagation(); handleRemoveIngrediente(ing.id); }}
                                                    className="ml-0.5 hover:text-red-600 cursor-pointer"
                                                >
                                                    <Trash2 className="w-2.5 h-2.5" />
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <SheetFooter className="flex-row gap-3 border-t border-gray-100 p-4">
                        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg h-11">
                            {isEditing ? "Guardar Cambios" : "Crear Platillo"}
                        </Button>
                        {isEditing && (
                            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                                <AlertDialogTrigger
                                    render={
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="h-11 w-11 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white shrink-0"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    }
                                />
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>¿Eliminar platillo?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta acción no se puede deshacer. Se eliminará "{item?.nombre}" permanentemente.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction
                                            variant="destructive"
                                            onClick={handleConfirmDelete}
                                        >
                                            Eliminar
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
