import { capitalize } from "@material-ui/core";
import React from "react";

export default function Header({ title, url, children }) {
  return (
    <header>
      <div className="text">
        <h1>{title}</h1>
        <p className="url">/{url}</p>
      </div>
      <div className="buttons">{children}</div>
    </header>
  );
}
