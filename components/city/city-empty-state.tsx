import { MapPin, SearchX } from "lucide-react";

import { CityEmptyStateProps } from "./types";

export const CityEmptyState = ({ type }: CityEmptyStateProps) => {
  if (type === "no-cities") {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
          <MapPin className="w-8 h-8 text-slate-500" />
        </div>
        <p className="text-slate-400 text-sm">No saved cities</p>
        <p className="text-slate-500 text-xs mt-1">Add your first city</p>
      </div>
    );
  }

  return (
    <div className="text-center py-4">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-3">
        <SearchX className="w-6 h-6 text-slate-500" />
      </div>
      <p className="text-slate-400 text-sm">No cities found</p>
      <p className="text-slate-500 text-xs mt-1">Try a different search term</p>
    </div>
  );
};
