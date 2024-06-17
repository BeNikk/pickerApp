"use client";

import { googleLogout } from "@react-oauth/google";
import React, { Dispatch } from "react";
import toast from "react-hot-toast";

const Logout = ({
  setToken,
}: {
  setToken: Dispatch<React.SetStateAction<string | null>>;
}) => {
  const handleClick = () => {
    googleLogout();
    setToken(null);
  };

  return (
    <button
      onClick={handleClick}
      className="w-fit mr-3 my-2 ml-auto rounded-xl font-semibold bg-blue-500 text-white border-2 px-3 py-2"
    >
      Logout
    </button>
  );
};

export default Logout;
