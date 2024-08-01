export function dateFormat(date: Date, format: string): string {
  const validTokens = /^(YYYY|MM|DD|HH|mm|ss|[ :-])+$/;

  if (!validTokens.test(format)) {
    throw new TypeError(`Invalid format string '${format}'`);
  }

  if (!(date instanceof Date && !Number.isNaN(date.getTime()))) {
    throw new TypeError(`Invalid date parameter: '${date}'`);
  }

  try {
    const formattedDate = format.replace(/YYYY/g, date.getFullYear().toString())
      .replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
      .replace(/DD/g, ('0' + date.getDate()).slice(-2))
      .replace(/HH/g, ('0' + date.getHours()).slice(-2))
      .replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
      .replace(/ss/g, ('0' + date.getSeconds()).slice(-2));

    return formattedDate;
  } catch (error) {
    throw new TypeError(`Error formatting date: ${ (error as TypeError).message}`);
  }
}