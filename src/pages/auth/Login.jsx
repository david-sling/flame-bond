import React from "react";
import logo from "../../assets/logo.svg";
import google from "../../assets/google.svg";
import github from "../../assets/github.svg";

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
        <button>
          <img src={google} alt="Google logo" /> <p>Sign up with Google</p>
        </button>
        <div className="github" id="button">
          <img src={github} alt="GitHub logo" />
        </div>
      </div>
    </div>
  );
}
