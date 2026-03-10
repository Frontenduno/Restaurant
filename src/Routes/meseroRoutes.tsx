import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { MeseroPage } from "@/mesero/pages/MeseroPage";

export const meseroRoutes: RouteObject[] = [
  {
    path: "/mesero",
    element: (
      <ProtectedRoute allowedRoles={["Mesero"]}>
        <MeseroPage />
      </ProtectedRoute>
    ),
  },
];
