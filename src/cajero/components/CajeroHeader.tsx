import type { ReactNode } from "react";
import { Bell } from "lucide-react";

interface CajeroHeaderProps {
  title: string;
  icon: ReactNode;
  showBell?: boolean;
}

export function CajeroHeader({ title, icon, showBell = false }: CajeroHeaderProps) {
  return (
    <div className="bg-white rounded-[1rem] shadow-sm p-4 px-6 flex items-center justify-between border border-gray-100 mb-6 shrink-0">
      <div className="flex items-center gap-3">
        {icon}
        <h1 className="text-2xl font-bold text-black">{title}</h1>
      </div>
      {showBell && (
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="w-6 h-6 text-black" />
        </button>
      )}
    </div>
  );
}
