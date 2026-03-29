import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { RecepSidebar } from "@/recepcionista/components/RecepSidebar";

/*
  ============================================
  LAYOUT: Receplayout — Estructura principal
  ============================================
  
  PROPÓSITO:
  Layout contenedor para toda la sección de recepcionista.
  Estructura:
  - Sidebar: Navegación entre Mesas, Meseros, Reservas
  - Main: Área principal con <Outlet> para páginas anidadas
  - Toaster: Notificaciones en tiempo real
  
  RUTAS ANIDADAS:
  - /recepcionista → RecepcionistaPage (mapa de mesas)
  - /recepcionista/meseros → MeserDispo (disponibilidad de meseros)
  - /recepcionista/reservas → Reservas (gestión de reservas)
*/

export function Receplayout() {
  return (
    <SidebarProvider>
      <RecepSidebar />

      <SidebarInset className="bg-neutral-50">
        <main className="flex-1 p-6">
          {/* <Outlet> renderiza la página actual según la ruta */}
          <Outlet />
        </main>
      </SidebarInset>
      {/* Toaster muestra notificaciones (confirmaciones, errores, etc.) */}
      <Toaster position="top-right" />
    </SidebarProvider>
  );
}
