import React, { useState } from "react";

import { PostData } from "../utils";

export default function Login() {
  const [messageState, setMessageState] = useState("");
  const [email, setEmail] = useState("mike@gmail.com");
  const [password, setPassword] = useState("password");

  function DisplayMessage() {
    return <div>{messageState}</div>;
  }

  function LoginUser(event) {
    event.preventDefault();
    PostData(email, password, "login")
      .then((res) => {
        if (res.error) {
          console.log(res);
          setMessageState(`Login Failed. Reason \n ${res.message}`);
        } else {
          console.log(res);
          localStorage.setItem("token", res.token);
          setMessageState("Login Successful!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function ExpireToken() {
  //   //im super lazy to do a real implementation so lets hack this in
  //   console.log("force expire token");
  //   localStorage.setItem("forceExpireToken", true);
  // }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={LoginUser}>
        <label>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

      {/* <button onClick={ExpireToken}>Expire Token</button> */}

      <DisplayMessage />
    </div>
  );
}
