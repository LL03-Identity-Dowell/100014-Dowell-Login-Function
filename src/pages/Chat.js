import React from "react";
import Iframe from "react-iframe";
import { useSelector } from "react-redux";
import { Radio } from "react-loader-spinner";

const Chat = () => {
  const { chatSessionID, status } = useSelector((state) => state.session);

  const getChatAppURL = () => {
    const baseURL = "https://100096.pythonanywhere.com/chat/login/";
    const chatAppURL = `${baseURL}?session_id=${chatSessionID}`;
    return chatAppURL;
  };

  return (
    <div className="max-w-3xl space-y-2 flex flex-col items-center">
      <h2 className="font-semibold text-lg text-white bg-green-500 px-6 py-1 rounded-3xl">
        Chat with UX Living Lab
      </h2>
      {status === "loading" ? (
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
          url={getChatAppURL()}
          width="100%"
          height="350px"
          id="chatAppFrame"
          className="py-4 px-6"
          display="initial"
          position="relative"
        />
      )}
    </div>
  );
};

export default Chat;
