import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Image as ImageIcon } from "lucide-react";
import { categoriaSchema, type CategoriaFormData } from "../../../usuarios/schemas/usuarioSchema";
import type { EntityType, SaveModalData } from "@/admin/menu/types";

interface CategoriaSaveModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "add" | "edit";
    entityType: EntityType;
    initialData?: SaveModalData | null;
    onSave: (data: SaveModalData) => void;
    onDelete: (id: number) => void;
}

export function CategoriaSaveModal({
    isOpen,
    onClose,
    mode,
    entityType,
    initialData,
    onSave,
    onDelete
}: CategoriaSaveModalProps) {
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const form = useForm<CategoriaFormData>({
        resolver: zodResolver(categoriaSchema),
        defaultValues: {
            detalle: "",
            imagen_url: "",
        },
    });

    useEffect(() => {
        if (isOpen && initialData) {
            form.reset({
                detalle: initialData.detalle || "",
                imagen_url: initialData.imagen_url || "",
            });
        } else if (isOpen) {
            form.reset({
                detalle: "",
                imagen_url: "",
            });
        }
    }, [isOpen, initialData, form]);

    const titleMap = {
        tipo: "Tipo principal",
        categoria: "Categoría",
        subcategoria: "Subcategoría"
    };

    const handleValidSubmit = (data: CategoriaFormData) => {
        onSave({
            id: initialData?.id,
            detalle: data.detalle,
            imagen_url: data.imagen_url || undefined,
            parentId: initialData?.parentId
        });
        onClose();
    };

    const handleDelete = () => {
        if (initialData?.id) {
            onDelete(initialData.id);
            setIsAlertOpen(false);
            onClose();
        }
    };

    const preventEnterSubmit = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {mode === "add" ? "Agregar" : "Editar"} {titleMap[entityType]}
                        </DialogTitle>
                    </DialogHeader>

                    <form id="categoria-form" onSubmit={form.handleSubmit(handleValidSubmit)} onKeyDown={preventEnterSubmit} className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="detalle">Nombre</Label>
                            <Input
                                id="detalle"
                                placeholder={`Ej. ${entityType === 'tipo' ? 'Platillos' : entityType === 'categoria' ? 'Carnes' : 'Criollas'}`}
                                {...form.register("detalle")}
                                autoFocus
                            />
                            {form.formState.errors.detalle && (
                                <p className="text-[0.8rem] font-medium text-red-500">{form.formState.errors.detalle.message}</p>
                            )}
                        </div>

                        {entityType !== "tipo" && (
                            <div className="space-y-2">
                                <Label htmlFor="imagen_url" className="flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-gray-500" />
                                    URL de Imagen
                                    <span className="text-xs text-gray-400 font-normal ml-auto">(Opcional)</span>
                                </Label>
                                <Input
                                    id="imagen_url"
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                    {...form.register("imagen_url")}
                                />
                                {form.formState.errors.imagen_url && (
                                    <p className="text-[0.8rem] font-medium text-red-500">{form.formState.errors.imagen_url.message}</p>
                                )}
                            </div>
                        )}
                    </form>

                    <DialogFooter className="flex items-center sm:justify-between w-full">
                        {mode === "edit" ? (
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => setIsAlertOpen(true)}
                                title="Eliminar"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        ) : (
                            <div /> // Espaciador flex
                        )}
                        <div className="flex items-center gap-2">
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button type="submit" form="categoria-form" className="bg-blue-600 hover:bg-blue-700 text-white">
                                Guardar
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará permanentemente la selección
                            actual de {titleMap[entityType].toLowerCase()} "{initialData?.detalle}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
                        >
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
