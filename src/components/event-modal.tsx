import type { EventDto } from '../dto/event.dto';

interface EventModalProps {
  event: EventDto;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  if (!event) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          ✕
        </button>
        <img
          src={event.imageUrl}
          alt={event.title}
          className="mb-4 h-48 w-full rounded object-cover"
        />
        <h2 className="mb-2 text-2xl font-bold">{event.title}</h2>
        <div className="mb-2 text-sm text-gray-500">
          {event.game} • {event.location} • {event.type}
        </div>
        <div className="mb-2">{event.summary}</div>
        <div className="mb-4 text-gray-700">{event.longDescription}</div>
        <div className="mb-2">
          <span className="font-semibold">Server Name:</span> {event.serverName}
        </div>
        {event.serverPassword && (
          <div className="mb-2">
            <span className="font-semibold">Password:</span>{' '}
            {event.serverPassword}
          </div>
        )}
        <div className="mb-2">
          <span className="font-semibold">Server Region:</span>{' '}
          {event.serverRegion}
        </div>
        {/* Add more event details as needed */}
      </div>
    </div>
  );
}
