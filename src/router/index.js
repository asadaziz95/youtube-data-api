import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Routers = () => {
  const Home = () => {
    return <h2>Home</h2>;
  };
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/login" component={Home} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};
export default Routers;
