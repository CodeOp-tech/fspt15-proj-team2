import { createContext } from "react";
import { useState, useContext } from "react";

export const SearchContext = createContext();

function SearchContextProvider({ children }) {
  const [results, setResults] = useState(null); // The data is searched in the Search component and then saved here.

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
