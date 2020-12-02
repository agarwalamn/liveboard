import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./components/Join/Join";
import Main from "./components/Main/Main";
function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/draw" component={Main} />
    </Router>
  );
}

export default App;
