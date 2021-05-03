import React from "react";

export default function Logout() {
  function LogUserOut() {
    localStorage.removeItem("token");

    return <h2>You have been logged out!</h2>;
  }

  return (
    <div>
      <LogUserOut />
    </div>
  );
}
