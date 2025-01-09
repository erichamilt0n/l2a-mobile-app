import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Events from "./Events";

describe("Events Page", () => {
  it("renders without crashing", () => {
    render(<Events />);
    expect(screen.getByText("Upcoming Events")).toBeInTheDocument();
  });
});
