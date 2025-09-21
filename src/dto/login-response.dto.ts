import { z } from 'zod';

export const LoginResponseDtoSchema = z.object({
  success: z.boolean(),
  user: z.object({
    id: z.string(),
    username: z.string(),
  }),
});

export type LoginResponseDto = z.infer<typeof LoginResponseDtoSchema>;
