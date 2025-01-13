/// <reference lib="dom" />

/**
 * Checks if a URL is valid
 * @param url - The URL to validate
 * @returns True if the URL is valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    return Boolean(new window.URL(url));
  } catch {
    return false;
  }
}

/**
 * Extracts the pathname from a URL
 * @param url - The URL to process
 * @returns The pathname from the URL
 */
export function getPathFromUrl(url: string): string {
  try {
    const parsedUrl = new window.URL(url);
    return parsedUrl.pathname;
  } catch {
    return url;
  }
}

/**
 * Generates an optimized image URL with parameters
 * @param url - The base image URL
 * @param params - Object containing width, height, quality, and format options
 * @returns The optimized image URL with parameters
 */
export function generateImageUrl(
  url: string,
  params: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
  },
): string {
  try {
    const parsedUrl = new window.URL(url);
    const searchParams = new window.URLSearchParams(parsedUrl.search);

    if (params.width) searchParams.set("w", params.width.toString());
    if (params.height) searchParams.set("h", params.height.toString());
    if (params.quality) searchParams.set("q", params.quality.toString());
    if (params.format) searchParams.set("fm", params.format);

    return `${parsedUrl.pathname}?${searchParams.toString()}`;
  } catch {
    return url;
  }
}
