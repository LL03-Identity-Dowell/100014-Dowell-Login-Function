import React from "react";
import Iframe from "react-iframe";
import { Radio } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Policy = () => {
  const { initSession, isLoading } = useSelector((state) => state.init);

  const getIframeURL = () => {
    const randomSession = initSession.random_session;
    const baseURL =
      "https://100087.pythonanywhere.com/legalpolicies/FB1010000000167475042357408025/website-privacy-policy/policies/";
    const redirectURL = `https://100014.pythonanywhere.com/legalpolicy1?s=${randomSession}&session_id=${randomSession}`;
    return `${baseURL}?redirect_url=${redirectURL}`;
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
          id="myFrame"
          className="py-1 w-full h-[500px] md:h-[350px]"
          display="initial"
          position="relative"
          scrolling="yes"
        />
      )}
    </div>
  );
};

export default Policy;
