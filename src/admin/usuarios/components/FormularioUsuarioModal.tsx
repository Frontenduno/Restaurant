import { useEffect, useMemo, useState } from "react";
import { Controller, type SubmitHandler, useWatch } from "react-hook-form";
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
import {
  DollarSign,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  User as UserIcon,
  X as XIcon,
} from "lucide-react";

import type { FormularioUsuarioModalProps } from "../types";
import type { UsuarioFormData } from "@/admin/usuarios/schemas/usuarioSchema";
import { formatSueldoDisplay, parseSueldoInput } from "../lib/utils";

export function FormularioUsuarioModal({
  open,
  onOpenChange,
  selectedUser,
  roles,
  areas,
  form,
  onSubmit,
}: FormularioUsuarioModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [sueldoInput, setSueldoInput] = useState("");

  const { control, handleSubmit } = form;

  const rolSeleccionadoId = useWatch({
    control,
    name: "rolId",
  });

  const sueldoActual = useWatch({
    control,
    name: "sueldo",
  });

  useEffect(() => {
    setSueldoInput(
      sueldoActual === undefined ? "" : formatSueldoDisplay(sueldoActual),
    );
  }, [sueldoActual, open, selectedUser]);

  const areaSeleccionada = useMemo(() => {
    const rol = roles.find((r) => r.id === rolSeleccionadoId);
    if (!rol) return undefined;
    return areas.find((a) => a.id === rol.idArea);
  }, [rolSeleccionadoId, roles, areas]);

  const isEditing = !!selectedUser;

  const onFormSubmit: SubmitHandler<UsuarioFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[680px] p-0 overflow-hidden bg-[#f4f5f9] border-0 rounded-3xl"
      >
        <div className="flex justify-between items-start p-6 pb-0">
          <div className="pr-4">
            <DialogTitle className="text-2xl font-bold text-[#0b0c2a]">
              {isEditing ? "Editar Usuario" : "Agregar Nuevo Usuario"}
            </DialogTitle>
            <p className="text-sm font-medium text-[#1a1b3c] mt-2">
              Complete los datos del empleado del Sistema
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-[#0b0c2a] bg-[#e4e6f1] hover:bg-[#d3d6e5] p-1.5 rounded-xl transition-colors"
          >
            <XIcon className="w-5 h-5" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Left column */}
            <div className="space-y-6">
              <Controller
                name="fullName"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-[#1a1b3c]">
                      Nombre Completo
                    </Label>
                    <div className="relative">
                      <UserIcon className="w-5 h-5 text-[#1a1b3c] absolute left-3 top-1/2 -translate-y-1/2" />
                      <Input
                        {...field}
                        className="pl-10 pr-3 bg-white border-slate-200 h-11 rounded-xl font-medium text-slate-600"
                        placeholder="Ej. Juan Perez"
                      />
                    </div>
                    {fieldState.error && (
                      <p className="text-xs text-red-500 font-medium">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-[#1a1b3c]">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="w-5 h-5 text-[#1a1b3c] absolute left-3 top-1/2 -translate-y-1/2" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="pl-10 pr-10 bg-white border-slate-200 h-11 rounded-xl font-medium text-slate-600"
                        placeholder="***********************"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-[#1a1b3c] hover:bg-slate-100"
                        aria-label={
                          showPassword
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {fieldState.error && (
                      <p className="text-xs text-red-500 font-medium">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="rolId"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-[#1a1b3c]">
                      Rol
                    </Label>
                    <div className="relative">
                      <UserIcon className="w-5 h-5 text-[#1a1b3c] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <Select
                        value={
                          roles.find((r) => r.id === field.value)?.nombre ?? ""
                        }
                        onValueChange={(v) => {
                          const rolSeleccionado = roles.find(
                            (r) => r.nombre === v,
                          );
                          field.onChange(rolSeleccionado?.id ?? 0);
                        }}
                      >
                        <SelectTrigger className="pl-10 bg-white border-slate-200 h-11 rounded-xl font-medium text-slate-600">
                          <SelectValue placeholder="Seleccione un rol" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((r) => (
                            <SelectItem key={r.id} value={r.nombre}>
                              {r.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {fieldState.error && (
                      <p className="text-xs text-red-500 font-medium">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-[#1a1b3c]">
                      Correo Electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="w-5 h-5 text-[#1a1b3c] absolute left-3 top-1/2 -translate-y-1/2" />
                      <Input
                        {...field}
                        type="email"
                        className="pl-10 pr-3 bg-white border-slate-200 h-11 rounded-xl font-medium text-slate-600"
                        placeholder="juanperez@example.com"
                      />
                    </div>
                    {fieldState.error && (
                      <p className="text-xs text-red-500 font-medium">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="sueldo"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-[#1a1b3c]">
                      Sueldo Mensual
                    </Label>
                    <div className="relative">
                      <DollarSign className="w-5 h-5 text-[#1a1b3c] absolute left-3 top-1/2 -translate-y-1/2" />
                      <Input
                        type="text"
                        inputMode="decimal"
                        value={sueldoInput}
                        onChange={(e) => {
                          const nuevoValor = e.target.value;
                          setSueldoInput(nuevoValor);
                          field.onChange(parseSueldoInput(nuevoValor));
                        }}
                        className="pl-10 pr-3 bg-white border-slate-200 h-11 rounded-xl font-medium text-slate-600"
                        placeholder="$ 0.00"
                      />
                    </div>
                    {fieldState.error && (
                      <p className="text-xs text-red-500 font-medium">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-[#1a1b3c]">
                  Área Asignada
                </Label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-[#1a1b3c] absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    readOnly
                    value={areaSeleccionada?.nombre ?? ""}
                    placeholder="Ej. (Cocina, Recepcion, etc.)"
                    className="pl-10 pr-3 bg-white border-slate-200 h-11 rounded-xl font-medium text-slate-600 pointer-events-none opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="bg-[#0b0c2a] text-white border-0 hover:bg-[#1a1b3c] text-base px-8 h-11 rounded-xl"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#0b0c2a] text-white border-0 hover:bg-[#1a1b3c] text-base px-8 h-11 rounded-xl"
            >
              {isEditing ? "Guardar" : "Crear"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
