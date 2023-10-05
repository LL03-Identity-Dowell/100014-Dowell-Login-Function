import React, { useEffect, useState } from "react";

const withNetworkDetector = (ComposedComponent) => {
  const NetworkDetector = (props) => {
    const [isDisconnected, setIsDisconnected] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const handleConnectionChange = () => {
        const condition = navigator.onLine ? "online" : "offline";
        if (condition === "online") {
          const webPing = setInterval(() => {
            fetch("//100014.pythonanywhere.com", {
              mode: "no-cors",
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                setIsDisconnected(false);
                setError(null);
                clearInterval(webPing);
              })
              .catch((error) => {
                setIsDisconnected(true);
                setError(error.message);
                clearInterval(webPing);
              });
          }, 2000);
          return () => clearInterval(webPing);
        }
        setIsDisconnected(true);
      };
      handleConnectionChange();

      window.addEventListener("online", handleConnectionChange);
      window.addEventListener("offline", handleConnectionChange);

      return () => {
        window.addEventListener("online", handleConnectionChange);
        window.addEventListener("offline", handleConnectionChange);
      };
    }, []);

    return (
      <div>
        {isDisconnected && (
          <div className="h-[60px] bg-[#ff8100] mt-0 font-normal">
            <p className="font-medium leading-6 text-white m-0">
              Internet connection lost
            </p>
          </div>
        )}
        {error && (
          <div>
            <p className="text-red-500">{error}</p>
          </div>
        )}
        <ComposedComponent {...props} />
      </div>
    );
  };
  return NetworkDetector;
};

export default withNetworkDetector;
