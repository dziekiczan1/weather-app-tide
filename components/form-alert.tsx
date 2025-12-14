import { AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FormAlertVariant = "error" | "success";

interface FormAlertProps {
  message?: string;
  variant?: FormAlertVariant;
}

const config = {
  error: {
    icon: AlertTriangle,
    className: "bg-destructive/15 text-destructive",
  },
  success: {
    icon: CheckCircle,
    className: "bg-emerald-500/15 text-emerald-500",
  },
};

export const FormAlert = ({ message, variant = "error" }: FormAlertProps) => {
  if (!message) return null;

  const { icon: Icon, className } = config[variant];

  return (
    <div
      className={cn(
        "p-3 rounded-md flex items-center gap-x-2 text-sm",
        className,
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
};
