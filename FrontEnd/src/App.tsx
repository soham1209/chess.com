import { BrowserRouter, Route, Routes } from "react-router";

import "./App.css";
import Landing from "./pages/Landing";
import Game from "./pages/Game";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
