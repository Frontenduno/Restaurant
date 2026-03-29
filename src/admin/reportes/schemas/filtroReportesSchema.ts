import { z } from "zod";

export const filtroReportesSchema = z.object({
  mode: z.enum(["exact", "range"]),
  exactDate: z.string().min(1, "Selecciona una fecha"),
  fromDate: z.string().min(1, "Selecciona fecha de inicio"),
  toDate: z.string().min(1, "Selecciona fecha de fin"),
});

export type FiltroReportesData = z.infer<typeof filtroReportesSchema>;
