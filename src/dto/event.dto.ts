import { z } from 'zod';
import { TagDtoSchema } from './tag.dto';
import { EventType } from '../enums/event-type.enum';
import { Game } from '../enums/game.enum';
import { ModType } from '../enums/mod-type.enum';
import { ServerRegion } from '../enums/server-region.enum';

export const EventDtoSchema = z.object({
  id: z.string(),
  title: z.string(),
  game: z.enum([Game.Arma3, Game.ArmaReforger]),
  timeUtc: z.string(),
  summary: z.string(),
  longDescription: z.string(),
  location: z.string(),
  imageUrl: z.string(),
  tags: z.array(TagDtoSchema),
  type: z.enum([EventType.PvE, EventType.PvP, EventType.PvPvE]),
  durationMinutes: z.number(),
  modSizeMb: z.number(),
  modType: z.enum([ModType.Modded, ModType.Vanilla]),
  serverName: z.string(),
  serverPassword: z.string(),
  serverRegion: z.enum([ServerRegion.EU, ServerRegion.NA, ServerRegion.Other]),
});

export const EventsDtoSchema = z.array(EventDtoSchema);

export type EventDto = z.infer<typeof EventDtoSchema>;
