import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { RecepSidebar } from "@/recepcionista/components/RecepSidebar";

export function Receplayout() {
  return (
    <SidebarProvider>
      <RecepSidebar />

      <SidebarInset className="bg-neutral-50">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
      <Toaster position="top-right" />
    </SidebarProvider>
  );
}
