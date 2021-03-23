import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Main";
import SideBar from "./SideBar";

export default function User(props) {
  const [page, setPage] = useState(null);
  const [collections, setCollections] = useState(null);
  return (
    <div className="User">
      <Router>
        <SideBar
          {...props}
          page={page}
          setPage={setPage}
          collections={collections}
          setCollections={setCollections}
        />
        <Main {...props} setPage={setPage} setCollections={setCollections} />
      </Router>
    </div>
  );
}
