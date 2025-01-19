/* eslint-env browser, es2020 */

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
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
  projectId,
  dataset,
  useCdn: false,
  apiVersion: "2023-05-03",
  token,
  withCredentials: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
