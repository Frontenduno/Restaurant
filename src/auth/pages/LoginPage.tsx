import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getRolPath } from "@/data";
import { LoginHeader } from "../components/LoginHeader";
import { LoginForm } from "../components/LoginForm";

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

      if (result.success) {
        const stored = localStorage.getItem("restaurant_auth_user");
        if (stored) {
          const user = JSON.parse(stored);
          navigate(getRolPath(user.rol.nombre), { replace: true });
        }
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

      {/* Login card - left side */}
      <div className="relative z-10 flex items-center justify-start w-full px-8 md:px-16 lg:px-24">
        <div className="w-full max-w-sm bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <LoginHeader />
          <LoginForm
            onSubmit={handleLogin}
            error={error}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {/* Restaurant branding - bottom right */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10 text-right">
        <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Restaurante Mario
        </h2>
        <p className="text-lg md:text-xl text-white/80 mt-1 drop-shadow-md">
          Sistema de Automatización de Procesos
        </p>
      </div>
    </div>
  );
}
