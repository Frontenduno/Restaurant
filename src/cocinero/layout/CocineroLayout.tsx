import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CocineroSidebar } from "@/cocinero/components/CocineroSidebar";
import { Toaster } from "@/components/ui/sonner";

export function CocineroLayout() {
  return (
    <SidebarProvider>
      <CocineroSidebar />
      <SidebarInset className="bg-neutral-50">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
      <Toaster position="top-right" />
    </SidebarProvider>
  );
}
