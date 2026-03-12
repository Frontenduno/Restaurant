import { useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminSidebar } from "./AdminSidebar";
import { MapaMesasPage } from "../mesas/MapaMesasPage";

function AdminPageRouter() {
  const location = useLocation();
  const path = location.pathname;

  if (path.includes("/mesas")) {
    return <MapaMesasPage />;
  }

  const pageName = path.split("/").pop();
  return (
    <div className="p-4 text-center text-neutral-500 capitalize">
      {pageName} (Solo funcional en la versión completa)
    </div>
  );
}

export function AdminLayout() {
  const location = useLocation();

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div key={location.pathname} className="flex h-screen w-full bg-neutral-50 overflow-hidden">
          <AdminSidebar />
          <main className="flex-1 overflow-auto flex flex-col relative w-full">
            <div className="flex h-16 shrink-0 items-center border-b bg-white px-4 md:hidden">
              <SidebarTrigger />
              <h1 className="ml-4 font-semibold text-neutral-800">Restaurante - Administrador</h1>
            </div>
            <div className="p-6 h-full flex-1 overflow-auto">
              <AdminPageRouter />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
