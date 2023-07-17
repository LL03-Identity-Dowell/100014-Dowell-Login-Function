import React from "react";
import Iframe from "react-iframe";

const Chat = () => {
  return (
    <div className="max-w-3xl space-y-2 flex flex-col items-center">
      <h2 className="font-semibold text-lg text-white bg-green-500 px-6 py-1 rounded-3xl">
        Chat with UX Living Lab
      </h2>
      <Iframe
        url="https://100096.pythonanywhere.com/chat/login/?session_id=test"
        width="100%"
        height="350px"
        id="chatAppFrame"
        className="py-1 px-2"
        display="initial"
        position="relative"
      />
    </div>
  );
};

export default Chat;
