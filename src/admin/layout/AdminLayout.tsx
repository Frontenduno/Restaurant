import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/admin/components/AdminSidebar";

export function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminSidebar />

      <SidebarInset className="bg-neutral-50">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
