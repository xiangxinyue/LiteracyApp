import React from "react";

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      // here we can change the still about the error page!
      return <div>Something is WRONG!</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
