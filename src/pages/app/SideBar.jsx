import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../services/firebase";

import SignOutIcon from "@material-ui/icons/ExitToApp";
import Arrow from "@material-ui/icons/ArrowForwardIos";

import logotype from "../../assets/logotype.svg";
import { capitalize } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function SideBar({ user, page, setPage }) {
  const [collections, setCollections] = useState(null);

  useEffect(() => {
    getCollections();
  }, []);

  const getCollections = async () => {
    const data = await firestore.get("_collections");
    setCollections(data);
  };

  return (
    <div className="SideBar">
      <Link to=".">
        <div className="logo">
          <img src={logotype} alt="" />
        </div>
      </Link>
      <div className="collectionsList">
        <h4>COLLECTIONS</h4>
        {collections?.map((collection) => (
          <Link key={collection.id} to={`/${collection.id}`}>
            <div
              className={
                page == collection.id ? "collection open" : "collection"
              }
              // onClick={() => setPage(collection.id)}
            >
              <p>{collection.name}</p>
              <Arrow style={{ color: "white" }} />
            </div>
          </Link>
        ))}
      </div>
      <button onClick={auth.signOut}>
        <SignOutIcon />
        <p>Sign Out</p>
      </button>
    </div>
  );
}
