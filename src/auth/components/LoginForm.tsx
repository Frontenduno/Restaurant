import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UserIcon, LockKeyholeIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { loginSchema } from "@/util/validations";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  error: string;
  isSubmitting: boolean;
}

export function LoginForm({ onSubmit, error, isSubmitting }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFieldErrors({});

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!errors[field]) {
          errors[field] = err.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    onSubmit(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm font-medium text-neutral-700">
          Usuario
        </Label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <Input
            id="email"
            type="email"
            placeholder="Ingrese el usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-11 bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-blue-500 focus-visible:border-blue-500"
          />
        </div>
        {fieldErrors.email && (
          <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-sm font-medium text-neutral-700">
          Contraseña
        </Label>
        <div className="relative">
          <LockKeyholeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Ingrese la contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 h-11 bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-blue-500 focus-visible:border-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOffIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        {fieldErrors.password && (
          <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>
        )}
      </div>

      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Checkbox id="recordar" className="border-neutral-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
        <Label htmlFor="recordar" className="text-sm text-neutral-600 cursor-pointer">
          Recordar
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors cursor-pointer"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Ingresando..." : "Ingresar"}
      </Button>
    </form>
  );
}
