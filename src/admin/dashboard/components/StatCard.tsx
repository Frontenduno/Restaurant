import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | React.ReactNode;
  icon?: LucideIcon;
  iconClassName?: string;
  children?: React.ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  children,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.04)] flex flex-col justify-between border border-gray-100",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          {title}
        </h3>
        {Icon && <Icon className={cn("w-5 h-5", iconClassName)} />}
      </div>
      <div>
        <div className="text-[32px] font-bold text-gray-900 leading-none">
          {value}
        </div>
        <div className="mt-3 flex items-center">{children}</div>
      </div>
    </div>
  );
}
