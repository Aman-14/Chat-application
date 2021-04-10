import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

function Login() {
  const [name, setname] = useState("");
  const history = useHistory();

  function handleLogin() {
    if (!name) return;

    fetch(`https://radiant-mesa-88250.herokuapp.com/users`)
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        if (Object.values(users).includes(name)) {
          alert("Username already taken");
          return true;
        }
        return false;
      })
      .then((taken) => {
        if (taken) return;
        history.push(`/chat?name=${name}`);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }

  return (
    <div className="login">
      <h1>Chatroom</h1>
      <input
        onChange={(e) => {
          setname(e.target.value);
        }}
        name="name"
        placeholder="Name"
        value={name}
        autoComplete="off"
        onKeyPress={(e) => {
          if (e.key === "Enter" && name) {
            handleLogin();
          }
        }}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
