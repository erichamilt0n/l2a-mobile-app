import React, { useState, useEffect } from "react";
import { urlFor } from "../lib/sanity";
import { debug } from "../utils/debug";

interface ImageProps {
  src?: string | any; // Accept Sanity image reference
  alt: string;
  className?: string;
}

export function Image({
  src,
  alt,
  className = "",
}: ImageProps): React.ReactElement {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!src) {
      setError(true);
      return;
    }

    try {
      // Handle Sanity image reference
      if (typeof src === "object" && src._type === "image") {
        const imageUrl = urlFor(src).url();
        setImageSrc(imageUrl);
        return;
      }

      // Handle regular URLs
      if (typeof src === "string") {
        setImageSrc(src);
        return;
      }

      setError(true);
    } catch (err) {
      debug.error("Error parsing image source:", err);
      setError(true);
    }
  }, [src]);

  if (error || !imageSrc) {
    return (
      <div className={`bg-gray-200 ${className}`}>
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-400">Image not available</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
