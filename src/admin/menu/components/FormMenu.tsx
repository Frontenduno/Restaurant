import { SquarePen, Plus, Trash2, Pencil } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Menu, Tipo, Categoria, SubCategoria } from "../types";
import { useMenuForm } from "../hooks/useMenuForm";
import { SearchableCombobox } from "./SearchableCombobox";

interface FormMenuProps {
    open: boolean;
    onClose: () => void;
    item?: Menu | null;
    tipos: Tipo[];
    categorias: Categoria[];
    subcategorias: SubCategoria[];
    onSave: (item: Menu) => void;
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

export function FormMenu(props: FormMenuProps) {
    const { open, onClose, tipos } = props;

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
        setNombre: setIngNombre,
        setCantidad: setIngCantidad,
        setUnidad: setIngUnidad,
        add: handleAddIngrediente,
        remove: handleRemoveIngrediente,
        disponibles: INGREDIENTES_DISPONIBLES,
        unidades: UNIDADES,
    } = ingredientesData;

    return (
        <Sheet open={open} onOpenChange={(val) => { if (!val) onClose(); }}>
            <SheetContent side="right" className="sm:max-w-md w-full overflow-y-auto p-0">
                <SheetHeader className="p-5 pb-0">
                    <SheetTitle className="flex items-center gap-2 text-lg font-bold">
                        {isEditing ? (
                            <>
                                <SquarePen className="w-5 h-5" />
                                Editar
                            </>
                        ) : (
                            <>
                                <Pencil className="w-5 h-5" />
                                Nuevo Platillo
                            </>
                        )}
                    </SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                    <div className="flex-1 overflow-y-auto px-5 pb-4 flex flex-col gap-4">
                        {/* Image preview */}
                        {imagenUrl && (
                            <div className="relative w-full h-44 rounded-xl overflow-hidden border border-gray-100 mt-2">
                                <img
                                    src={imagenUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center shadow-md cursor-pointer"
                                >
                                    <Pencil className="w-3.5 h-3.5 text-white" />
                                </button>
                            </div>
                        )}

                        {!imagenUrl && (
                            <div className="flex flex-col gap-1.5 mt-2">
                                <Label htmlFor="imagen_url" className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                                    Imagen URL
                                </Label>
                                <Input
                                    id="imagen_url"
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                    {...register("imagen_url")}
                                />
                            </div>
                        )}

                        {/* Nombre */}
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="nombre" className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                                Nombre
                            </Label>
                            <Input
                                id="nombre"
                                placeholder="Nombre del platillo"
                                {...register("nombre")}
                                aria-invalid={!!errors.nombre}
                            />
                            {errors.nombre && (
                                <span className="text-xs text-red-500">{errors.nombre.message}</span>
                            )}
                        </div>

                        {/* Tipo */}
                        <div className="flex flex-col gap-1.5">
                            <Select
                                value={tipoId ? String(tipoId) : undefined}
                                onValueChange={(val) => {
                                    setValue("tipoId", Number(val), { shouldValidate: true });
                                    setValue("categoriaId", 0);
                                    setValue("subcategoriaId", 0);
                                }}
                            >
                                <SelectTrigger className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                                    <SelectValue placeholder="Seleccione un tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tipos.map(t => <SelectItem key={t.id} value={String(t.id)}>{t.detalle}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            {errors.tipoId && (
                                <span className="text-xs text-red-500">{errors.tipoId.message}</span>
                            )}
                        </div>

                        {/* Categoría + Subcategoría row */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                                    Categoría
                                </Label>
                                <SearchableCombobox
                                    value={selectedCategoria}
                                    onValueChange={(val) => {
                                        const found = availableCategorias.find(c => c.detalle === val);
                                        setValue("categoriaId", found?.id ?? 0, { shouldValidate: true });
                                        setValue("subcategoriaId", 0);
                                    }}
                                    options={availableCategorias.map(c => ({ label: c.detalle, value: c.detalle }))}
                                    placeholder="Seleccione..."
                                />
                                {errors.categoriaId && (
                                    <span className="text-xs text-red-500">{errors.categoriaId.message}</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                                    Sub-categoría
                                </Label>
                                <SearchableCombobox
                                    value={selectedSubcategoria}
                                    onValueChange={(val) => {
                                        const found = availableSubcategorias.find(s => s.detalle === val);
                                        setValue("subcategoriaId", found?.id ?? 0, { shouldValidate: true });
                                    }}
                                    options={availableSubcategorias.map(c => ({ label: c.detalle, value: c.detalle }))}
                                    placeholder="Seleccione..."
                                />
                                {errors.subcategoriaId && (
                                    <span className="text-xs text-red-500">{errors.subcategoriaId.message}</span>
                                )}
                            </div>
                        </div>

                        {/* Precio + Estado row */}
                        <div className={`grid gap-3 ${isEditing ? "grid-cols-2" : "grid-cols-1"}`}>
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="precio" className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                                    Precio
                                </Label>
                                <Input
                                    id="precio"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    {...register("precio", { valueAsNumber: true })}
                                    aria-invalid={!!errors.precio}
                                />
                                {errors.precio && (
                                    <span className="text-xs text-red-500">{errors.precio.message}</span>
                                )}
                            </div>

                            {isEditing && (
                                <div className="flex flex-col gap-1.5">
                                    <Label className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                                        Estado
                                    </Label>
                                    <Select
                                        value={estado ? "1" : "0"}
                                        onValueChange={(val) => setValue("estado", val === "1", { shouldValidate: true })}
                                    >
                                        <SelectTrigger className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                                            <SelectValue placeholder="Seleccione un estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Activo</SelectItem>
                                            <SelectItem value="0">Inactivo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        {/* Descripción */}
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="descripcion" className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                                Descripción
                            </Label>
                            <textarea
                                id="descripcion"
                                placeholder="Descripción del platillo..."
                                rows={3}
                                {...register("descripcion")}
                                aria-invalid={!!errors.descripcion}
                                className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 resize-none"
                            />
                            {errors.descripcion && (
                                <span className="text-xs text-red-500">{errors.descripcion.message}</span>
                            )}
                        </div>

                        {/* Ingredientes */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                                Ingredientes
                            </Label>

                            <div className="flex items-center gap-2">
                                {/* Ingrediente name combobox */}
                                <SearchableCombobox
                                    value={ingNombre}
                                    onValueChange={setIngNombre}
                                    options={INGREDIENTES_DISPONIBLES.map(i => ({ label: i.nombre, value: i.nombre }))}
                                    placeholder="Seleccione"
                                    className="flex-1"
                                />

                                {/* Cantidad */}
                                <Input
                                    type="number"
                                    placeholder="Cant."
                                    value={ingCantidad}
                                    onChange={(e) => setIngCantidad(e.target.value)}
                                    className="w-17.5"
                                />

                                {/* Unidad combobox */}
                                <SearchableCombobox
                                    value={ingUnidad}
                                    onValueChange={setIngUnidad}
                                    options={UNIDADES.map(u => ({ label: u.abreviatura, value: u.abreviatura }))}
                                    placeholder="Uni."
                                    className="w-20"
                                />

                                <Button
                                    type="button"
                                    size="icon-sm"
                                    variant="outline"
                                    onClick={handleAddIngrediente}
                                    className="shrink-0"
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Ingredient badges */}
                            {ingredientes.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                    {ingredientes.map((ing, idx) => {
                                        const color = BADGE_COLORS[idx % BADGE_COLORS.length];
                                        return (
                                            <span
                                                key={ing.id}
                                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                                                style={{ backgroundColor: color.bg, color: color.text }}
                                            >
                                                {ing.nombre} {ing.cantidad}{ing.unidad}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveIngrediente(ing.id)}
                                                    className="ml-0.5 hover:opacity-70 cursor-pointer"
                                                >
                                                    <Trash2 className="w-2.5 h-2.5" />
                                                </button>
                                            </span>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <SheetFooter className="flex-row gap-3 border-t border-gray-100 p-4">
                        <Button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg h-11"
                        >
                            {isEditing ? "Guardar Cambios" : "Crear Platillo"}
                        </Button>
                        {isEditing && (
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="h-11 w-11 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white shrink-0"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        )}
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
