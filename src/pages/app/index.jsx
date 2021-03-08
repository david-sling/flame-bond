import React from "react";
import SideBar from "./SideBar";

export default function User(props) {
  return (
    <div className="User">
      <SideBar {...props} />
    </div>
  );
}
