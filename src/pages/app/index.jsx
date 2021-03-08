import React, { useState } from "react";
import SideBar from "./SideBar";

export default function User(props) {
  const [page, setPage] = useState(null);
  return (
    <div className="User">
      <SideBar {...props} page={page} setPage={setPage} />
    </div>
  );
}
