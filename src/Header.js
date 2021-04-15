import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Home from "./pages/Home";
import Rankings from "./pages/Rankings";
import Factors from "./pages/Factors";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

export default function header()
{
    return(
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

                    <Route exact path="/search">
                        <Factors />
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

    )
}

function Nav()
{
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/rankings">Rankings</Link>
                </li>
                <li>
                    <Link to="/search">Search</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
            </ul>
        </nav>
    )
}