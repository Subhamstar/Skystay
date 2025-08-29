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

axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
axios.defaults.withCredentials = true;

function App() {
  const { user } = useContext(userContext);
  if (user === undefined) {
    <Navigate to={"/register"} />;
  } else{
    <Navigate to={"/"}/>
  }
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={!user ? <Login />: <Navigate to={"/"}/>} />
        <Route path="/register" element={!user ? <Register />: <Navigate to={"/"}/>} />
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
  );
}

export default App;
