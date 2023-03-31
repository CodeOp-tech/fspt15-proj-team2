import { createContext } from "react";
import { useState, useContext } from "react";

const SearchContext = createContext();

function SearchContextProvider({ children }) {
  const [results, setResults] = useState([]); // The data is searched in the Search component and then saved here.

  return (
    <SearchContext.Provider value={{ results, setResults }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export default SearchContextProvider;
