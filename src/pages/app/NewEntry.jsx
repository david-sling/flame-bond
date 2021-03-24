import { capitalize } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Header from "../../components/Header";
import { getSchema, createEntry } from "../../services/actions";
import Entry from "../../components/Entry";

export default function NewEntry({ setPage }) {
  const { collectionId } = useParams();
  const [entry, setEntry] = useState({
    _published: false,
  });
  const [schema, setSchema] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    setPage(collectionId);
    getSchema(collectionId, setSchema);
  }, [collectionId]);

  const handleSave = () => {
    if (!entry[schema._master])
      return alert(`Field "${schema._master}" is required`);
    createEntry(collectionId, entry, setId);
  };

  if (id) return <Redirect to={`/${collectionId}`} />;

  return (
    <div>
      <Header title="New" url={[collectionId, "new"]}>
        <button onClick={handleSave} className="blue button">
          <p>Save</p>
          <Save />
        </button>
      </Header>
      <Entry schema={schema} entry={entry} setEntry={setEntry} />
    </div>
  );
}
