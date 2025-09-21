import { z } from 'zod';

export const VerifySessionResponseDtoSchema = z.object({
  authenticated: z.boolean(),
  user: z.object({
    id: z.string(),
    username: z.string(),
  }),
});

export type VerifySessionResponseDto = z.infer<
  typeof VerifySessionResponseDtoSchema
>;
