import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { MeserSidebar } from "@/mesero/components/MeserSidebar";

export function Meserlayout() {
  return (
    <SidebarProvider>
      <MeserSidebar />

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
