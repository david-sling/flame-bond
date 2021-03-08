import React from "react";
import logo from "../../assets/logo.svg";
import google from "../../assets/google.svg";
import github from "../../assets/github.svg";

import { auth } from "../../services/firebase";

export default function Login() {
  return (
    <div className="Login">
      <div className="head">
        <div className="logo">
          <img src={logo} alt="Flame Bond logo" />
        </div>
        <div className="text">
          <h1>Flame Bond</h1>
          <p>CONTENT MANAGEMENT SYSTEM</p>
        </div>
      </div>
      <div className="buttons">
        <button onClick={auth.google.login}>
          <img src={google} alt="Google logo" />
          <p>Sign in with Google</p>
        </button>
        <div className="github">
          <img src={github} alt="GitHub logo" />
        </div>
      </div>
    </div>
  );
}
