const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE;
const SECONDS_PER_DAY = 24 * SECONDS_PER_HOUR;
const SECONDS_PER_WEEK = 7 * SECONDS_PER_DAY;
const SECONDS_PER_MONTH = 30 * SECONDS_PER_DAY;
const SECONDS_PER_YEAR = 365 * SECONDS_PER_DAY;
const SECONDS_PER_CENTURY = 100 * SECONDS_PER_YEAR;

const timeFormats = [
  { maxSeconds: SECONDS_PER_MINUTE, unitSeconds: 1, unitText: "seconds" },
  {
    maxSeconds: 2 * SECONDS_PER_MINUTE,
    timeAgo: "A minute ago",
    timePass: "A minute from now",
  },
  {
    maxSeconds: SECONDS_PER_HOUR,
    unitSeconds: SECONDS_PER_MINUTE,
    unitText: "minutes",
  },
  {
    maxSeconds: 2 * SECONDS_PER_HOUR,
    timeAgo: "An hour ago",
    timePass: "An hour from now",
  },
  {
    maxSeconds: SECONDS_PER_DAY,
    unitSeconds: SECONDS_PER_HOUR,
    unitText: "hours",
  },
  {
    maxSeconds: 2 * SECONDS_PER_DAY,
    timeAgo: "Yesterday",
    timePass: "Tomorrow",
  },
  {
    maxSeconds: SECONDS_PER_WEEK,
    unitSeconds: SECONDS_PER_DAY,
    unitText: "days",
  },
  {
    maxSeconds: 2 * SECONDS_PER_WEEK,
    timeAgo: "Last week",
    timePass: "Next week",
  },
  {
    maxSeconds: SECONDS_PER_MONTH,
    unitSeconds: SECONDS_PER_WEEK,
    unitText: "weeks",
  },
  {
    maxSeconds: 2 * SECONDS_PER_MONTH,
    timeAgo: "Last month",
    timePass: "Next month",
  },
  {
    maxSeconds: SECONDS_PER_YEAR,
    unitSeconds: SECONDS_PER_MONTH,
    unitText: "months",
  },
  {
    maxSeconds: 2 * SECONDS_PER_YEAR,
    timeAgo: "Last year",
    timePass: "Next year",
  },
  {
    maxSeconds: SECONDS_PER_CENTURY,
    unitSeconds: SECONDS_PER_YEAR,
    unitText: "years",
  },
  {
    maxSeconds: 2 * SECONDS_PER_CENTURY,
    timeAgo: "Last century",
    timePass: "Next century",
  },
  {
    maxSeconds: Number.MAX_SAFE_INTEGER,
    unitSeconds: SECONDS_PER_CENTURY,
    unitText: "centuries",
  },
];

const getTimeAgo = (time: number | string | Date) => {
  const time_ =
    typeof time === "number"
      ? time
      : typeof time === "string"
      ? new Date(time).getTime()
      : time.getTime();

  if (Number.isNaN(time_)) throw new Error("Invalid time.");
  if (new Date().getTime() === time_) return "Just now";

  const seconds = Math.abs((new Date().getTime() - time_) / 1000);
  const isPast = new Date().getTime() >= time_;

  let i = 0;
  let format;
  while ((format = timeFormats[i++])) {
    if (seconds >= format.maxSeconds) continue;
    return format.unitText
      ? `${Math.floor(seconds / format.unitSeconds)} ${format.unitText} ${
          isPast ? "ago" : "from now"
        }`
      : isPast ? format.timeAgo : format.timePass;
  }
  return time;
};

export { getTimeAgo };
