import type { EventDto } from '../dto/event.dto';

interface EventCardProps {
  event: EventDto;
}

export default function EventCard({ event }: EventCardProps) {
  function formatLocalDateTime(utcString: string) {
    const date = new Date(utcString);
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }

  function formatDuration(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h && m) return `${h}h ${m}m`;
    if (h) return `${h}h`;
    return `${m}m`;
  }

  function formatModSize(sizeMB: number) {
    if (sizeMB >= 1000) {
      return `${(sizeMB / 1000).toFixed(1)} GB`;
    }
    return `${sizeMB} MB`;
  }

  const typeColors: Record<EventDto['type'], string> = {
    PvE: 'bg-green-500',
    PvP: 'bg-red-500',
    PvPvE: 'bg-yellow-500',
  };

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-white/30 bg-gradient-to-br from-white/60 to-blue-100/40 p-0 shadow-xl backdrop-blur-md">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 left-2 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
          {event.game}
        </div>
      </div>
      <div className="p-5">
        <h2 className="mb-1 text-2xl font-bold text-gray-900 drop-shadow-sm">
          {event.title}
        </h2>
        <div className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
          Region: {event.serverRegion}
        </div>
        <div className="mb-2 text-xs text-gray-500">
          {formatLocalDateTime(event.timeUtc)} • {event.location} •{' '}
          {formatDuration(event.durationMinutes)}
        </div>
        <p className="mb-3 text-gray-700">{event.summary}</p>
        <div className="mb-2 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${typeColors[event.type]}`}
          >
            {event.type}
          </span>
          {event.modType === 'Modded' ? (
            <span className="rounded-full bg-purple-200/60 px-3 py-1 text-xs font-semibold text-purple-900 shadow-sm">
              Modded ({formatModSize(event.modSizeMb)})
            </span>
          ) : (
            <span className="rounded-full bg-green-200/60 px-3 py-1 text-xs font-semibold text-green-900 shadow-sm">
              Vanilla
            </span>
          )}
        </div>
        <div className="mt-2 text-center text-xs text-gray-400 italic">
          Click inside to get more information
        </div>
      </div>
    </div>
  );
}
