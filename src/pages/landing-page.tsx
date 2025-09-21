import EventsTable from '../components/events-table';
import FAQSection from '../components/faq';
import { useState } from 'react';
import type { EventFilterName } from '../enums/event-filter.enum';
import EventFilters from '../components/event-filters';

export default function Landing() {
  const [filters, setFilters] = useState({
    type: '',
    game: '',
    style: '',
    modType: '',
    region: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  function handleFilterChange(filterName: EventFilterName, value: string) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    // Reset page to 1 when filters change
    setCurrentPage(1);
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="mt-8 flex flex-grow flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-prose text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Welcome to Arma Social
          </h1>
          <p className="text-lg text-gray-700">
            Find and join exciting Arma events hosted by the community. Browse
            through different game modes, regions, and mod types to find the
            perfect match for your playstyle.
          </p>
        </div>
        <EventFilters filters={filters} onFilterChange={handleFilterChange} />
        <EventsTable
          filters={filters}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <FAQSection />
      </div>
    </div>
  );
}
