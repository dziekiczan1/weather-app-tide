import { MapPin, Trash2, Edit2, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CityItemProps } from "./types";

export const CityItem = ({
  city,
  isBeingEdited,
  isSelected,
  isPending,
  onEdit,
  onDelete,
  onSelect,
}: CityItemProps) => {
  const getIcon = () => {
    if (isBeingEdited) return <Edit2 className="w-4 h-4 text-white" />;
    if (isSelected) return <Check className="w-4 h-4 text-white" />;
    return <MapPin className="w-4 h-4 text-slate-400" />;
  };

  const getContainerStyles = () => {
    if (isBeingEdited) {
      return "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30";
    }
    if (isSelected) {
      return "bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border-purple-500/30";
    }
    return "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10";
  };

  const getIconStyles = () => {
    if (isBeingEdited) return "bg-gradient-to-br from-amber-500 to-orange-500";
    if (isSelected) return "bg-gradient-to-br from-purple-500 to-indigo-500";
    return "bg-white/10";
  };

  return (
    <div
      onClick={onSelect}
      className={cn(
        "group flex items-center gap-3 p-3 rounded-md transition-all duration-200 h-full cursor-pointer border",
        getContainerStyles(),
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 shrink-0",
          getIconStyles(),
        )}
      >
        {getIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-white truncate capitalize">
          {city.name}
        </p>
        {city.country && (
          <p className="text-xs text-slate-400">{city.country}</p>
        )}
      </div>

      {isBeingEdited && (
        <span className="text-xs text-amber-400 px-2 py-1 bg-amber-500/10 rounded-full">
          Editing
        </span>
      )}

      {isSelected && !isBeingEdited && (
        <span className="text-xs text-purple-400 px-2 py-1 bg-purple-500/10 rounded-full">
          Selected
        </span>
      )}

      <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          disabled={isBeingEdited}
          className={cn(
            "p-2 rounded-lg transition-colors",
            isBeingEdited
              ? "opacity-50 cursor-not-allowed"
              : "hover: bg-white/10",
          )}
        >
          <Edit2 className="w-4 h-4 text-slate-400 hover:text-white" />
        </button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              disabled={isPending}
              className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-400" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-slate-900 border-white/10">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Delete city
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                Are you sure you want to delete{" "}
                <span className="capitalize font-medium">{city.name}</span>?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
