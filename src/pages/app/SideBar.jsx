import React, { useEffect, useState } from "react";
import { auth } from "../../services/firebase";
import { getCollections } from "../../services/actions";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import Arrow from "@material-ui/icons/ArrowForwardIos";
import logotype from "../../assets/logotype.svg";
import { Link } from "react-router-dom";
import { Add, Close, Menu } from "@material-ui/icons";

export default function SideBar({
  user,
  page,
  collections,
  setCollections,
  setError,
}) {
  const [unauthorized, setUnauthorized] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getCollections(setCollections, setUnauthorized, user);
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
      <div className={open ? "SideBar open" : "SideBar"}>
        <Link to="/">
          <div className="logo" onClick={() => setOpen(false)}>
            <img src={logotype} alt="" />
          </div>
        </Link>
        <div className="collectionsList">
          <h4>COLLECTIONS</h4>
          {collections?.map((collection) => (
            <Link key={collection.id} to={`/${collection.id}`}>
              <div
                onClick={() => setOpen(false)}
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
              <div onClick={() => setOpen(false)} className="clickable">
                <Add />
              </div>
            </Link>
          </div>
          <div className="gallery">
            <Link to={`/_gallery`}>
              <div
                onClick={() => setOpen(false)}
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
            <div className="close" onClick={() => setOpen(false)}>
              <div className="clickable onlymob">
                <Close />
              </div>
            </div>
          </div>
        </div>
        <button className="button" id="button" onClick={auth.signOut}>
          <SignOutIcon />
          <p>Sign Out</p>
        </button>
      </div>
      <div
        className="openSideBar"
        id="only-phone"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </div>
    </>
  );
}
