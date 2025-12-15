"use client";

import { useState, useRef, useTransition } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "@/lib/utils";
import { deleteCity } from "@/actions/city";
import { CityListProps, ITEM_HEIGHT, ITEM_TOTAL } from "./types";
import { CityItem } from "./city-item";
import { CitySearch } from "./city-search";
import { CityEmptyState } from "./city-empty-state";

export const CityList = ({
  cities,
  onEdit,
  onDelete,
  onSelect,
  editingCityId,
  selectedCityId,
  maxHeight,
  visibleItems = 5,
}: CityListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const parentRef = useRef<HTMLDivElement>(null);

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const hasScrollbar = filteredCities.length > visibleItems;

  const calculatedHeight =
    maxHeight ??
    Math.min(filteredCities.length * ITEM_TOTAL, visibleItems * ITEM_TOTAL);

  const virtualizer = useVirtualizer({
    count: filteredCities.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ITEM_TOTAL,
    overscan: 3,
  });

  const handleDelete = (cityId: string) => {
    startTransition(async () => {
      const result = await deleteCity(cityId);
      if (result?.success) {
        onDelete(cityId);
      }
    });
  };

  if (cities.length === 0) {
    return <CityEmptyState type="no-cities" />;
  }

  return (
    <div className="space-y-3">
      <CitySearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={cities.length}
        filteredCount={filteredCities.length}
      />

      {filteredCities.length === 0 && searchQuery ? (
        <CityEmptyState type="no-results" />
      ) : (
        <div
          ref={parentRef}
          style={{ height: `${calculatedHeight}px` }}
          className={cn(
            "overflow-y-auto custom-scrollbar",
            hasScrollbar && "pr-2",
          )}
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const city = filteredCities[virtualItem.index];

              return (
                <div
                  key={city.id}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${ITEM_HEIGHT}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <CityItem
                    city={city}
                    isBeingEdited={editingCityId === city.id}
                    isSelected={selectedCityId === city.id}
                    isPending={isPending}
                    onEdit={() => onEdit(city)}
                    onDelete={() => handleDelete(city.id)}
                    onSelect={() => onSelect(city)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
