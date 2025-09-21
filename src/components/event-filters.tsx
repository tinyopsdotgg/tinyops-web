import { EventFilterName } from '../enums/event-filter.enum';

interface EventFiltersProps {
  filters: {
    type: string;
    game: string;
    style: string;
    modType: string;
    region: string;
  };
  onFilterChange: (filterName: EventFilterName, value: string) => void;
}

export default function EventFilters({
  filters,
  onFilterChange,
}: EventFiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap items-end gap-4">
      <div className="flex min-w-[150px] flex-grow flex-col">
        <label
          htmlFor="type-filter"
          className="mb-1 text-xs font-semibold text-gray-700"
        >
          Type
        </label>
        <select
          id="type-filter"
          className="w-full rounded border bg-white px-2 py-1 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={filters.type}
          onChange={(e) => onFilterChange(EventFilterName.type, e.target.value)}
        >
          <option value="">All Types</option>
          <option value="PvE">PvE</option>
          <option value="PvP">PvP</option>
          <option value="PvPvE">PvPvE</option>
        </select>
      </div>
      <div className="flex min-w-[150px] flex-grow flex-col">
        <label
          htmlFor="game-filter"
          className="mb-1 text-xs font-semibold text-gray-700"
        >
          Game
        </label>
        <select
          id="game-filter"
          className="w-full rounded border bg-white px-2 py-1 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={filters.game}
          onChange={(e) => onFilterChange(EventFilterName.game, e.target.value)}
        >
          <option value="">All Games</option>
          <option value="Arma 3">Arma 3</option>
          <option value="Arma Reforger">Arma Reforger</option>
        </select>
      </div>
      <div className="flex min-w-[150px] flex-grow flex-col">
        <label
          htmlFor="style-filter"
          className="mb-1 text-xs font-semibold text-gray-700"
        >
          Style
        </label>
        <select
          id="style-filter"
          className="w-full rounded border bg-white px-2 py-1 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={filters.style}
          onChange={(e) =>
            onFilterChange(EventFilterName.style, e.target.value)
          }
        >
          <option value="">All Styles</option>
          <option value="Realism">Realism</option>
          <option value="Semi-Realism">Semi-Realism</option>
          <option value="Fun">Fun</option>
        </select>
      </div>
      <div className="flex min-w-[150px] flex-grow flex-col">
        <label
          htmlFor="mod-type-filter"
          className="mb-1 text-xs font-semibold text-gray-700"
        >
          Mod Type
        </label>
        <select
          id="mod-type-filter"
          className="w-full rounded border bg-white px-2 py-1 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={filters.modType}
          onChange={(e) =>
            onFilterChange(EventFilterName.modType, e.target.value)
          }
        >
          <option value="">All</option>
          <option value="Vanilla">Vanilla</option>
          <option value="Modded">Modded</option>
        </select>
      </div>
      <div className="flex min-w-[150px] flex-grow flex-col">
        <label
          htmlFor="region-filter"
          className="mb-1 text-xs font-semibold text-gray-700"
        >
          Region
        </label>
        <select
          id="region-filter"
          className="w-full rounded border bg-white px-2 py-1 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={filters.region}
          onChange={(e) =>
            onFilterChange(EventFilterName.region, e.target.value)
          }
        >
          <option value="">All Regions</option>
          <option value="EU">EU</option>
          <option value="NA">NA</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {/* Add more filters as needed */}
    </div>
  );
}
