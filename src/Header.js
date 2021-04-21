import React from "react";

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import { Alert } from "reactstrap";

// import Home from "./pages/Home";
// import Rankings from "./pages/Rankings";
// import Factors from "./pages/Factors";
// import Search from "./pages/Search";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Logout from "./pages/Logout";

// export default function header() {
//   return (
//     <Router>
//       <div className="Header">
//         <Nav />
//         <Switch>
//           <Route exact path="/">
//             <Home />
//           </Route>

//           <Route exact path="/rankings">
//             <Rankings />
//           </Route>

//           <Route exact path="/factors">
//             <Factors />
//           </Route>

//           <Route exact path="/search">
//             <Search />
//           </Route>

//           <Route exact path="/register">
//             <Register />
//           </Route>

//           <Route exact path="/login">
//             <Login />
//           </Route>

//           <Route exact path="/logout">
//             <Logout />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

export default function Nav() {
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
          <Link to="/factors">Factors</Link>
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
  );
}

export function ExpiredTokenAlert() {
  console.log("checking token");
  console.log(localStorage.getItem("forceExpireToken"));

  //for some reason the returns inside the if statements dont return? need to look into why
  let returnedAlert;

  if (localStorage.getItem("forceExpireToken") === "true") {
    console.log("forced token expire");
    localStorage.removeItem("token");
    //this prevents this from being actively rendered
    localStorage.setItem("forceExpireToken", false);

    returnedAlert = (
      <div>
        <Alert color="primary">Login token has expired, please re-login.</Alert>
      </div>
    );
  }
  //prettier forces else if to be on the same line as the } and thats evil
  else if (localStorage.getItem("token") !== null) {
    let expTime = jwt.decode(localStorage.getItem("token")).exp;
    console.log(expTime);
    if (expTime >= Date.now()) {
      localStorage.removeItem("token");

      returnedAlert = (
        <div>
          <Alert color="primary">
            Login token has expired, please re-login.
          </Alert>
        </div>
      );
    }
  }
  console.log(returnedAlert);
  returnedAlert = (
    <div>
      <Alert color="primary">Login token has expired, please re-login.</Alert>
    </div>
  );
  console.log(returnedAlert);

  return <div>{returnedAlert}</div>;
}
