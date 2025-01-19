/* eslint-env browser, es2020 */

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { debug } from "../utils/debug";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const token = import.meta.env.VITE_SANITY_TOKEN;

if (!projectId) {
  throw new Error("Missing VITE_SANITY_PROJECT_ID");
}

if (!dataset) {
  throw new Error("Missing VITE_SANITY_DATASET");
}

if (!token) {
  throw new Error("Missing VITE_SANITY_TOKEN");
}

debug.log("Sanity Config:", {
  projectId,
  dataset,
  apiVersion: "2023-05-03",
  token: "(token provided)",
});

export const client = createClient({
  projectId: "your-project-id",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  apiHost: "https://api.sanity.io",
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
