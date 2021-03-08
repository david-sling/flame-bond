import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../services/firebase";

import SignOutIcon from "@material-ui/icons/ExitToApp";

import logotype from "../../assets/logotype.svg";

export default function SideBar({ user }) {
  const [collections, setCollections] = useState(null);

  useEffect(() => {
    getCollections();
  }, []);

  const getCollections = async () => {
    const data = await firestore.get("_collections");
    console.log(data);
  };

  return (
    <div className="SideBar">
      <div className="logo">
        <img src={logotype} alt="" />
      </div>
      <div className="collectionsList">
        <h4>COLLECTIONS</h4>
      </div>
      <button onClick={auth.signOut}>
        <SignOutIcon />
        <p>Sign Out</p>
      </button>
    </div>
  );
}
