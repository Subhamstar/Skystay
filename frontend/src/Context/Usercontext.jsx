import { createContext, useEffect, useState } from "react";

const userContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    setUser(userInfo)
  }, []);
  return (
    <userContext.Provider value={{ user, setUser, ready }}>
      {children}
    </userContext.Provider>
  );
};

export default userContext;
