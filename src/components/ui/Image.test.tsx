import { describe, it, expect } from "vitest";
import { render, screen } from "@/test";
import Image from "./Image";

describe("Image Component", () => {
  it("renders with basic props", () => {
    render(
      <Image src="/test-image.jpg" alt="Test image" width={100} height={100} />,
    );

    const img = screen.getByAltText("Test image");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/test-image.jpg");
    expect(img).toHaveAttribute("width", "100");
    expect(img).toHaveAttribute("height", "100");
  });

  it("applies loading strategy", () => {
    render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        loading="lazy"
      />,
    );

    const img = screen.getByAltText("Test image");
    expect(img).toHaveAttribute("loading", "lazy");
  });

  it("handles priority loading", () => {
    render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        priority
      />,
    );

    const img = screen.getByAltText("Test image");
    expect(img).toHaveAttribute("loading", "eager");
  });

  it("applies custom className", () => {
    render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        className="custom-image"
      />,
    );

    const img = screen.getByAltText("Test image");
    expect(img).toHaveClass("custom-image");
  });
});
