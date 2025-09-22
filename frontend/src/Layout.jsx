import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./pages";

const Layout = () => {
  return (
    <div>
      <Navbar /> 
      <div className=" overflow-hidden w-full md:w-5/6 m-auto relative">

      <Outlet />
      <Footer />
    </div>
    </div>
    
  );
};

export default Layout;
