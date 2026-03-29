import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { CajeroSidebar } from "@/cajero/components/CajeroSidebar";

export function CajeroLayout() {
  return (
    <SidebarProvider>
      <CajeroSidebar />

      <SidebarInset className="bg-neutral-50">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
      <Toaster position="top-right" />
    </SidebarProvider>
  );
}
