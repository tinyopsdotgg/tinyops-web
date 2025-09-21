import { useState } from 'react';
import { useFetchEvents } from '../hooks/events/use-fetch-events';
import EventCard from './event-card';
import EventModal from './event-modal';
import type { EventDto } from '../dto/event.dto';

const EVENTS_PER_PAGE = 9;

// Define the props interface for EventsPage
interface EventsTableProps {
  filters: {
    type: string;
    game: string;
    style: string;
    modType: string;
    region: string;
  };
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function EventsTable({
  filters,
  currentPage,
  setCurrentPage,
}: EventsTableProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventDto | null>(null);

  // Use the new useEvents hook
  const { data: events = [], isLoading, error } = useFetchEvents();

  // Filter events based on filters prop
  const filteredEvents = events.filter((event: EventDto) => {
    if (filters.type && event.type !== filters.type) return false;
    if (filters.game && event.game !== filters.game) return false;
    // Assuming 'style' is part of tags for now, adjust if needed
    if (filters.style && !event.tags.some((tag) => tag.name === filters.style))
      return false;
    if (filters.modType && event.modType !== filters.modType) return false;
    if (filters.region && event.serverRegion !== filters.region) return false;
    return true;
  });

  // Sort filtered events by time
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const timeA = Date.parse(a.timeUtc);
    const timeB = Date.parse(b.timeUtc);
    return timeA - timeB;
  });

  // Calculate events to display for the current page
  const indexOfLastEvent = currentPage * EVENTS_PER_PAGE;
  const indexOfFirstEvent = indexOfLastEvent - EVENTS_PER_PAGE;
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Calculate total pages
  const totalPages = Math.ceil(sortedEvents.length / EVENTS_PER_PAGE);

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-xl text-gray-600">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-xl text-red-600">
        Error loading events. Please try again later.
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-xl">
        No events are schedule at this time, please check again later.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {currentEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            className="h-full cursor-pointer"
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
