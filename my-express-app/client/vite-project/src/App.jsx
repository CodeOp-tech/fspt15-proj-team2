import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <h1>This is the front end.</h1>
      </div>
    </div>
  );
}

export default App;
