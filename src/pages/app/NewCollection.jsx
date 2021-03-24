import { capitalize } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import Header from "../../components/Header";
import { createCollection, getCollections } from "../../services/actions";

export default function NewCollection({ setCollections }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [urlChanged, setUrlChanged] = useState(false);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (!url) setUrlChanged(false);
    setUrl(url.toLowerCase());
  }, [url]);

  useEffect(() => {
    setName(capitalize(name));
  }, [name]);

  const handleNext = () => {
    if (!name) return alert('Field "name" is required');
    if (!url) return alert('Field "url" is required');
    createCollection(url, name, setRedirect);
    getCollections(setCollections);
  };

  if (redirect) return <Redirect to={redirect} />;

  return (
    <div>
      <Header title="New Collection" url={["new"]}>
        <button onClick={handleNext} className="green button">
          <p>Next</p>
          <ArrowRight />
        </button>
      </Header>
      <section className="NewCollection">
        <form action="">
          <label htmlFor="">Name of Collection</label>
          <input
            id="collection"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!urlChanged) setUrl(e.target.value);
            }}
            placeholder="Enter here . . ."
          />
          <div className="url">
            <label htmlFor="">url</label>
            <div className="p">
              <p>/</p>
            </div>
            <input
              id="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setUrlChanged(true);
              }}
              type="text"
            />
          </div>
          <p className="note">* This cannot be changed later</p>
        </form>
      </section>
    </div>
  );
}
