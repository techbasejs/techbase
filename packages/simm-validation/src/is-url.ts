import { REGEXS } from "./shared/constants";

/**
 * Checks if a given URL string matches a standard URL format including HTTP(S) and FTP protocols.
 *
 * @param url - The URL string to validate.
 * @param urlRegex - Optional regular expression to use for validation. Defaults to a regex that matches
 *                   HTTP(S) and FTP URLs with optional 'www' subdomain, domain name, optional port number,
 *                   and optional fragment or query string.
 * @returns `true` if the URL string matches the specified format, `false` otherwise.
 */
export const isURL = (url: string, urlRegex = REGEXS.URL) => {
  return urlRegex.test(url);
};
