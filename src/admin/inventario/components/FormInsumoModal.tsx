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
  selectedInsumo?: any; // Datos del insumo si se va a editar
  Categoria: Categoria[];
  Estado: Estado[];
  form: any; // Instancia de useForm que viene del padre
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

  // Sincronizar datos cuando el modal abre o cambia el seleccionado
  useEffect(() => {
    if (open) {
      if (selectedInsumo) {
        reset(selectedInsumo);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[720px] p-0 overflow-hidden bg-[#ebedf2] border-0 rounded-[35px] shadow-2xl"
      >
        {/* Cabecera */}
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

        {/* handleSubmit(onSubmit) ejecuta la validación antes de llamar a tu función */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-9 pt-4">
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
                    {errors.nombre && (
                      <span className="text-xs text-red-500 font-bold ml-1">
                        {errors.nombre.message as string}
                      </span>
                    )}
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
                    {errors.idCategoria && (
                      <span className="text-xs text-red-500 font-bold ml-1">
                        {errors.idCategoria.message as string}
                      </span>
                    )}
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
                rules={{
                  required: "El stock es obligatorio",
                  min: {
                    value: 0,
                    message: "El stock no puede ser negativo",
                  },
                }}
                render={({ field }) => (
                  <div className="relative">
                    <Box className="w-6 h-6 text-[#050640] absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                      className={`pl-14 bg-white border-0 h-[58px] rounded-2xl shadow-sm text-lg focus-visible:ring-2 ${errors.stock ? "ring-2 ring-red-500" : "focus-visible:ring-[#050640]"}`}
                      placeholder="Ingrese cantidad"
                    />
                    {errors.stock && (
                      <span className="text-xs text-red-500 font-bold ml-1">
                        {errors.stock.message as string}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Unidad de medida */}
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
                        <SelectItem value="Kilogramos">Kilogramos</SelectItem>
                        <SelectItem value="Unidades">Unidades</SelectItem>
                        <SelectItem value="Litros">Litros</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.unidadMedida && (
                      <span className="text-xs text-red-500 font-bold ml-1">
                        {errors.unidadMedida.message as string}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Estado */}
            <div className="space-y-2 md:col-span-1">
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
                    {errors.idEstado && (
                      <span className="text-xs text-red-500 font-bold ml-1">
                        {errors.idEstado.message as string}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 mt-12 pb-2">
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="bg-[#050640] hover:bg-[#1a1b5c] text-white text-xl font-bold px-10 h-[55px] rounded-[22px] transition-transform active:scale-95 shadow-lg"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#050640] hover:bg-[#1a1b5c] text-white text-xl font-bold px-10 h-[55px] rounded-[22px] transition-transform active:scale-95 shadow-lg"
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
