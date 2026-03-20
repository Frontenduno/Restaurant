import { useEffect } from "react";
import {
  X as XIcon,
  Archive,
  LayoutGrid,
  Box,
  Scale,
  Activity,
} from "lucide-react";
import { Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Categoria, Estado } from "../types";

interface FormInsumoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  isEditing?: boolean;
  selectedInsumo?: any;
  Categoria: Categoria[];
  Estado: Estado[];
  form: any;
}

function FormInsumoModal({
  open,
  onOpenChange,
  onSubmit,
  isEditing = false,
  selectedInsumo,
  Categoria,
  Estado,
  form,
}: FormInsumoProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  // 1. Sincronizar datos: Convertimos el objeto complejo del JSON a campos planos para el form
  useEffect(() => {
    if (open) {
      if (selectedInsumo) {
        reset({
          nombre: selectedInsumo.nombre,
          stock: selectedInsumo.stock,
          unidadMedida: selectedInsumo.unidad, // Coincide con "kg", "latas", etc.
          idCategoria: selectedInsumo.categoria.id.toString(),
          idEstado: selectedInsumo.estado.id.toString(),
        });
      } else {
        reset({
          nombre: "",
          idCategoria: "",
          stock: "",
          unidadMedida: "",
          idEstado: "",
        });
      }
    }
  }, [open, selectedInsumo, reset]);

  // 2. Función intermedia para devolver los datos como Números al JSON/API
  const handleActualSubmit = (data: any) => {
    const formattedData = {
      ...data,
      idCategoria: Number(data.idCategoria),
      idEstado: Number(data.idEstado),
      stock: Number(data.stock),
      // Si necesitas enviar la estructura anidada de vuelta, podrías construirla aquí
    };
    onSubmit(formattedData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[720px] p-0 overflow-hidden bg-[#ebedf2] border-0 rounded-[35px] shadow-2xl"
      >
        <div className="flex justify-between items-center p-9 pb-2">
          <DialogTitle className="text-[28px] font-bold text-[#050640]">
            {isEditing ? "Editar Insumo" : "Agregar Insumo"}
          </DialogTitle>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-[#050640] bg-white hover:bg-slate-200 p-2 rounded-xl shadow-sm transition-all"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleActualSubmit)} className="p-9 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {/* Nombre */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#050640] ml-1">
                Nombre
              </Label>
              <Controller
                name="nombre"
                control={control}
                rules={{ required: "El nombre es obligatorio" }}
                render={({ field }) => (
                  <div className="relative">
                    <Archive
                      className={`w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 z-10 ${errors.nombre ? "text-red-500" : "text-[#050640]"}`}
                    />
                    <Input
                      {...field}
                      className={`pl-14 bg-white border-0 h-[58px] rounded-2xl shadow-sm text-lg focus-visible:ring-2 ${errors.nombre ? "ring-2 ring-red-500" : "focus-visible:ring-[#050640]"}`}
                      placeholder="Ingrese nombre"
                    />
                  </div>
                )}
              />
            </div>

            {/* Categoría */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#050640] ml-1">
                Categoria
              </Label>
              <Controller
                name="idCategoria"
                control={control}
                rules={{ required: "Seleccione una categoría" }}
                render={({ field }) => (
                  <div className="relative">
                    <LayoutGrid className="w-6 h-6 text-[#050640] absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none" />
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger
                        className={`w-full pl-14 bg-white border-0 !h-[58px] rounded-2xl shadow-sm text-lg focus:ring-2 ${errors.idCategoria ? "ring-2 ring-red-500" : "focus:ring-[#050640]"}`}
                      >
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        {Categoria.map((c: any) => (
                          <SelectItem key={c.id} value={c.detalle}>
                            {c.detalle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#050640] ml-1">
                Stock
              </Label>
              <Controller
                name="stock"
                control={control}
                rules={{ required: "El stock es obligatorio" }}
                render={({ field }) => (
                  <div className="relative">
                    <Box className="w-6 h-6 text-[#050640] absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                    <Input
                      {...field}
                      type="number"
                      className={`pl-14 bg-white border-0 h-[58px] rounded-2xl shadow-sm text-lg focus-visible:ring-2 ${errors.stock ? "ring-2 ring-red-500" : "focus-visible:ring-[#050640]"}`}
                    />
                  </div>
                )}
              />
            </div>

            {/* Unidad de medida - Ajustado a los valores de tu JSON */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#050640] ml-1">
                Unidad de medida
              </Label>
              <Controller
                name="unidadMedida"
                control={control}
                rules={{ required: "Seleccione una unidad" }}
                render={({ field }) => (
                  <div className="relative">
                    <Scale className="w-6 h-6 text-[#050640] absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none" />
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={`w-full pl-14 bg-white border-0 !h-[58px] rounded-2xl shadow-sm text-lg focus:ring-2 ${errors.unidadMedida ? "ring-2 ring-red-500" : "focus:ring-[#050640]"}`}
                      >
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilogramos (kg)</SelectItem>
                        <SelectItem value="unidades">Unidades</SelectItem>
                        <SelectItem value="latas">Latas</SelectItem>
                        <SelectItem value="litros">Litros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>

            {/* Estado */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#050640] ml-1">
                Estado
              </Label>
              <Controller
                name="idEstado"
                control={control}
                rules={{ required: "Seleccione un estado" }}
                render={({ field }) => (
                  <div className="relative">
                    <Activity className="w-6 h-6 text-[#050640] absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none" />
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger
                        className={`w-full pl-14 bg-white border-0 !h-[58px] rounded-2xl shadow-sm text-lg focus:ring-2 ${errors.idEstado ? "ring-2 ring-red-500" : "focus:ring-[#050640]"}`}
                      >
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        {Estado.map((e: any) => (
                          <SelectItem key={e.id} value={e.detalle}>
                            {e.detalle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-12 pb-2">
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="bg-[#050640] hover:bg-[#1a1b5c] text-white text-xl font-bold px-10 h-[55px] rounded-[22px] shadow-lg"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#050640] hover:bg-[#1a1b5c] text-white text-xl font-bold px-10 h-[55px] rounded-[22px] shadow-lg"
            >
              {isEditing ? "Guardar" : "Aceptar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FormInsumoModal;
