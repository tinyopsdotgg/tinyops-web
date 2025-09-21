/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/navigation-bar';
import { useAuth } from '../hooks/auth/use-auth';
import { useEffect, useState, type FormEvent } from 'react';
import { Game } from '../enums/game.enum';
import { EventType } from '../enums/event-type.enum';
import { ModType } from '../enums/mod-type.enum';
import { ServerRegion } from '../enums/server-region.enum';
import DateTimeInput from '../components/date-time-input';
import { useCreateEvent } from '../hooks/events/use-create-event';
import type { CreateEventDto } from '../dto/create-event.dto';

export default function CreateEvent() {
  const [eventTitle, setEventTitle] = useState<string>();
  const [game, setGame] = useState<Game>(Game.ArmaReforger);
  const [startTimeUtc, setStartTimeUtc] = useState<Date>(new Date());
  const [summary, setSummary] = useState<string>();
  const [longDescription, setLongDescription] = useState<string | null>(null);
  const [serverMap, setServerMap] = useState<string>();
  const [tags, setTags] = useState<string[] | null>();
  const [type, setType] = useState<EventType>();
  const [durationMinutes, setDurationMinutes] = useState<number>();
  const [modSizeMb, setModSizeMb] = useState<number | null>(null);
  const [modType, setModType] = useState<ModType>();
  const [serverName, setServerName] = useState<string>();
  const [serverPassword, setServerPassword] = useState<string | null>(null);
  const [serverRegion, setServerRegion] = useState<ServerRegion>();

  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutateAsync: createEventAsync } = useCreateEvent();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Workflow
    // Create new create event dto
    const createEventDto: CreateEventDto = {
      game: game,
      startTimeUtc: startTimeUtc,
      summary: '',
      serverMap: '',
      tags: [],
      type: EventType.PvE,
      durationMinutes: 0,
      modType: ModType.Vanilla,
      serverName: '',
      serverRegion: ServerRegion.EU,
      title: '',
      imageUrl: '',
    };
    // Mutation for Create Event
    await createEventAsync(createEventDto);
    // Forward you to link of the created event

    console.log(e);
  }

  function checkFormValid(): boolean {
    if (
      eventTitle &&
      game &&
      startTimeUtc &&
      summary &&
      longDescription &&
      serverMap &&
      type &&
      durationMinutes &&
      modType &&
      serverMap &&
      serverName &&
      serverRegion
    ) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="mt-8 flex flex-grow flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-prose text-center">
          <h1 className="text-3xl font-bold text-gray-900">Post Details</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-8 shadow-lg"
        >
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter title"
                onChange={(e) => setEventTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="game"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="game"
                className="block text-sm font-medium text-gray-700"
              >
                Game
              </label>
              <select
                id="game"
                name="game"
                className="w-full rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              >
                <option value="ArmaReforger">Arma Reforger</option>
                <option value="Arma3">Arma 3</option>
              </select>
            </div>
            <div className="space-y-2">
              <DateTimeInput
                startTimeUtc={startTimeUtc}
                setStartTimeUtc={setStartTimeUtc}
              />
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <button
              type="submit"
              // disabled={!checkFormValid()}
              className="flex items-center justify-center rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-10"
            >
              Create Event!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
