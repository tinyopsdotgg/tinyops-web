import z from 'zod';

export const TagDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  eventId: z.string(),
});

export type TagDto = z.infer<typeof TagDtoSchema>;
