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

export type MesaFormData = z.infer<typeof mesaSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
