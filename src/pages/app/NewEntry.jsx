import { capitalize } from "@material-ui/core";
import { Publish, Save } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Header from "../../components/Header";
import { getSchema, createEntry } from "../../services/actions";
import Entry from "../../components/Entry";

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
    var abort = false;
    schema?.fields.forEach((field) => {
      if (field.key[0] == "_") return;
      if (!entry[field.key]) {
        abort = true;
        alert(`Field "${capitalize(field.key)}" is required`);
      }
    });
    if (abort) return;
    createEntry(collectionId, entry, setId);
  };

  if (id) return <Redirect to={`/${collectionId}/${id}`} />;

  return (
    <div>
      <Header title="New" url={[collectionId, "new"]}>
        <button onClick={handleSave} className="blue">
          <p>Save</p>
          <Save />
        </button>
      </Header>
      <Entry schema={schema} entry={entry} setEntry={setEntry} />
    </div>
  );
}
