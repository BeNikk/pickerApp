"use client";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import axios from "axios";

const Login = ({ setToken, setEmail }: any) => {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      setToken(response.access_token);
      localStorage.setItem("google_token", response.access_token);
      const res = await axios.post(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${response.access_token}`
      );
      setEmail(res.data.email);
    },
    scope: "https://www.googleapis.com/auth/spreadsheets",
    include_granted_scopes: true,
  });

  // const onLoginSuccess = (response:any)=>{
  //   toast.success('Login successful');
  //   const token = response.credential;
  //   localStorage.setItem('google_token', token);
  //   setToken(token);
  // }

  return (
    <div className="w-full flex justify-center items-center h-screen ">
      <div className=" backdrop-blur-[80px] bg-[#f6faf5] rounded-lg shadow-[2px_0_15px_#2c6b34] p-12  w-fit flex flex-col items-center gap-5 ">
        <img src={"/logo.png"} className="w-44 " alt="" />

        <div>
          <h2 className="font-medium text-gray-500 pb-2 ">Get Started:</h2>
          <button
            onClick={() => login()}
            className="border px-4 py-2 rounded-xl bg-green-500 text-white font-semibold"
          >
            Login
          </button>
          {/* <GoogleLogin 
                onSuccess={onLoginSuccess}
            /> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
