import React, { useEffect, useState } from "react";
import axios from "axios";
import Iframe from "react-iframe";
import { Radio } from "react-loader-spinner";

const Policy = () => {
  const [sessionID, setSessionID] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateRandomSessionID();
  }, []);

  const generateRandomSessionID = async () => {
    try {
      const response = await axios.get(
        "https://100014.pythonanywhere.com/api/login_init_api/"
      );
      const randomSessionID = response.data.random_session;
      setSessionID(randomSessionID);
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating session ID:", error);
    }
  };

  const getIframeURL = () => {
    const baseURL =
      "https://100087.pythonanywhere.com/legalpolicies/FB1010000000167475042357408025/website-privacy-policy/policies/";
    const redirectURL = `https://100014.pythonanywhere.com/legalpolicy1?s=${sessionID}&session_id=${sessionID}`;
    return `${baseURL}?redirect_url=${encodeURIComponent(redirectURL)}`;
  };

  return (
    <div className="max-w-3xl space-y-2 flex flex-col items-center">
      <h2 className="font-semibold text-lg text-white bg-green-500 px-6 py-1 rounded-3xl">
        Legal, Privacy, Safety, Security Policies
      </h2>
      {isLoading ? (
        <Radio
          visible={true}
          height={30}
          width={30}
          ariaLabel="radio-loading"
          wrapperStyle={{}}
          wrapperClassName="radio-wrapper"
          color="#1ff507"
        />
      ) : (
        <Iframe
          url={getIframeURL()}
          width="100%"
          height="330px"
          id="myFrame"
          className="py-1"
          display="initial"
          position="relative"
          scrolling="yes"
        />
      )}
    </div>
  );
};

export default Policy;
