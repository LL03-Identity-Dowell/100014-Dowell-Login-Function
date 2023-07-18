import { useEffect, useState } from "react";
import axios from "axios";
import Iframe from "react-iframe";

const Policy = () => {
  const [sessionID, setSessionID] = useState("");

  useEffect(() => {
    generateRandomSessionID();
  });

  const generateRandomSessionID = async () => {
    try {
      const response = await axios.get(
        "https://100014.pythonanywhere.com/api/login_init_api/"
      );
      const randomSessionID = response.data.session_id;
      setSessionID(randomSessionID);
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
      <Iframe
        url={getIframeURL()}
        width="100%"
        height="350px"
        id="myFrame"
        className="py-1"
        display="initial"
        position="relative"
      />
    </div>
  );
};

export default Policy;
