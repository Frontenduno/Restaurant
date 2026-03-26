import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { CajeroPage } from "@/cajero/pages/CajeroPage";

export const cajeroRoutes: RouteObject[] = [
  {
    path: "/cajero",
    element: (
      <ProtectedRoute allowedRoles={["Cajero"]}>
        <CajeroPage />
      </ProtectedRoute>
    ),
  },
];
