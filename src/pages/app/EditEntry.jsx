import { capitalize } from "@material-ui/core";
import { DeleteForever, Done, Publish, Save } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Header from "../../components/Header";
import {
  getEntry,
  getSchema,
  updateEntry,
  removeEntry,
} from "../../services/actions";
import Entry from "../../components/Entry";

export default function EditEntry({ setPage }) {
  const { collectionId, entryId } = useParams();
  const [entry, setEntry] = useState(null);
  const [schema, setSchema] = useState(null);
  const [saved, setSaved] = useState(true);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    setPage(collectionId);
    getEntry(collectionId, entryId, setEntry);
    getSchema(collectionId, setSchema);
  }, [collectionId, entryId]);

  useEffect(() => {
    setSaved(false);
  }, [entry]);

  const handleSave = async () => {
    await updateEntry(collectionId, entryId, entry);
    setSaved(true);
  };

  const changePublished = async (_published) => {
    setEntry({ ...entry, _published });
    await updateEntry(collectionId, entryId, { ...entry, _published });
    setSaved(true);
  };

  const handleDelete = async () => {
    removeEntry(collectionId, entryId, setDeleted);
  };

  if (deleted) return <Redirect to={`/${collectionId}`} />;

  return (
    <div>
      <Header
        title={schema && entry[schema._master]}
        url={[collectionId, entryId]}
      >
        <button
          onClick={() => changePublished(!entry?._published)}
          className={entry?._published ? "green active button" : "green button"}
        >
          {entry?._published ? (
            <>
              <p>Published</p>
              <Done />
            </>
          ) : (
            <>
              <p>Publish</p>
              <Publish />
            </>
          )}
        </button>
        <button
          onClick={handleSave}
          className={saved ? "blue active button" : "blue button"}
        >
          <p>{saved ? "Saved" : "Save"}</p>
          {saved ? <Done /> : <Save />}
        </button>
        <button onClick={handleDelete} className="red button">
          <p>delete</p>
          <DeleteForever />
        </button>
      </Header>
      <Entry schema={schema} entry={entry} setEntry={setEntry} />
    </div>
  );
}
