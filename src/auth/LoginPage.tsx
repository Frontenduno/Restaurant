import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { getRolPath } from "@/data";
import { LoginHeader } from "./components/LoginHeader";
import { LoginForm } from "./components/LoginForm";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function LoginPage() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin(email: string, password: string) {
    setError("");
    setIsSubmitting(true);

    setTimeout(() => {
      const result = login(email, password);

      if (result.success && result.user) {
        navigate(getRolPath(result.user.rol.nombre), { replace: true });
      } else {
        setError(result.error ?? "Error al iniciar sesión");
      }
      setIsSubmitting(false);
    }, 500);
  }

  return (
    <div
      className="min-h-screen w-full flex relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/restaurante.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Login card - centered on tablet, left side on desktop */}
      <div className="relative z-10 flex items-center justify-center lg:justify-start w-full px-4 lg:px-24">
        <Card className="w-full max-w-md lg:max-w-sm bg-white backdrop-blur-sm rounded-2xl shadow-2xl border-0 ring-0 p-4 sm:p-6">
          <CardHeader>
            <LoginHeader />
          </CardHeader>
          <CardContent>
            <LoginForm
              onSubmit={handleLogin}
              error={error}
              isSubmitting={isSubmitting}
            />
          </CardContent>
        </Card>
      </div>

      {/* Restaurant branding - bottom right */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10 text-right">
        <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Restaurante J&P
        </h2>
        <p className="text-lg md:text-xl text-white/80 mt-1 drop-shadow-md">
          Sistema de Automatización de Procesos
        </p>
      </div>
    </div>
  );
}

