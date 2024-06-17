"use client";
import Landing from "@/components/Landing";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { googleLogout } from "@react-oauth/google";
import Login from "../components/Login";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  const [tokenValidating, setTokenValidating] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const checkToken = async () => {
      setTokenValidating(true);
      const token = localStorage.getItem("google_token");
      if (!token) {
        googleLogout();
        setToken(null);
        setTokenValidating(false);
        return;
      }
      try {
        const response = await axios.post(
          `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
        );

        setToken(token);
        setEmail(response.data.email);
      } catch (e) {
        googleLogout();
        setToken(null);
      }
      setTokenValidating(false);
    };

    checkToken();
  }, []);

  if (tokenValidating) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        loading
      </div>
    );
  }

  return (
    <div>
      {!token && <Login setToken={setToken} setEmail={setEmail} />}

      {token && (
        <div>
          <Landing />
        </div>
      )}
    </div>
  );
}
