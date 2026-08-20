import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { hasError: boolean };

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="site-main content-page">
          <section className="content-page__inner">
            <h1>Something went wrong</h1>
            <p>Please refresh the page and try again.</p>
            <button className="button" type="button" onClick={() => window.location.reload()}>
              Refresh page
            </button>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}
