import { useMutation } from '@tanstack/react-query';
import type { CreateEventDto } from '../../types/dto/create-event.dto';

export async function createEvent(event: CreateEventDto): Promise<void> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/event/create`,
    {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    },
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
}

export function useCreateEvent() {
  return useMutation({ mutationFn: createEvent });
}
