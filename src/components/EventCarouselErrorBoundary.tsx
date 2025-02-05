import React, { Component, ErrorInfo, ReactNode } from "react";
import { debug } from "../utils/debug";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string;
}

export class EventCarouselErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: "",
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    debug.error("EventCarousel Error:", error);
    debug.error("ErrorInfo:", errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: "" });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-[400px] flex flex-col items-center justify-center bg-black text-white p-4">
          <p className="text-red-500 mb-4">
            Something went wrong displaying the events.
          </p>
          <button
            onClick={this.handleRetry}
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
          >
            Try Again
          </button>
          {import.meta.env.DEV && (
            <pre className="mt-4 text-xs text-gray-400 max-w-full overflow-auto">
              {this.state.errorInfo}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export class VirtualizationErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: "",
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    debug.error("Virtualization Error:", error);
    debug.error("ErrorInfo:", errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-[400px] flex items-center justify-center bg-black">
          <span className="text-white">
            Unable to display events. Please refresh the page.
          </span>
        </div>
      );
    }

    return this.props.children;
  }
}

export class AnimationErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: "",
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    debug.error("Animation Error:", error);
    debug.error("ErrorInfo:", errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.children; // Fallback to static display without animation
    }

    return this.props.children;
  }
}
