import { UtensilsCrossedIcon } from "lucide-react";

export function LoginHeader() {
  return (
    <div className="flex flex-col items-center gap-2 mb-6 pt-10">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#0D00FF]">
        <UtensilsCrossedIcon className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-2xl font-bold text-neutral-900">Bienvenido</h1>
      <p className="text-sm text-neutral-500">Ingrese sus credenciales</p>
    </div>
  );
}
