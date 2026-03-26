import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El usuario es requerido")
    .email("Ingrese un correo electrónico válido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const mesaSchema = z.object({
  name: z.string().min(1, "Campo requerido"),
  capacity: z.coerce.number().min(1, "Debe ser mayor a 0"),
  locationId: z.coerce.number().min(1, "Seleccione un área"),
  shapeId: z.coerce.number().min(1, "Seleccione un tipo"),
});

export const menuSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().min(1, "La descripción es requerida"),
  precio: z.number().min(0.01, "El precio debe ser mayor a 0"),
  categoriaId: z.number().min(1, "Seleccione una categoría"),
  subcategoriaId: z.number().min(1, "Seleccione una subcategoría"),
  imagen_url: z.string().optional(),
  estado: z.boolean().optional(),
});

export type MenuFormValues = z.infer<typeof menuSchema>;
export type MesaFormData = z.infer<typeof mesaSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

