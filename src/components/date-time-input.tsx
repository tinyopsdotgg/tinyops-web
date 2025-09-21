interface DateTimeInputProps {
  startTimeUtc: Date;
  setStartTimeUtc: (startTimeUtc: Date) => void;
}

export default function DateTimeInput({
  startTimeUtc,
  setStartTimeUtc,
}: DateTimeInputProps) {
  return (
    <>
      {' '}
      <label className="block text-sm font-medium text-gray-700">
        Start Time (local)
      </label>
      <input
        id="startTime"
        type="datetime-local"
        onChange={(e) => setStartTimeUtc(new Date(e.target.value))}
        className="w-full rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <p>
        Stored UTC value:{' '}
        {startTimeUtc ? startTimeUtc.toISOString() : 'not set'}
      </p>
    </>
  );
}
