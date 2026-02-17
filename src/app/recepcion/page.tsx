import { redirect } from "next/navigation";

export default function RecepcionPage() {
  // Redirigimos automáticamente al flujo normal (Mesas)
  redirect("/recepcion/mesas");
}
