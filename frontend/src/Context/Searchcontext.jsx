import { createContext, useState } from "react";


const Searchcontext = createContext({});

export const SearchContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([])
  const [reload, setReload] = useState(false)

  return (
    <Searchcontext.Provider value={{ searchTerm, setSearchTerm, searchResult, setSearchResult, reload, setReload}}>
      {children}
    </Searchcontext.Provider>
  );
};

export default Searchcontext;
