import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  Register,
  Account,
  Home,
  ListingDetail,
  Profile,
  Places,
  BookingsPage,
  Notfound,
  SingleBookingPage,
} from "./pages";
import Layout from "./Layout";
import axios from "axios";
import userContext from "./Context/Usercontext";
import Formpage from "./pages/Account/AccountComps/Formpage";
import { useContext } from "react";
import { motion } from "framer-motion";

axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
axios.defaults.withCredentials = true;

function App() {
  const { user } = useContext(userContext);

  const floatingCircles = [
    { top: "10%", left: "5%", size: 80, delay: 0 },
    { top: "25%", left: "80%", size: 60, delay: 1 },
    { top: "50%", left: "20%", size: 100, delay: 2 },
    { top: "70%", left: "60%", size: 50, delay: 0.5 },
    { top: "85%", left: "30%", size: 70, delay: 1.5 },
  ];

  const floatingDiamonds = [
    { top: "15%", left: "10%", size: 20, delay: 0 },
    { top: "40%", left: "70%", size: 25, delay: 1 },
    { top: "65%", left: "40%", size: 15, delay: 0.5 },
    { top: "80%", left: "85%", size: 30, delay: 1.2 },
    { top: "20%", left: "50%", size: 18, delay: 0.3 },
    { top: "55%", left: "15%", size: 22, delay: 0.8 },
    { top: "75%", left: "70%", size: 20, delay: 1.5 },
  ];

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Floating Circles */}
{/* Floating Circles with Colors */}
{/* Floating Small Dots with Soft Transparent Glow */}
{floatingCircles.map((el, index) => (
  <motion.div
    key={index}
    className="absolute rounded-full opacity-40"
    style={{
      width: el.size,
      height: el.size,
      top: el.top,
      left: el.left,
      backgroundColor: ["rgba(79, 70, 229,0.3)", "rgba(99, 102, 241,0.3)", "rgba(139, 92, 246,0.3)", "rgba(34, 211, 238,0.3)", "rgba(6, 182, 212,0.3)"][index % 5],
      filter: "blur(12px)", // soft blur
      boxShadow: `0 0 ${el.size / 2}px ${["rgba(79, 70, 229,0.3)", "rgba(99, 102, 241,0.3)", "rgba(139, 92, 246,0.3)", "rgba(34, 211, 238,0.3)", "rgba(6, 182, 212,0.3)"][index % 5]}`,
    }}
    animate={{
      y: ["0%", "15%", "0%"],
      x: ["0%", "-10%", "0%"],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      repeatType: "mirror",
      delay: el.delay,
    }}
  />
))}

{Array.from({ length: 30 }).map((_, i) => (
  <motion.div
    key={i}
    className="absolute rounded-full"
    style={{
      width: i % 2 === 0 ? 3 : 2,   // slightly bigger for visibility
      height: i % 2 === 0 ? 3 : 2,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      backgroundColor: ["rgba(244, 114, 182, 0.3)", "rgba(232, 121, 249, 0.3)", "rgba(217, 70, 239, 0.3)", "rgba(244, 63, 94, 0.3)", "rgba(251, 191, 36, 0.3)"][i % 5],
      filter: "blur(2px)",  // subtle blur
      boxShadow: `0 0 6px ${["rgba(244, 114, 182,0.3)", "rgba(232, 121, 249,0.3)", "rgba(217, 70, 239,0.3)", "rgba(244, 63, 94,0.3)", "rgba(251, 191, 36,0.3)"][i % 5]}`,
    }}
    animate={{
      y: [0, Math.random() * 10 - 5, 0],
      x: [0, Math.random() * 10 - 5, 0],
    }}
    transition={{
      duration: Math.random() * 6 + 3,
      repeat: Infinity,
      repeatType: "mirror",
      delay: Math.random() * 5,
    }}
  />
))}

{/* Floating Diamonds with Soft Transparent Glow */}
{floatingDiamonds.map((el, index) => (
  <motion.div
    key={index}
    className="absolute"
    style={{
      width: el.size,
      height: el.size,
      top: el.top,
      left: el.left,
      transform: "rotate(45deg)",
      backgroundColor: ["rgba(250, 204, 21,0.25)", "rgba(251, 146, 60,0.25)", "rgba(244, 114, 182,0.25)", "rgba(34, 197, 94,0.25)", "rgba(6, 182, 212,0.25)", "rgba(232, 121, 249,0.25)", "rgba(244, 63, 94,0.25)"][index % 7],
      filter: "blur(4px)", // subtle blur
      boxShadow: `0 0 ${el.size / 2}px ${["rgba(250, 204, 21,0.25)", "rgba(251, 146, 60,0.25)", "rgba(244, 114, 182,0.25)", "rgba(34, 197, 94,0.25)", "rgba(6, 182, 212,0.25)", "rgba(232, 121, 249,0.25)", "rgba(244, 63, 94,0.25)"][index % 7]}`,
    }}
    animate={{
      y: ["0%", "10%", "0%"],
      x: ["0%", "-5%", "0%"],
      rotate: [0, 360, 0],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      repeatType: "mirror",
      delay: el.delay,
    }}
  />
))}



      {/* App Routes */}
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to={"/"} />}
          />
          <Route
            path="/listings/:id"
            element={user ? <ListingDetail /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/account"
            element={user ? <Profile /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/account/booking"
            element={user ? <BookingsPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/account/booking/:id"
            element={user ? <SingleBookingPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/account/places"
            element={user ? <Places /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/account/places/new"
            element={user ? <Formpage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/account/places/:id"
            element={user ? <Formpage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/account/:subpage/:action"
            element={user ? <Account /> : <Navigate to={"/login"} />}
          />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
