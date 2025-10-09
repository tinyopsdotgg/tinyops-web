import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { type EventDto, EventsDtoSchema } from '../../dto/event.dto';

const fetchEvents = async (): Promise<EventDto[]> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/event/all`,
    );
    const parsedResults = EventsDtoSchema.safeParse(response.data);

    if (parsedResults.success) {
      console.log('here:' + parsedResults.data);
      return parsedResults.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error; // Let react-query handle retries / error state
  }
};

export function useFetchEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });
}
