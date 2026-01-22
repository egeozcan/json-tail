import { Component, type ErrorInfo, type PropsWithChildren } from "react";

export interface IErrorBoundaryState {
  hasError: boolean;
  errorText?: string;
}

export class ErrorBoundary extends Component<
  PropsWithChildren<object>,
  IErrorBoundaryState
> {
  constructor(props: PropsWithChildren<object>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorText: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
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
