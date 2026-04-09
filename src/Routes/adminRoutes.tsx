import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminLayout } from "@/admin/layout/AdminLayout";
import { DashboardPage } from "@/admin/dashboard/DashboardPage";
import { MapaMesasPage } from "@/admin/mesas/MapaMesasPage";
import { MenuPage } from "@/admin/menu/MenuPage";
import { UsuariosPage } from "@/admin/usuarios/UsuariosPage";
import { ReportesPage } from "@/admin/reportes/ReportesPage";
import { InventarioPage } from "@/admin/inventario/InventarioPage";
import { AsistenciaPage } from "@/admin/asistencia/AsistenciaPage";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["Administrador"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "mesas", element: <MapaMesasPage /> },
      { path: "menu", element: <MenuPage /> },
      { path: "usuarios", element: <UsuariosPage /> },
      { path: "reportes", element: <ReportesPage /> },
      { path: "inventario", element: <InventarioPage /> },
      { path: "asistencia", element: <AsistenciaPage /> },
    ],
  },
];
