/* eslint-env browser, es2020 */
import { createClient } from "@sanity/client";
// In Sanity v3, we should use the new import path
import { type ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
// The builder import can be simplified
import imageUrlBuilder from "@sanity/image-url";
import { debug } from "../utils/debug";

// Environment variable validation
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const token = import.meta.env.VITE_SANITY_TOKEN; // Now optional

// Validation checks are good practice and implemented correctly
if (!projectId) {
  throw new Error("Missing VITE_SANITY_PROJECT_ID");
}
if (!dataset) {
  throw new Error("Missing VITE_SANITY_DATASET");
}

// Debugging configuration is helpful for development
debug.log("Sanity Config:", {
  projectId,
  dataset,
  apiVersion: "2023-05-03",
  token: token ? "(token provided)" : "(no token)",
});

// Client configuration
export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2023-05-03",
  useCdn: true,
  token: token || undefined, // Make token optional
  // In v3, perspective and stega options might be useful additions
  perspective: "published",
  // Only set withCredentials if you need CORS with credentials
  withCredentials: false,
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);

// Only log client config since builder.config() is not available
debug.log("Sanity client config:", client.config());

/**
 * Creates a URL builder for Sanity image assets
 * @param {Record<string, unknown>} source - The Sanity image reference object
 * @returns {ImageUrlBuilder} A builder object for constructing image URLs
 * @example
 * urlFor(event.mainImage).width(300).height(400).url()
 */
export const urlFor = (source: Record<string, unknown>): ImageUrlBuilder => {
  return builder.image(source);
};
