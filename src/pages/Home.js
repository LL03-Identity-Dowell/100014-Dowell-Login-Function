import React, { useState } from "react";
import Side from "../components/Side";
import SignUp from "../components/SignUp";

const Home = () => {
  const [signIn, setSignIn] = useState(false);

  return (
    <>
      <SignUp />
    </>
  );
};

export default Home;
