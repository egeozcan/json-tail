import * as React from "react";
import { PropsWithChildren } from "react";

export interface IErrorBoundaryState {
  hasError: boolean;
  errorText?: string;
}

export class ErrorBoundary extends React.Component<
  PropsWithChildren<{}>,
  IErrorBoundaryState
> {
  constructor(props: PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorText: error.message };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          Something went wrong when rendering this individual log.
          <pre>{this.state.errorText}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}
