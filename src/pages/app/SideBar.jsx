import React, { useEffect, useState } from "react";
import { auth } from "../../services/firebase";
import { getCollections } from "../../services/actions";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import Arrow from "@material-ui/icons/ArrowForwardIos";
import logotype from "../../assets/logotype.svg";
import { Link } from "react-router-dom";
import { Add } from "@material-ui/icons";

export default function SideBar({
  page,
  collections,
  setCollections,
  setError,
}) {
  const [unauthorized, setUnauthorized] = useState(false);
  useEffect(() => {
    getCollections(setCollections, setUnauthorized);
  }, []);
  useEffect(() => {
    console.log({ collections });
  }, [collections]);

  if (unauthorized) {
    // alert("unauthorized");
    auth.signOut();
    setError("Access Unauthorized");
  }

  return (
    <>
      <div className="SideBar">
        <Link to="/">
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
                <div id="svg">
                  <Arrow style={{ color: "white" }} />
                </div>
              </div>
            </Link>
          ))}
          <div className="add">
            <Link to="/new">
              <div className="clickable">
                <Add />
              </div>
            </Link>
          </div>
          <div className="gallery">
            <Link to={`/_gallery`}>
              <div
                className={
                  page == "_gallery" ? "collection open" : "collection"
                }
                // onClick={() => setPage(collection.id)}
              >
                <p>Gallery</p>
                <div id="svg">
                  <Arrow style={{ color: "white" }} />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <button className="button" onClick={auth.signOut}>
          <SignOutIcon />
          <p>Sign Out</p>
        </button>
      </div>
    </>
  );
}
