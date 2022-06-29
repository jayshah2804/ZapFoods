import React from "react";


import SecondPage from "./seondPage";
import { Redirect, Route } from "react-router-dom";
import FirstPage from "./FirstPage";

function App() {
  

  return (
    <React.Fragment>
      <Route path="/" exact>
        <Redirect to="/welcome" />
      </Route>
      <Route path="/foods">
        <SecondPage />
      </Route>
      <Route path="/welcome">
        <FirstPage />
      </Route>
    </React.Fragment>
  );
}

export default App;
