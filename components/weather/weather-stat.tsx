import { WeatherStatProps } from "@/components/weather/types";

export const WeatherStat = ({
  icon: Icon,
  label,
  value,
  unit,
}: WeatherStatProps) => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 text-slate-400 mb-1">
        <Icon className="w-4 h-4" />
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-white font-medium">
        {value}
        {unit}
      </p>
    </div>
  );
};
