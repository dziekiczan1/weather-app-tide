import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  heading: string;
  icon: LucideIcon;
  iconGradient?: string;
  children: React.ReactNode;
  className?: string;
}

export const CardWrapper = ({
  heading,
  icon: Icon,
  iconGradient = "from-purple-400 to-indigo-500",
  children,
  className,
}: CardWrapperProps) => {
  return (
    <div
      className={cn(
        "backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-2xl",
        className,
      )}
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span
          className={cn(
            "p-2 rounded-md bg-gradient-to-br text-white",
            iconGradient,
          )}
        >
          <Icon className="w-4 h-4" />
        </span>
        {heading}
      </h2>
      {children}
    </div>
  );
};
