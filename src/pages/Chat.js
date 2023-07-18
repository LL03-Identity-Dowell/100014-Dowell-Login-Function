import axios from "axios";
import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";

const Chat = () => {
  const [sessionID, setSessionID] = useState("");

  useEffect(() => {
    generateSessionID();
  }, []);

  const generateSessionID = async () => {
    try {
      const response = await axios.get(
        "https://100014.pythonanywhere.com/api/login_init_api/"
      );
      const qridLogin = response.data.qrid_login;
      setSessionID(qridLogin);
    } catch (error) {
      console.error("Error generating session ID:", error);
    }
  };

  const getChatAppURL = () => {
    const baseURL = "https://100096.pythonanywhere.com/chat/login/";
    const chatAppURL = `${baseURL}?session_id=${sessionID}`;
    return chatAppURL;
  };

  return (
    <div className="max-w-3xl space-y-2 flex flex-col items-center">
      <h2 className="font-semibold text-lg text-white bg-green-500 px-6 py-1 rounded-3xl">
        Chat with UX Living Lab
      </h2>
      <Iframe
        url={getChatAppURL()}
        width="100%"
        height="350px"
        id="chatAppFrame"
        className="py-4 px-6"
        display="initial"
        position="relative"
      />
    </div>
  );
};

export default Chat;
