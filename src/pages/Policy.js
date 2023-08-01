import React, { useEffect } from "react";
import Iframe from "react-iframe";
import { Radio } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomSessionID } from "../redux/sessionSlice";

const Policy = () => {
  const dispatch = useDispatch();
  const { randomSession, isLoading } = useSelector((state) => state.session);

  useEffect(() => {
    if (!randomSession) {
      dispatch(generateRandomSessionID());
    }
  }, [randomSession, dispatch]);

  const getIframeURL = () => {
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
