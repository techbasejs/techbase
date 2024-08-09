// I18n language texts type
type I18nTimeFormatType = {
  invalid_time: string;
  time_ago_format: string;
  time_passed_format: string;
  just_now: string;
  second: {
    a_few_seconds: string;
    unit: string;
  };
  minute: {
    a_minute: string;
    unit: string;
  };
  hour: {
    an_hour: string;
    unit: string;
  };
  day: {
    a_day: string;
    unit: string;
  };
  month: {
    a_month: string;
    unit: string;
  };
  year: {
    a_year: string;
    unit: string;
  };
};

const englishLocale: I18nTimeFormatType = {
  invalid_time: "Invalid time",
  time_ago_format: "{} ago",
  time_passed_format: "in {}",
  just_now: "just now",
  second: {
    a_few_seconds: "a few seconds",
    unit: "seconds",
  },
  minute: {
    a_minute: "a minute",
    unit: "minutes",
  },
  hour: {
    an_hour: "an hour",
    unit: "hours",
  },
  day: {
    a_day: "a day",
    unit: "days",
  },
  month: {
    a_month: "a month",
    unit: "months",
  },
  year: {
    a_year: "a year",
    unit: "years",
  },
};

const japaneseLocale: I18nTimeFormatType = {
  invalid_time: "無効な時間",
  time_ago_format: "{}前",
  time_passed_format: "{}後",
  just_now: "たった今",
  second: {
    a_few_seconds: "数秒",
    unit: "秒",
  },
  minute: {
    a_minute: "1分",
    unit: "分",
  },
  hour: {
    an_hour: "1時間",
    unit: "時間",
  },
  day: {
    a_day: "1日",
    unit: "日",
  },
  month: {
    a_month: "1ヶ月",
    unit: "ヶ月",
  },
  year: {
    a_year: "1年",
    unit: "年",
  },
};

// Common properties of TimeFormat
type CommonTimeFormat = {
  // Maximum seconds to use TimeFormat
  maxSeconds: number;
};

// TimeFormat with format "number + unit"
type DynamicTimeFormat = {
  type: "dynamic";
  secondsPerUnit: number;
  unitText: string;
};

// TimeFormat with fixed text
type StaticTimeFormat = {
  type: "static";
  timeText: string;
};

// TimeFormat type
type TimeFormatType = CommonTimeFormat & (StaticTimeFormat | DynamicTimeFormat);

// Global fields
let localeTranslation: I18nTimeFormatType = englishLocale;

// Constants: the number of seconds per units.
const SECONDS_PER_SECOND = 1;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE;
const SECONDS_PER_DAY = 24 * SECONDS_PER_HOUR;
const SECONDS_PER_MONTH = 30 * SECONDS_PER_DAY;
const SECONDS_PER_YEAR = 365 * SECONDS_PER_DAY;

// The array of time formats order by unit ascending.
const getTimeFormat = (
  localeTranslation: I18nTimeFormatType,
): TimeFormatType[] => [
  // 0 to 14 seconds => just now
  {
    type: "static",
    maxSeconds: 15, // 15 seconds
    timeText: localeTranslation.just_now,
  },
  // 15 to 29 seconds => a few seconds
  {
    type: "static",
    maxSeconds: 30, // 30 seconds
    timeText: localeTranslation.second.a_few_seconds,
  },
  // 30 to 44 seconds => x seconds
  {
    type: "dynamic",
    maxSeconds: 45, // 45 seconds
    secondsPerUnit: SECONDS_PER_SECOND,
    unitText: localeTranslation.second.unit,
  },
  // 45 to 89 seconds => a minute
  {
    type: "static",
    maxSeconds: 90, // 90 seconds
    timeText: localeTranslation.minute.a_minute,
  },
  // 90 seconds to 44 minutes => x minutes
  {
    type: "dynamic",
    maxSeconds: 45 * SECONDS_PER_MINUTE, // 45 minutes
    secondsPerUnit: SECONDS_PER_MINUTE,
    unitText: localeTranslation.minute.unit,
  },
  // 45 to 89 minutes => an hour
  {
    type: "static",
    maxSeconds: 90 * SECONDS_PER_MINUTE, // 90 minutes
    timeText: localeTranslation.hour.an_hour,
  },
  // 90 minutes to 21 hours => x hours
  {
    type: "dynamic",
    maxSeconds: 22 * SECONDS_PER_HOUR, // 22 hours
    secondsPerUnit: SECONDS_PER_HOUR,
    unitText: localeTranslation.hour.unit,
  },
  // 22 to 35 hours => a day
  {
    type: "static",
    maxSeconds: 36 * SECONDS_PER_HOUR, // 36 hours
    timeText: localeTranslation.day.a_day,
  },
  // 36 hours to 25 days => x days
  {
    type: "dynamic",
    maxSeconds: 26 * SECONDS_PER_DAY, // 26 days
    secondsPerUnit: SECONDS_PER_DAY,
    unitText: localeTranslation.day.unit,
  },
  // 26 to 45 days => a month
  {
    type: "static",
    maxSeconds: 46 * SECONDS_PER_DAY, // 46 days
    timeText: localeTranslation.month.a_month,
  },
  // 46 to 319 days => x months
  {
    type: "dynamic",
    maxSeconds: 320 * SECONDS_PER_DAY, // 320 days
    secondsPerUnit: SECONDS_PER_MONTH,
    unitText: localeTranslation.month.unit,
  },
  // 320 to 547 days (1.5 years) => a year
  {
    type: "static",
    maxSeconds: 548 * SECONDS_PER_DAY, // 548 days
    timeText: localeTranslation.year.a_year,
  },
  // 548 days+ => x years
  {
    type: "dynamic",
    maxSeconds: Number.MAX_SAFE_INTEGER,
    secondsPerUnit: SECONDS_PER_YEAR,
    unitText: localeTranslation.year.unit,
  },
];

/**
 * Convert time parameter to number.
 *
 * @param {Number | String | Date} time - The date/time parameter to convert.
 * @return {String} The time number.
 */
const convertTimeToNumber = (
  time: number | string | Date,
  localeTranslation: I18nTimeFormatType,
) => {
  let time_: number;

  if (typeof time === "number") {
    time_ = time;
  } else if (typeof time === "string") {
    time_ = new Date(time).getTime();
  } else {
    time_ = time.getTime();
  }

  if (Number.isNaN(time_)) throw new Error(localeTranslation.invalid_time);

  return time_;
};

/**
 * Localized relative date/time formatting (both for past and future dates).
 *
 * @param {Number} seconds - The total seconds of time.
 * @param {Boolean} isPast - Wheather the time is past or not.
 * @param {TimeFormatType} format - The selected time format.
 * @return {String} The formatted time text.
 */
const getFormattedTimeText = (
  seconds: number,
  isPast: boolean,
  format: TimeFormatType,
  localeTranslation: I18nTimeFormatType,
) => {
  const timeFormat = isPast
    ? localeTranslation.time_ago_format
    : localeTranslation.time_passed_format;

  let timeText: string;

  // If time format is dynamic (2 minutes, 5 hours, 10 years...)
  if (format.type === "dynamic") {
    let total = Math.floor(seconds / format.secondsPerUnit);
    /**
     * If time is not exceeded 2 hours (or months|years|...)
     * but near the 2 hours then round it to 2 hours (or months|years|...)
     * Example: 1h50m can be rounded to 2 hours.
     */
    if (total === 1) total = 2;
    // If language has space character. English can have space but Japanese is not.
    const hasSpace = localeTranslation.time_ago_format.includes(" ");
    // TimeFormat = Total + Space (if needed) + Unit
    timeText = `${total}${hasSpace ? " " : ""}${format.unitText}`;
  }
  // If time format is fixed (just now, a few seconds, an hour...).
  else {
    timeText = format.timeText;
  }

  // If seconds is less than 15, then the text is "just now", we don't need to replace anything.
  return seconds < 15 ? timeText : timeFormat.replace("{}", timeText);
};

/**
 * Localized relative date/time formatting (both for past and future dates).
 *
 * @param {Number | String | Date} time - The date/time parameter to serialize.
 * @return {String} The formatted time text.
 */
const getTimeAgo = (time: number | string | Date) => {
  const time_ = convertTimeToNumber(time, localeTranslation);

  const currentTime = new Date().getTime();
  const isPast = time_ <= currentTime;
  const seconds = Math.abs((new Date().getTime() - time_) / 1000);

  const timeFormats = getTimeFormat(localeTranslation);

  // Loop through all TimeFormats (order by maxSeconds) and select a correct time format.
  for (let format of timeFormats) {
    // If time seconds is greater than maximum seconds of selecting unit, then go to the next unit.
    if (seconds >= format.maxSeconds) continue;
    // Otherwise returns formatted time text with current unit.
    return getFormattedTimeText(seconds, isPast, format, localeTranslation);
  }
};

/**
 * Set locale i18n data for localized relative date/time.
 *
 * @param {I18nTimeFormatType} locale - The locale data.
 */
const setLocale = (locale: I18nTimeFormatType) => {
  localeTranslation = locale;
};

const locales = {
  englishLocale,
  japaneseLocale,
};

export {
  locales,
  localeTranslation,
  setLocale,
  getTimeAgo,
  I18nTimeFormatType,
};
