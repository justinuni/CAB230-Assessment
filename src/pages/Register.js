import React, { useState } from "react";

import { PostData } from "../utils";

export default function Register() {
  const [messageState, setMessageState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function DisplayMessage() {
    return <div>{messageState}</div>;
  }

  function RegisterUser(event) {
    event.preventDefault();
    PostData(email, password, "register")
      .then((res) => {
        if (res.error) {
          console.log(res);
          setMessageState(res.message);
        } else {
          console.log(res);
          setMessageState(res.message + ", please login!");
        }
      })
      .catch((err) => {
        console.log("error: " + err);
      });
  }
  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={RegisterUser}>
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

      {/* <button onClick={RegisterUser}>Register</button> */}

      <DisplayMessage />
    </div>
  );
}
