/// <reference lib="dom" />
/// <reference types="node" />

import { describe, it, expect, beforeEach, vi } from "vitest";
import Image from "../Image";
import { render, screen, waitFor, act } from "@testing-library/react";

describe("Image Component", () => {
  // Mock IntersectionObserver
  beforeEach(() => {
    const mockIntersectionObserver = vi
      .fn()
      .mockImplementation(
        (
          callback: (entries: globalThis.IntersectionObserverEntry[]) => void,
        ) => {
          // Create a simple mock rect object instead of using DOMRectReadOnly
          const mockRect = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            toJSON: () => ({}),
          };

          const mockEntry: Partial<globalThis.IntersectionObserverEntry> = {
            isIntersecting: true,
            target: document.createElement("div"),
            boundingClientRect: mockRect,
            intersectionRatio: 1,
            intersectionRect: mockRect,
            rootBounds: mockRect,
            time: Date.now(),
          };

          window.setTimeout(() => {
            callback([mockEntry as globalThis.IntersectionObserverEntry]);
          }, 0);

          return {
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
          };
        },
      );

    window.IntersectionObserver =
      mockIntersectionObserver as unknown as typeof window.IntersectionObserver;
  });

  it("renders with basic props", async () => {
    render(
      <Image
        src="http://example.com/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
      />,
    );

    await waitFor(() => {
      const img = screen.getByAltText("Test image");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute(
        "src",
        expect.stringContaining("test-image.jpg"),
      );
      expect(img).toHaveAttribute("width", "100");
      expect(img).toHaveAttribute("height", "100");
    });
  });

  it("applies loading strategy", async () => {
    render(
      <Image
        src="http://example.com/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        loading="lazy"
      />,
    );

    await waitFor(() => {
      const img = screen.getByAltText("Test image");
      expect(img).toHaveAttribute("loading", "lazy");
    });
  });

  it("handles priority loading", async () => {
    render(
      <Image
        src="http://example.com/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        priority
      />,
    );

    await waitFor(() => {
      const img = screen.getByAltText("Test image");
      expect(img).toHaveAttribute("loading", "eager");
      expect(img).toHaveAttribute(
        "src",
        expect.stringContaining("test-image.jpg"),
      );
    });
  });

  it("applies custom className", async () => {
    render(
      <Image
        src="http://example.com/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        className="custom-image"
      />,
    );

    await waitFor(() => {
      const img = screen.getByAltText("Test image");
      expect(img).toHaveClass("custom-image");
    });
  });

  it("handles image load completion", async () => {
    render(
      <Image
        src="http://example.com/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
      />,
    );

    const img = screen.getByAltText("Test image");

    await act(async () => {
      img.dispatchEvent(new window.Event("load"));
    });

    await waitFor(() => {
      expect(img).toHaveClass("loaded");
    });
  });

  it("applies URL parameters correctly", async () => {
    render(
      <Image
        src="http://example.com/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        quality={80}
        webp
      />,
    );

    await waitFor(() => {
      const img = screen.getByAltText("Test image");
      const src = img.getAttribute("src");
      expect(src).toContain("w=100");
      expect(src).toContain("h=100");
      expect(src).toContain("q=80");
      expect(src).toContain("fm=webp");
    });
  });
});
