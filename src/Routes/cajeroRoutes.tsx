import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { CajeroLayout } from "@/cajero/layout/CajeroLayout";
import { SolicitudesPage } from "@/cajero/solicitud/SolicitudesPage";
import { HistorialCajero } from "@/cajero/historial/HistorialCajero";

export const cajeroRoutes: RouteObject[] = [
  {
    path: "/cajero",
    element: (
      <ProtectedRoute allowedRoles={["Cajero"]}>
        <CajeroLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <SolicitudesPage /> },
      { path: "historial", element: <HistorialCajero /> },
    ],
  },
];
