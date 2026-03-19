import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { RecepcionistaPage } from "@/recepcionista/pages/RecepcionistaPage";

export const recepcionistaRoutes: RouteObject[] = [
  {
    path: "/recepcionista",
    element: (
      <ProtectedRoute allowedRoles={["Recepcionista"]}>
        <RecepcionistaPage />
      </ProtectedRoute>
    ),
  },
];
