import type { User } from "@/types";
import type { UseFormReturn } from "react-hook-form";
import type { UsuarioFormData } from "@/admin/usuarios/schemas/usuarioSchema";

// Extiende el tipo original 'User', agregándole temporalmente la propiedad
// de contraseña para poder recogerla en el formulario de creación.
export type UserWithPassword = User & { password?: string };

export type FormMode = "add" | "edit";

export interface StatusOption {
  value: string;
  label: string;
}
// Estructura de las opciones del filtro de estado.
export interface FormularioUsuarioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: UserWithPassword | null;
  roles: Array<{ id: number; nombre: string; idArea: number }>;
  areas: Array<{ id: number; nombre: string }>;
  form: UseFormReturn<UsuarioFormData>;
  onSubmit: (data: UsuarioFormData) => void;
}
// Contrato de Propiedades (Props) que el componente del formulario espera recibir
// para poder funcionar (Roles disponibles, funciones a ejecutar, etc).
export interface EliminarUsuarioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserWithPassword | null;
  onConfirm: (id: number) => void;
}

