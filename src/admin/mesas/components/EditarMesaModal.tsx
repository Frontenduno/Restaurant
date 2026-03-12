import { useEffect } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Box, Users, CheckCircle, Map, Package, X } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Campo requerido"),
  capacity: z.coerce.number().min(1, "Debe ser mayor a 0"),
  status: z.string().min(1, "Seleccione un estado"),
  location: z.string().min(1, "Seleccione un área"),
  shape: z.string().min(1, "Seleccione un tipo"),
});

type FormValues = z.infer<typeof formSchema>;

export interface Mesa {
  id: number;
  name: string;
  capacity: number;
  status: string;
  location: string;
  shape: string;
}

interface EditarMesaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mesa: Mesa | null;
  onEdit: (id: number, data: FormValues) => void;
}

export function EditarMesaModal({ open, onOpenChange, mesa, onEdit }: EditarMesaModalProps) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
      capacity: 1,
      status: "disponible",
      location: "Interior",
      shape: "round",
    },
  });

  useEffect(() => {
    if (mesa && open) {
      reset({
        name: mesa.name,
        capacity: mesa.capacity,
        status: mesa.status,
        location: mesa.location,
        shape: mesa.shape,
      });
    }
  }, [mesa, open, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (mesa) {
      onEdit(mesa.id, data);
    }
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (mesa) {
        reset({
            name: mesa.name,
            capacity: mesa.capacity,
            status: mesa.status,
            location: mesa.location,
            shape: mesa.shape,
        });
    }
    onOpenChange(false);
  };

  if (!mesa) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-[600px] p-0 overflow-hidden bg-[#f4f5f9] border-0 rounded-3xl">
        <div className="flex justify-between items-center p-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-[#0b0c2a]">Editar {mesa.name}</DialogTitle>
          <button type="button" onClick={handleCancel} className="text-[#0b0c2a] bg-[#e4e6f1] hover:bg-[#d3d6e5] p-1.5 rounded-xl transition-colors">
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-[#1a1b3c]">Número de mesa</Label>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Box className="w-5 h-5 text-[#1a1b3c]" />
                    </div>
                    <Input placeholder="Ingrese numero de mesa" className="pl-12 bg-white border-0 shadow-sm h-12 rounded-2xl font-medium text-slate-600" {...field} />
                  </div>
                )}
              />
              {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-[#1a1b3c]">Estado</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                        <CheckCircle className="w-5 h-5 text-[#1a1b3c]" />
                      </div>
                      <SelectTrigger className="pl-12 bg-white border-0 shadow-sm h-12 rounded-2xl font-medium text-slate-600">
                        <SelectValue placeholder="Seleccione un estado" />
                      </SelectTrigger>
                    </div>
                    <SelectContent>
                      <SelectItem value="disponible">Disponible</SelectItem>
                      <SelectItem value="ocupado">Ocupado</SelectItem>
                      <SelectItem value="reservado">Reservado</SelectItem>
                      <SelectItem value="sucio">Sucio</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && <p className="text-xs text-red-500 font-medium">{errors.status.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-[#1a1b3c]">Capacidad</Label>
              <Controller
                control={control}
                name="capacity"
                render={({ field }) => (
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Users className="w-5 h-5 text-[#1a1b3c]" />
                    </div>
                    <Input type="number" placeholder="Ingrese la capacidad" className="pl-12 bg-white border-0 shadow-sm h-12 rounded-2xl font-medium text-slate-600" {...field} />
                  </div>
                )}
              />
              {errors.capacity && <p className="text-xs text-red-500 font-medium">{errors.capacity.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-[#1a1b3c]">Área</Label>
              <Controller
                control={control}
                name="location"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                        <Map className="w-5 h-5 text-[#1a1b3c]" />
                      </div>
                      <SelectTrigger className="pl-12 bg-white border-0 shadow-sm h-12 rounded-2xl font-medium text-slate-600">
                        <SelectValue placeholder="Seleccione un área" />
                      </SelectTrigger>
                    </div>
                    <SelectContent>
                      <SelectItem value="Interior">Interior</SelectItem>
                      <SelectItem value="Ventana">Ventana</SelectItem>
                      <SelectItem value="Terraza">Terraza</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.location && <p className="text-xs text-red-500 font-medium">{errors.location.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-1">
              <Label className="text-xs font-semibold text-[#1a1b3c]">Tipo</Label>
              <Controller
                control={control}
                name="shape"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                        <Package className="w-5 h-5 text-[#1a1b3c]" />
                      </div>
                      <SelectTrigger className="pl-12 bg-white border-0 shadow-sm h-12 rounded-2xl font-medium text-slate-600">
                        <SelectValue placeholder="Seleccione un tipo" />
                      </SelectTrigger>
                    </div>
                    <SelectContent>
                      <SelectItem value="round">Redonda</SelectItem>
                      <SelectItem value="rectangle">Rectangular</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.shape && <p className="text-xs text-red-500 font-medium">{errors.shape.message}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button type="button" variant="outline" onClick={handleCancel} className="bg-[#0b0c2a] text-white border-0 hover:bg-[#1a1b3c] hover:text-white text-base px-8 h-12 rounded-full">
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#0b0c2a] text-white border-0 hover:bg-[#1a1b3c] text-base px-8 h-12 rounded-full">
              Aceptar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
