//import { Route, Switch } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Nav from "./Header";
import Home from "./pages/Home";
import Rankings from "./pages/Rankings";
import Factors from "./pages/Factors";
import Search from "./pages/Search";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}

      <Router>
        <div className="Header">
          <Nav />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/rankings">
              <Rankings />
            </Route>

            <Route exact path="/factors">
              <Factors />
            </Route>

            <Route exact path="/search">
              <Search />
            </Route>

            <Route exact path="/register">
              <Register />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/logout">
              <Logout />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
