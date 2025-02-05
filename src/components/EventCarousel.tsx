/* eslint-env browser, es2020, dom */
/* global IntersectionObserver, HTMLImageElement, DOMMatrix, requestAnimationFrame, cancelAnimationFrame, console */
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  type ReactElement,
  type RefObject,
  type ElementRef,
} from "react";
import { motion, useAnimationControls } from "framer-motion";
import type { MotionProps } from "framer-motion";
import { client, urlFor } from "../lib/sanity";
import { SanityEvent } from "../types/sanity";
import { EventCarouselErrorBoundary } from "./EventCarouselErrorBoundary";

// Declare globals for TypeScript
declare global {
  interface Window {
    DOMMatrix: typeof DOMMatrix;
  }
}

// Performance thresholds (in milliseconds)
const PERFORMANCE_THRESHOLDS = {
  SLOW_ANIMATION: 16.67, // 60fps frame budget
  SLOW_IMAGE_LOAD: 1000,
  SLOW_FETCH: 2000,
} as const;

// Performance marks
const PERFORMANCE_MARKS = {
  FETCH_START: "event-carousel-fetch-start",
  FETCH_END: "event-carousel-fetch-end",
  RENDER_START: "event-carousel-render-start",
  RENDER_END: "event-carousel-render-end",
  IMAGE_LOAD_START: "event-image-load-start",
  IMAGE_LOAD_END: "event-image-load-end",
} as const;

// Use ElementRef type directly
type DivElement = ElementRef<"div">;

interface EventCarouselContentProps {
  events: SanityEvent[];
  containerRef: RefObject<DivElement>;
  controls: ReturnType<typeof useAnimationControls>;
}

// Augment the global scope
declare global {
  interface Window {
    performance: Performance;
    Image: {
      new (): HTMLImageElement;
      prototype: HTMLImageElement;
    };
  }

  interface Performance {
    mark(name: string): void;
    measure(
      name: string,
      startMark: string,
      endMark: string,
    ): {
      duration: number;
      entryType: string;
      name: string;
      startTime: number;
      toJSON(): any;
    };
  }
}

// Update debug module type
declare module "../utils/debug" {
  interface Debug {
    log: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
  }
}

// Configuration for virtualization
const VIRTUALIZATION_CONFIG = {
  ITEM_WIDTH: 300,
  ITEM_GAP: 16,
  BUFFER_ITEMS: 8,
  CONTAINER_HEIGHT: 400,
  SCROLL_DURATION: 20,
  RESET_THRESHOLD: 0.5,
  BUFFER_MULTIPLIER: 4,
  MIN_VISIBLE_SETS: 2,
  RESIZE_DEBOUNCE_MS: 150, // Debounce resize events
} as const;

/**
 * EventCarousel component displays a continuously scrolling carousel of events.
 * Events are fetched from Sanity CMS and displayed in a repeating pattern.
 *
 * @component
 * @example
 * return (
 *   <EventCarousel />
 * )
 */
export function EventCarousel(): ReactElement {
  const containerRef = useRef<DivElement>(null);
  const carouselRef = useRef<DivElement>(null);
  const controls = useAnimationControls();
  const [singleSetWidth, setSingleSetWidth] = useState(0);
  const isAnimatingRef = useRef(true);
  const [events, setEvents] = useState<SanityEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasIntersectionSupport] = useState(
    () => typeof window !== "undefined" && "IntersectionObserver" in window,
  );
  const [performanceMode, setPerformanceMode] = useState<"high" | "low">(
    "high",
  );

  // Animation function with performance optimization
  const animate = useCallback(
    async function animate() {
      if (!isAnimatingRef.current || typeof window === "undefined") return;

      try {
        window.performance.mark(PERFORMANCE_MARKS.RENDER_START);

        await controls.start({
          x: [-0, -singleSetWidth],
          transition: {
            x: {
              duration: performanceMode === "high" ? 30 : 45,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 0,
            },
          },
        });

        window.performance.mark(PERFORMANCE_MARKS.RENDER_END);
        const measure = window.performance.measure(
          "carousel-animation",
          PERFORMANCE_MARKS.RENDER_START,
          PERFORMANCE_MARKS.RENDER_END,
        );

        if (measure.duration > PERFORMANCE_THRESHOLDS.SLOW_ANIMATION) {
          setPerformanceMode("low");
        }
      } catch (err) {
        console.error("Animation error:", err);
        controls.set({ x: 0 });
      }
    },
    [controls, singleSetWidth, performanceMode],
  );

  // Fetch with performance optimization
  useEffect(() => {
    async function fetchEvents(): Promise<void> {
      if (typeof window === "undefined") return;

      window.performance.mark(PERFORMANCE_MARKS.FETCH_START);
      const today = new Date();
      const eightWeeksFromNow = new Date();
      eightWeeksFromNow.setDate(today.getDate() + 56);

      try {
        const fetchedEvents = await client.fetch<SanityEvent[]>(
          `*[_type == "event" && eventDate >= $today && eventDate <= $eightWeeksFromNow] | order(eventDate asc)`,
          {
            today: today.toISOString(),
            eightWeeksFromNow: eightWeeksFromNow.toISOString(),
          },
        );

        window.performance.mark(PERFORMANCE_MARKS.FETCH_END);
        const measure = window.performance.measure(
          "events-fetch",
          PERFORMANCE_MARKS.FETCH_START,
          PERFORMANCE_MARKS.FETCH_END,
        );

        if (measure.duration > PERFORMANCE_THRESHOLDS.SLOW_FETCH) {
          console.warn("Slow fetch detected, reducing batch size");
          setEvents(fetchedEvents.slice(0, 10)); // Reduce number of events if fetch is slow
        } else {
          setEvents(fetchedEvents);
        }
      } catch (err) {
        console.error("Error details:", err);
        setError(
          err instanceof Error
            ? `Failed to load events: ${err.message}`
            : "Failed to load events: Unknown error",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents().catch(console.error);
  }, []);

  // Optimized image preloading
  const preloadImages = useCallback(
    (imagesToPreload: SanityEvent[]) => {
      imagesToPreload.forEach((event) => {
        if (event.mainImage) {
          window.performance.mark(PERFORMANCE_MARKS.IMAGE_LOAD_START);

          if (typeof window !== "undefined" && "Image" in window) {
            const img = new window.Image();
            img.onload = () => {
              window.performance.mark(PERFORMANCE_MARKS.IMAGE_LOAD_END);
              const measure = window.performance.measure(
                "image-preload",
                PERFORMANCE_MARKS.IMAGE_LOAD_START,
                PERFORMANCE_MARKS.IMAGE_LOAD_END,
              );

              // Adjust quality based on load time
              if (measure.duration > PERFORMANCE_THRESHOLDS.SLOW_IMAGE_LOAD) {
                setPerformanceMode("low");
              }
            };

            const quality = performanceMode === "high" ? 80 : 60;
            img.src = urlFor(event.mainImage)
              .width(300)
              .height(400)
              .quality(quality)
              .format("webp")
              .url();
          }
        }
      });
    },
    [performanceMode],
  );

  // Intersection Observer with performance optimization
  useEffect(() => {
    if (!hasIntersectionSupport || typeof window === "undefined") {
      isAnimatingRef.current = true;
      animate().catch(console.error);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isAnimatingRef.current = true;
            animate().catch(console.error);
            if (performanceMode === "low") {
              preloadImages(events.slice(0, 3));
            } else {
              preloadImages(events.slice(0, 6));
            }
          } else {
            isAnimatingRef.current = false;
            controls.stop();
          }
        });
      },
      { threshold: 0.1 },
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => observer.disconnect();
  }, [
    controls,
    animate,
    hasIntersectionSupport,
    events,
    performanceMode,
    preloadImages,
  ]);

  const handleRetry = useCallback(function handleRetry(): void {
    setError(null);
    setEvents([]);
    setIsLoading(true);
  }, []);

  const updateWidth = useCallback(function updateWidth(): void {
    if (!containerRef.current) return;
    const width = containerRef.current.scrollWidth / 3;
    setSingleSetWidth(width);
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [updateWidth, events]);

  if (error) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center space-y-4 bg-black">
        <span className="text-white">{error}</span>
        <button
          type="button"
          onClick={handleRetry}
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading || !events.length) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center bg-black">
        <span className="text-white">Loading events...</span>
      </div>
    );
  }

  return (
    <EventCarouselErrorBoundary>
      <div ref={carouselRef}>
        <EventCarouselContent
          events={events}
          containerRef={containerRef}
          controls={controls}
        />
      </div>
    </EventCarouselErrorBoundary>
  );
}

/**
 * Renders the content of the event carousel
 */
function EventCarouselContent({
  events,
  containerRef,
  controls,
}: EventCarouselContentProps): ReactElement {
  const [containerWidth, setContainerWidth] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const resetInProgressRef = useRef(false);
  const resizeTimeoutRef = useRef<number>();
  const animationFrameRef = useRef<number>();

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      window.clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = window.setTimeout(() => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }, VIRTUALIZATION_CONFIG.RESIZE_DEBOUNCE_MS);
  }, [containerRef]);

  // Update container width on mount and resize
  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef) {
      setContainerWidth(currentRef.offsetWidth);
    }

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        window.clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [handleResize, containerRef]);

  // Memoize item width calculation
  const itemWidth = useMemo(
    () => VIRTUALIZATION_CONFIG.ITEM_WIDTH + VIRTUALIZATION_CONFIG.ITEM_GAP,
    [],
  );

  // Memoize single set width calculation
  const singleSetWidth = useMemo(
    () => events.length * itemWidth,
    [events.length, itemWidth],
  );

  // Calculate virtual items with performance optimizations
  const virtualItems = useMemo(() => {
    const itemsPerScreen = Math.ceil(containerWidth / itemWidth);
    const minItems = itemsPerScreen * VIRTUALIZATION_CONFIG.MIN_VISIBLE_SETS;
    const totalSets = Math.max(
      VIRTUALIZATION_CONFIG.BUFFER_MULTIPLIER,
      Math.ceil(minItems / events.length),
    );
    const totalItems = events.length * totalSets;

    return Array.from({ length: totalItems }, (_, i) => {
      const eventIndex = i % events.length;
      return {
        ...events[eventIndex],
        key: `${events[eventIndex]._id}-${Math.floor(i / events.length)}-${eventIndex}`,
        position: i * itemWidth,
      };
    });
  }, [events, containerWidth, itemWidth]);

  // Optimized animation handler
  const startAnimation = useCallback(() => {
    resetInProgressRef.current = false;
    setIsResetting(false);
    void controls.start({
      x: -singleSetWidth,
      transition: {
        duration: VIRTUALIZATION_CONFIG.SCROLL_DURATION,
        ease: "linear",
        repeat: 0,
      },
    });
  }, [controls, singleSetWidth]);

  // Handle animation and virtualization with optimizations
  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef || !controls || !containerWidth) return;

    const updatePosition = () => {
      const element = currentRef;
      if (!element || resetInProgressRef.current) return;

      const transform = window.getComputedStyle(element).transform;
      const matrix = new DOMMatrix(transform);
      const currentX = Math.abs(matrix.m41);

      if (currentX >= singleSetWidth) {
        resetInProgressRef.current = true;
        setIsResetting(true);
        void controls.set({ x: 0 });
        startAnimation();
      }

      animationFrameRef.current = requestAnimationFrame(updatePosition);
    };

    startAnimation();
    animationFrameRef.current = requestAnimationFrame(updatePosition);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [controls, containerWidth, singleSetWidth, startAnimation, containerRef]);

  const carouselStyle = useMemo(
    () => ({
      width: virtualItems.length * itemWidth,
      willChange: "transform",
      backfaceVisibility: "hidden" as const,
      WebkitBackfaceVisibility: "hidden" as const,
      transition: isResetting ? "none" : undefined,
    }),
    [virtualItems.length, itemWidth, isResetting],
  );

  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{ height: VIRTUALIZATION_CONFIG.CONTAINER_HEIGHT }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
      <motion.div
        ref={containerRef}
        className="relative h-full"
        animate={controls as MotionProps["animate"]}
        initial={{ x: 0 }}
        style={carouselStyle}
      >
        {virtualItems.map((item) => (
          <EventCard
            key={item.key}
            event={item}
            style={{
              position: "absolute",
              left: item.position,
              top: 0,
              width: VIRTUALIZATION_CONFIG.ITEM_WIDTH,
              padding: `0 ${VIRTUALIZATION_CONFIG.ITEM_GAP / 2}px`,
            }}
          />
        ))}
      </motion.div>
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
    </div>
  );
}

/**
 * Renders an individual event card
 */
function EventCard({
  event,
  style,
}: {
  event: SanityEvent;
  style?: React.CSSProperties;
}): ReactElement {
  const eventDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="relative h-full flex-shrink-0 group" style={style}>
      <EventImage event={event} />
      <EventInfo event={event} eventDate={eventDate} />
    </div>
  );
}

/**
 * Renders the event image
 */
function EventImage({ event }: { event: SanityEvent }): ReactElement | null {
  if (!event.mainImage) {
    console.log("No mainImage for event:", event._id);
    return null;
  }

  try {
    const imageUrl = urlFor(event.mainImage)
      .width(300)
      .height(400)
      .quality(80)
      .format("webp")
      .url();

    return (
      <img
        src={imageUrl}
        alt={event.mainImage.alt || "Event image"}
        className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:brightness-75"
        loading="lazy"
        decoding="async"
        width={300}
        height={400}
      />
    );
  } catch (error) {
    console.error("Error creating image URL:", error);
    console.error("mainImage data causing error:", event.mainImage);
    return null;
  }
}

/**
 * Renders the event information overlay
 */
function EventInfo({
  event,
  eventDate,
}: {
  event: SanityEvent;
  eventDate: string;
}): ReactElement {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-white font-semibold">{event.title}</span>
          <span className="text-white text-sm">{eventDate}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-300 text-xs px-2 py-1 bg-gray-800 rounded-full">
            {event.category}
          </span>
          {event.venue && (
            <span className="text-gray-300 text-xs">{event.venue.name}</span>
          )}
        </div>
      </div>
    </div>
  );
}
