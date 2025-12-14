import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CitySearchProps } from "./types";
import { Button } from "@/components/ui/button";

export const CitySearch = ({
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
}: CitySearchProps) => {
  return (
    <div className="space-y-3">
      <p className="text-slate-300 text-sm font-medium">Search cities</p>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <Input
          placeholder="Search cities..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-white/5 border-white/10 text-white placeholder: text-slate-400 rounded-md h-12 transition-all duration-200 hover:bg-white/10"
        />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          {filteredCount} of {totalCount} cities
        </span>
        {searchQuery && (
          <button onClick={() => onSearchChange("")}>Clear filter</button>
        )}
      </div>
    </div>
  );
};
