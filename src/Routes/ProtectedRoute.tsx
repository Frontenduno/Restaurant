import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth";
import { getRolPath } from "@/data";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-neutral-400 text-lg animate-pulse">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.rol.nombre)) {
    return <Navigate to={getRolPath(user.rol.nombre)} replace />;
  }

  return <>{children}</>;
}
