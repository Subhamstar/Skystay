import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{ 
    e.preventDefault()
   try {
    await axios.post("/api/register", {
      username,
      email,
      password
    })
    alert("registeration successfull")
    navigate("/login")
   } catch (error) {
    alert("registration failed")
   }
  }

  return (
    <div className="h-screen">
    <div className="w-full h-4/5 flex justify-center items-center">
      <div className="w-full max-w-xl">
        <form className="bg-white  rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h1 className="text-3xl text-center mb-6">
            Register
          </h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Jeremy gilbert"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
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
              onChange={e => setEmail(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
              
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full focus:outline-none w-full focus:shadow-outline"
            >
              Register
            </button>
          </div>
          <div className="text-center py-4 text-gray-500">
              Already have an account? &nbsp;
              <Link to={"/login"}><u className="text-black">Login</u></Link>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Register