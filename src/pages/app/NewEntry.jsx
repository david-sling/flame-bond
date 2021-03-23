import { Publish, Save } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Header from "../../components/Header";
import { getSchema, createEntry } from "../../services/actions";
import Entry from "./Entry";

export default function NewEntry({ setPage }) {
  const { collectionId } = useParams();
  const [entry, setEntry] = useState({ _published: false });
  const [schema, setSchema] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    setPage(collectionId);
    getSchema(collectionId, setSchema);
  }, [collectionId]);

  useEffect(() => {
    console.log(entry);
  }, [entry]);

  const handleSave = () => {
    createEntry(collectionId, entry, setId);
  };

  if (id) return <Redirect to={`/${collectionId}/${id}`} />;

  return (
    <div>
      <Header title="New" url={[collectionId, "new"]}>
        <button className="green">
          <p>Publish</p>
          <Publish />
        </button>
        <button onClick={handleSave} className="blue">
          <p>Save</p>
          <Save />
        </button>
      </Header>
      <Entry schema={schema} entry={entry} setEntry={setEntry} />
    </div>
  );
}
