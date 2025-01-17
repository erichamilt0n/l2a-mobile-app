/* eslint-env browser */
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

/* global HTMLDivElement, HTMLImageElement, Event, console */

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactElement,
  SyntheticEvent,
} from "react";
import { motion, useAnimationControls } from "framer-motion";

interface EventImage {
  id: number;
  url: string;
  category: string;
}

const images: EventImage[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=300&h=400&q=80",
    category: "Tournament",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=300&h=400&q=80",
    category: "Social",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=300&h=400&q=80",
    category: "Training",
  },
];

export function EventCarousel(): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [singleSetWidth, setSingleSetWidth] = useState(0);
  const isAnimatingRef = useRef(true);

  const updateWidth = useCallback((): void => {
    if (!containerRef.current) return;
    const width = containerRef.current.scrollWidth;
    setSingleSetWidth(width / 3);
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  useEffect(() => {
    if (singleSetWidth === 0) return;

    const animate = async () => {
      while (isAnimatingRef.current) {
        await controls.start({
          x: -singleSetWidth,
          transition: {
            duration: 20,
            ease: "linear",
          },
        });

        await controls.set({ x: 0 });
      }
    };

    animate().catch(console.error);

    // Cleanup function to stop animation
    return () => {
      isAnimatingRef.current = false;
    };
  }, [controls, singleSetWidth]);

  const handleImageError = useCallback(
    (_e: SyntheticEvent<HTMLImageElement, Event>): void => {
      // Silently handle image loading errors
    },
    [],
  );

  return (
    <div className="relative w-full overflow-hidden bg-black">
      {/* Left fade gradient */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      {/* Right fade gradient */}
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      <motion.div
        ref={containerRef}
        className="flex"
        animate={controls}
        initial={{ x: 0 }}
        style={{
          minHeight: "400px",
        }}
      >
        {[...images, ...images, ...images].map((image, index) => {
          const uniqueKey = `event-${image.id}-${image.category}-${index}`;
          return (
            <div
              key={uniqueKey}
              className="relative w-[300px] h-[400px] flex-shrink-0 mx-4"
            >
              <img
                src={image.url}
                alt={`Event ${image.id}`}
                className="w-full h-full object-cover rounded-lg transition-all duration-300 hover:brightness-110"
                onError={handleImageError}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <span className="text-white text-sm">{image.category}</span>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
