import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  title: string;
  value: number;
  buttonText: string;
  onClick: () => void;
  variant: "danger" | "warning";
}

export function AlertCard({
  title,
  value,
  buttonText,
  onClick,
  variant,
}: AlertCardProps) {
  const isDanger = variant === "danger";

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between h-full">
      <div className="flex items-start justify-between">
        <h3
          className={cn(
            "text-base font-bold",
            isDanger ? "text-[#f94f57]" : "text-gray-900"
          )}
        >
          {title}
        </h3>
        <div
          className={cn(
            "p-1.5 rounded-md",
            isDanger ? "bg-red-50 text-[#f94f57]" : "bg-orange-50 text-orange-500"
          )}
        >
          <TriangleAlert className="w-5 h-5" />
        </div>
      </div>

      <div
        className={cn(
          "text-5xl font-bold my-4",
          isDanger ? "text-[#f94f57]" : "text-orange-500"
        )}
      >
        {value}
      </div>

      <Button
        variant="outline"
        onClick={onClick}
        className={cn(
          "w-full rounded-full h-10 font-medium border-2 hover:bg-transparent",
          isDanger
            ? "border-red-200 text-[#f94f57] hover:border-red-300"
            : "border-gray-200 text-gray-800 hover:border-gray-300"
        )}
      >
        {buttonText}
      </Button>
    </div>
  );
}
