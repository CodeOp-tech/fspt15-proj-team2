import { useState } from "react";
import Search from "./Components/Search";
import SearchResultsPage from "./Pages/SearchResultsPage";

import "./App.css"; // This file is empty currently.

function App() {
  return (
    <div className="App">
      <div>
        <h1>This is the front end.</h1>
        <SearchResultsPage />
      </div>
    </div>
  );
}

export default App;
