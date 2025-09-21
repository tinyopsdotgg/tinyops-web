import { useQuery } from '@tanstack/react-query';
import { type EventDto, EventsDtoSchema } from '../../dto/event.dto';

const fetchEvents = async (): Promise<EventDto[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/event/all`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const json = await response.json();

  const parsedResults = EventsDtoSchema.safeParse(json);

  if (parsedResults.success) {
    return parsedResults.data;
  } else {
    return [];
  }
};

export function useFetchEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });
}
