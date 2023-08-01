import React, { useEffect } from "react";
import Iframe from "react-iframe";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "react-loader-spinner";
import { generateSessionID } from "../redux/sessionSlice";

const Chat = () => {
  const dispatch = useDispatch();
  const { chatSessionID, status } = useSelector((state) => state.session);

  useEffect(() => {
    if (!chatSessionID) {
      dispatch(generateSessionID());
    }
  }, [chatSessionID, dispatch]);

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
