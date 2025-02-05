/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import type { FC, CSSProperties, SyntheticEvent } from "react";
import { useEffect, useRef, useState, useCallback } from "react";

/// <reference lib="dom" />

type ImageElement = typeof window.HTMLImageElement;
type Observer = typeof window.IntersectionObserver;

/**
 * Image component with lazy loading and optimization features
 * @component
 */
interface ImageProps {
  /** Source URL of the image */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional CSS class name */
  className?: string;
  /** Image width in pixels */
  width?: number;
  /** Image height in pixels */
  height?: number;
  /** Loading strategy */
  loading?: "lazy" | "eager";
  /** Whether to load the image immediately */
  priority?: boolean;
  /** Whether to convert image to WebP format */
  webp?: boolean;
  /** Image quality (1-100) */
  quality?: number;
  /** CSS class for loading animation */
  loadingAnimation?: string;
  /** Whether to show skeleton loading */
  showSkeleton?: boolean;
  /** Fallback image URL */
  fallback?: string;
  /** Responsive image srcSet */
  srcSet?: string;
  /** Responsive image sizes */
  sizes?: string;
  /** Placeholder image URL */
  placeholder?: string;
  /** CSS object-fit property */
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  /** Additional CSS styles */
  style?: CSSProperties;
}

/**
 * A React component for optimized image loading
 */
const Image: FC<ImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  loading = "lazy",
  priority = false,
  webp = false,
  quality = 75,
  loadingAnimation,
  showSkeleton = false,
  fallback,
  srcSet,
  sizes,
  placeholder,
  objectFit,
  style,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<InstanceType<ImageElement>>(null);
  const observerRef = useRef<InstanceType<Observer> | null>(null);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.src = src;
    }
  }, [src]);

  /**
   * Cleanup function for the intersection observer
   */
  const cleanupObserver = useCallback((): void => {
    if (observerRef.current && imgRef.current) {
      observerRef.current.unobserve(imgRef.current);
      observerRef.current.disconnect();
    }
  }, []);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return undefined;
    }

    const currentImg = imgRef.current;
    if (!currentImg) return undefined;

    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          cleanupObserver();
        }
      });
    });

    observer.observe(currentImg);
    observerRef.current = observer;

    return cleanupObserver;
  }, [priority, cleanupObserver]);

  /**
   * Handle image load completion
   */
  const handleLoad = useCallback((): void => {
    setIsLoaded(true);
  }, []);

  /**
   * Handle image load error
   */
  const handleError = useCallback(
    (e: SyntheticEvent<InstanceType<ImageElement>>): void => {
      if (fallback && e.currentTarget.src !== fallback) {
        e.currentTarget.src = fallback;
      }
    },
    [fallback],
  );

  /**
   * Generate optimized image URL with parameters
   */
  const getImageUrl = useCallback(
    (url: string): string => {
      try {
        const parsedUrl = url.startsWith('http') ? new URL(url) : new URL(url, window.location.origin);
        const pathname = parsedUrl.pathname;
        const params = new URLSearchParams(parsedUrl.search);

        if (width) params.set("w", width.toString());
        if (height) params.set("h", height.toString());
        if (quality) params.set("q", quality.toString());
        if (webp) params.set("fm", "webp");

        return `${pathname}?${params.toString()}`;
      } catch (error) {
        console.error("Error parsing URL:", error);
        return url;
      }
    },
    [height, quality, webp, width],
  );

  const combinedStyle = {
    ...style,
    objectFit,
  };

  return (
    <img
      ref={imgRef}
      src={isInView || priority ? getImageUrl(src) : placeholder || ""}
      alt={alt}
      className={`
        ${className || ""} 
        ${isLoaded ? "loaded" : ""} 
        ${loadingAnimation || ""} 
        ${showSkeleton ? "skeleton" : ""}
      `.trim()}
      onLoad={handleLoad}
      loading={priority ? "eager" : loading}
      width={width}
      height={height}
      srcSet={srcSet}
      sizes={sizes}
      style={combinedStyle}
      onError={handleError}
    />
  );
};

export default Image;
