import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import userContext from "../../Context/Usercontext";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userContext);
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userInfo = await axios.post("/api/login", {
        email,
        password,
      });

      if (userInfo.data === "user not found") {
        alert("Account not found");
      } else if (userInfo.data === "password incorrect") {
        alert("password Incorrect");
      } else {
        localStorage.setItem("userInfo", JSON.stringify(userInfo.data))
        setUser(userInfo.data);
        navigate("/")
        alert("successfully login");
      }
    } catch (error) {
      alert("login failed");
    }
  };

  return (
    <div className="h-screen">
      <div className="w-full h-4/5 flex justify-center items-center">
        <div className="w-full max-w-xl">
          <form
            className="bg-white  rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleLogin}
          >
            <h1 className="text-3xl text-center mb-6">Login</h1>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="your@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-primary hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full focus:outline-none w-full focus:shadow-outline">
                Login
              </button>
            </div>
            <div className="text-center py-4 text-gray-500">
              Don't have account yet &nbsp;
              <Link to={"/register"}>
                <u className="text-black">Register</u>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
