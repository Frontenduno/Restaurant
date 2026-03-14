import { Controller } from "react-hook-form";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Box, Users, Map, Package, X } from "lucide-react";
import { type MesaFormData } from "@/schemas/loginSchema";
import type { Mesa } from "@/types";
import areasData from "@/data/mesas/areas.json";
import tiposData from "@/data/mesas/tipos.json";

interface FormularioMesaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mesa?: Mesa | null;
  onSubmit: (data: MesaFormData, id?: number) => void;
  form: UseFormReturn<MesaFormData>;
}

export function FormularioMesaModal({ open, onOpenChange, mesa, onSubmit, form }: FormularioMesaModalProps) {
  const isEditing = !!mesa;

  const { control, handleSubmit, formState: { errors } } = form;

  const FormField = ({ label, icon: Icon, error, children, className = "space-y-2" }: { label: string, icon: any, error?: string, children: React.ReactNode, className?: string }) => (
    <div className={className}>
      <Label className="text-xs font-semibold text-[#1a1b3c]">{label}</Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <Icon className="w-5 h-5 text-[#1a1b3c]" />
        </div>
        {children}
      </div>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );

  const onFormSubmit: SubmitHandler<MesaFormData> = (data) => {
    onSubmit(data, mesa?.id);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-[600px] p-0 overflow-hidden bg-[#f4f5f9] border-0 rounded-3xl">
        <div className="flex justify-between items-center p-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-[#0b0c2a]">
            {isEditing ? `Editar ${mesa?.name}` : "Agregar Mesa"}
          </DialogTitle>
          <button type="button" onClick={handleCancel} className="text-[#0b0c2a] bg-[#e4e6f1] hover:bg-[#d3d6e5] p-1.5 rounded-xl transition-colors">
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <FormField label="Número de mesa" icon={Box} error={errors.name?.message}>
                  <Input placeholder="Ingrese numero de mesa" className="pl-12 bg-white border-0 shadow-sm h-12 rounded-2xl font-medium text-slate-600" {...field} />
                </FormField>
              )}
            />

            <Controller
              control={control}
              name="capacity"
              render={({ field }) => (
                <FormField label="Capacidad" icon={Users} error={errors.capacity?.message}>
                  <Input type="number" placeholder="Ingrese la capacidad" className="pl-12 bg-white border-0 shadow-sm h-12 rounded-2xl font-medium text-slate-600" {...field} />
                </FormField>
              )}
            />

            <Controller
              control={control}
              name="locationId"
              render={({ field }) => (
                <FormField label="Área" icon={Map} error={errors.locationId?.message}>
                  <Select
                    onValueChange={(v) => {
                      const item = areasData.find(a => a.detalle === v);
                      if (item) field.onChange(item.id);
                    }}
                    value={areasData.find(a => a.id === field.value)?.detalle || ""}
                  >
                    <SelectTrigger className="pl-12 bg-white border-0 shadow-sm h-12 rounded-2xl font-medium text-slate-600">
                      <SelectValue placeholder="Seleccione un área" />
                    </SelectTrigger>
                    <SelectContent>
                      {areasData.map((loc) => (
                        <SelectItem key={loc.id} value={loc.detalle}>{loc.detalle}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              )}
            />

            <Controller
              control={control}
              name="shapeId"
              render={({ field }) => (
                <FormField label="Tipo" icon={Package} error={errors.shapeId?.message} className="space-y-2 md:col-span-1">
                  <Select
                    onValueChange={(v) => {
                      const item = tiposData.find(t => t.detalle === v);
                      if (item) field.onChange(item.id);
                    }}
                    value={tiposData.find(t => t.id === field.value)?.detalle || ""}
                  >
                    <SelectTrigger className="pl-12 bg-white border-0 shadow-sm h-12 rounded-2xl font-medium text-slate-600">
                      <SelectValue placeholder="Seleccione un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposData.map((shape) => (
                        <SelectItem key={shape.id} value={shape.detalle}>{shape.detalle}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              )}
            />
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button type="button" variant="outline" onClick={handleCancel} className="bg-[#0b0c2a] text-white border-0 hover:bg-[#1a1b3c] hover:text-white text-base px-8 h-12 rounded-full">
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#0b0c2a] text-white border-0 hover:bg-[#1a1b3c] text-base px-8 h-12 rounded-full">
              {isEditing ? "Guardar" : "Aceptar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
