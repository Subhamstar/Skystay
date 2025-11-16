import { createContext, useEffect, useState } from "react";

const userContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isHostMode, setIsHostMode] = useState(false);
  const [hostVerified, setHostVerified] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const hostMode = localStorage.getItem("hostMode") === "true";
    const verified = localStorage.getItem("hostVerified") === "true";
    setUser(userInfo);
    setIsHostMode(hostMode);
    setHostVerified(verified);
  }, []);
  return (
    <userContext.Provider value={{ user, setUser, isHostMode, setIsHostMode, hostVerified, setHostVerified, ready }}>
      {children}
    </userContext.Provider>
  );
};

export default userContext;
