import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth";
import { getRolPath } from "@/data";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.rol.nombre)) {
    return <Navigate to={getRolPath(user.rol.nombre)} replace />;
  }

  return <>{children}</>;
}
