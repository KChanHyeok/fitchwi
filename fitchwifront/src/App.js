import React from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Home />}></Route>
      </Router>
    </BrowserRouter>
  );
}

export default App;
