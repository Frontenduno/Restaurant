import { z } from "zod";

// Esquema de validación estricto usando Zod.
// Define las reglas que el usuario debe cumplir al llenar el formulario
// y los mensajes de error asociados.
export const usuarioSchema = z.object({
  fullName: z.string().min(1, "Nombre requerido"),
  email: z.string().email("Correo inválido"),
  password: z.string().optional(),
  rolId: z
    .coerce.number()
    .min(0, "Seleccione un rol")
    .refine((v) => v !== 0, "Seleccione un rol"),
  sueldo: z.preprocess(
    (v) => {
      if (v === "" || v === null || v === undefined) return undefined;
      const n = Number(v);
      return Number.isNaN(n) ? undefined : n;
    },
    z.number().min(0, "Ingrese un sueldo válido").optional(),
  ),
  isActive: z.boolean(),
});

// Genera automáticamente un Tipo de TypeScript a partir del esquema anterior
// para que React sepa qué propiedades tiene el formulario.
export type UsuarioFormData = z.infer<typeof usuarioSchema>;

