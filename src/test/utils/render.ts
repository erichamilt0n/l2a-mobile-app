import { type ReactElement } from "react";
import { render as rtlRender } from "@testing-library/react";
import { TestWrapper } from "../components/TestWrapper";

/**
 * Custom render function that wraps component with test providers
 */
export const render = (ui: ReactElement) =>
  rtlRender(ui, { wrapper: TestWrapper });
