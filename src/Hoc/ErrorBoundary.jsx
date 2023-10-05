import React, { useEffect, useState } from "react";

const ErrorBoundary = (props) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleErrors = () => {
      setHasError(true);
    };
    window.addEventListener("error", handleErrors);

    return () => {
      window.removeEventListener("error", handleErrors);
    };
  }, []);

  if (hasError) {
    return <h1>Something went wrong. Server is down.</h1>;
  }

  return props.children;
};

export default ErrorBoundary;
