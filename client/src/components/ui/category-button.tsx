import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CategoryButtonProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryButton({
  children,
  active,
  onClick,
}: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 pb-0.5 rounded-full whitespace-nowrap text-xs font-bold border",
        active
          ? "bg-orange-500 text-white border-blue-600"
          : "bg-blue-700 hover:bg-blue-900 text-white border-blue-400/50"
      )}
    >
      <span className="p-1">{children}</span>
    </button>
  );
}
