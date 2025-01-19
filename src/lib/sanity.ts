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
const token = import.meta.env.VITE_SANITY_TOKEN;

// Validation checks are good practice and implemented correctly
if (!projectId) {
  throw new Error("Missing VITE_SANITY_PROJECT_ID");
}
if (!dataset) {
  throw new Error("Missing VITE_SANITY_DATASET");
}
if (!token) {
  throw new Error("Missing VITE_SANITY_TOKEN");
}

// Debugging configuration is helpful for development
debug.log("Sanity Config:", {
  projectId,
  dataset,
  apiVersion: "2025-01-19",
  token: "(token provided)",
});

// Client configuration
export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-19", // Consider updating to a more recent API version
  useCdn: true,
  token,
  // In v3, perspective and stega options might be useful additions
  perspective: "published",
  // Only set withCredentials if you need CORS with credentials
  withCredentials: false,
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);

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
