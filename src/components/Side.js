import React from "react";
import { MdCall, MdEmail, MdLocationOn } from "react-icons/md";
import { SocialIcon } from "react-social-icons";
import DoWellLogo from "../assets/images/Dowell-logo.webp";

const Side = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <div className="flex items-center justify-center space-x-2">
          <img src={DoWellLogo} alt="DoWell logo" className="h-16 w-24" />
          <h1 className="font-bold text-4xl tracking-wide">DoWell</h1>
        </div>
        <p className="pt-2 text-gray-500 text-sm">This dowell react form</p>
      </div>

      <div className="flex flex-col space-y-6">
        <div className="inline-flex space-x-2 items-center">
          <MdCall className="text-teal-300 text-xl" />

          <span>+(123) 456 7890</span>
        </div>
        <div className="inline-flex space-x-2 items-center">
          <MdEmail className="text-teal-300 text-xl" />
          <span>dowell@gmail.com</span>
        </div>
        <div className="inline-flex space-x-2 items-center">
          <MdLocationOn className="text-teal-300 text-xl" />
          <span>India, keleketa </span>
        </div>
      </div>

      <div className="flex space-x-4 text-lg">
        <SocialIcon
          url="https://facebook.com"
          network="facebook"
          style={{ height: 25, width: 25 }}
        />
        <SocialIcon
          url="https://twitter.com"
          network="twitter"
          style={{ height: 25, width: 25 }}
        />
        <SocialIcon
          url="https://linkedin.com"
          network="linkedin"
          style={{ height: 25, width: 25 }}
        />
        <SocialIcon
          url="https://github.com"
          network="github"
          style={{ height: 25, width: 25 }}
        />
        <SocialIcon
          url="https://youtube.com"
          network="youtube"
          style={{ height: 25, width: 25 }}
        />
      </div>
    </div>
  );
};

export default Side;
