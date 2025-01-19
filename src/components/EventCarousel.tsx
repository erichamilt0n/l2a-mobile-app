/* eslint-env browser, es2020 */
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactElement,
  type RefObject,
  type ElementRef,
} from "react";
import { motion, useAnimationControls } from "framer-motion";
import type { MotionProps } from "framer-motion";
import { client, urlFor } from "../lib/sanity";
import { SanityEvent } from "../types/sanity";
import { debug } from "../utils/debug";

// Use ElementRef type directly
type DivElement = ElementRef<"div">;

interface EventCarouselContentProps {
  events: SanityEvent[];
  containerRef: RefObject<DivElement>;
  controls: MotionProps["animate"];
}

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
  const controls = useAnimationControls();
  const [singleSetWidth, setSingleSetWidth] = useState(0);
  const isAnimatingRef = useRef(true);
  const [events, setEvents] = useState<SanityEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetches upcoming events from Sanity CMS for the next 8 weeks
     * Orders events by date in ascending order
     * @async
     * @returns {Promise<void>} A promise that resolves when events are fetched
     * @throws {Error} If the response format is invalid or if the fetch fails
     */
    async function fetchEvents(): Promise<void> {
      const today = new Date();
      const eightWeeksFromNow = new Date();
      eightWeeksFromNow.setDate(today.getDate() + 56);

      const query = `*[
        _type == "event" && 
        eventDate >= $today && 
        eventDate <= $eightWeeksFromNow
      ] | order(eventDate asc) {
        _id,
        title,
        slug,
        eventDate,
        endDate,
        category,
        venue,
        mainImage,
        capacity
      }`;

      try {
        const fetchedEvents = await client.fetch<SanityEvent[]>(query, {
          today: today.toISOString(),
          eightWeeksFromNow: eightWeeksFromNow.toISOString(),
        });

        if (!fetchedEvents || !Array.isArray(fetchedEvents)) {
          throw new Error("Invalid response format");
        }
        setEvents(fetchedEvents);
      } catch (err) {
        debug.error("Error details:", err);
        setError(
          err instanceof Error
            ? `Failed to load events: ${err.message}`
            : "Failed to load events: Unknown error"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents().catch((err) => {
      debug.error("Failed to fetch events:", err);
    });
  }, []);

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

  useEffect(() => {
    if (singleSetWidth === 0 || !events.length) {
      isAnimatingRef.current = false;
      return undefined;
    }

    isAnimatingRef.current = true;

    /**
     * Handles the continuous animation of the carousel
     * Creates a seamless infinite scroll effect
     * @async
     * @returns {Promise<void>} A promise that resolves when animation completes
     */
    async function animate() {
      await controls.start({
        x: [-0, -singleSetWidth],
        transition: {
          x: {
            duration: 30,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0,
          },
        },
      });
    }

    animate().catch((err) => {
      debug.error("Animation error:", err);
    });

    return () => {
      isAnimatingRef.current = false;
    };
  }, [controls, singleSetWidth, events.length]);

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
    <EventCarouselContent
      events={events}
      containerRef={containerRef}
      controls={controls}
    />
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
  const eventList = [
    ...events.map((event) => ({ ...event, key: `${event._id}-1` })),
    ...events.map((event) => ({ ...event, key: `${event._id}-2` })),
    ...events.map((event) => ({ ...event, key: `${event._id}-3` })),
  ];

  return (
    <div className="relative w-full overflow-hidden bg-black">
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
      <motion.div
        ref={containerRef}
        className="flex gap-4 py-8"
        animate={controls}
        initial={{ x: 0 }}
      >
        {eventList.map((event) => (
          <EventCard key={event.key} event={event} />
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
function EventCard({ event }: { event: SanityEvent }): ReactElement {
  const eventDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="relative w-[300px] h-[400px] flex-shrink-0 mx-4 group">
      <EventImage event={event} />
      <EventInfo event={event} eventDate={eventDate} />
    </div>
  );
}

/**
 * Renders the event image
 */
function EventImage({ event }: { event: SanityEvent }): ReactElement | null {
  if (!event.mainImage) return null;

  return (
    <img
      src={urlFor(event.mainImage).width(300).height(400).url()}
      alt={event.mainImage.alt || "Event image"}
      className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:brightness-75"
    />
  );
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
