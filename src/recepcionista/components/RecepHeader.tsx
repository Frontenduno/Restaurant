import { Bell, type LucideIcon } from "lucide-react";

interface RecepHeaderProps {
  title: string;
  icon: LucideIcon;
}

export function RecepHeader({ title, icon: Icon }: RecepHeaderProps) {
  return (
    <div className="bg-white rounded-[1rem] shadow-sm p-4 px-6 flex items-center justify-between border border-gray-100 mb-6">
      <div className="flex items-center gap-3">
        <Icon className="w-6 h-6 text-black" />
        <h1 className="text-2xl font-bold text-black">{title}</h1>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
        <Bell className="w-6 h-6 text-black" />
      </button>
    </div>
  );
}
