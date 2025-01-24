"use client";

import { Component, ErrorInfo, ReactNode, useRef, useState } from "react";
import { useScratch } from "react-use";

interface Props {
  children: ReactNode;
  fallbackComponent: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) return this.props.fallbackComponent;
    return this.props.children;
  }
}

export const UnexpectedErrorBoundary = () => {
  return <div></div>;
};
