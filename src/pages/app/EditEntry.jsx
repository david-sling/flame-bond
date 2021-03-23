import { capitalize } from "@material-ui/core";
import { DeleteForever, Done, Publish, Save } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../../components/Header";
import { getEntry, getSchema, updateEntry } from "../../services/actions";
import Entry from "./Entry";
import FormInput from "./FormInput";

export default function EditEntry({ setPage }) {
  const { collectionId, entryId } = useParams();
  const [entry, setEntry] = useState(null);
  const [schema, setSchema] = useState(null);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    setPage(collectionId);
    getEntry(collectionId, entryId, setEntry);
    getSchema(collectionId, setSchema);
  }, [collectionId, entryId]);

  useEffect(() => {
    // console.log({ entry });
    setSaved(false);
  }, [entry]);

  const handleSave = async () => {
    await updateEntry(collectionId, entryId, entry);
    // await getEntry(collectionId, entryId, setEntry);
    setSaved(true);
  };

  const changePublished = async (_published) => {
    setEntry({ ...entry, _published });
    await updateEntry(collectionId, entryId, { ...entry, _published });
    setSaved(true);
  };

  return (
    <div>
      <Header
        title={schema && entry[schema._master]}
        url={[collectionId, entryId]}
      >
        <button
          onClick={() => changePublished(!entry?._published)}
          className={entry?._published ? "green active" : "green"}
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
        <button onClick={handleSave} className={saved ? "blue active" : "blue"}>
          <p>{saved ? "Saved" : "Save"}</p>
          {saved ? <Done /> : <Save />}
        </button>
        <button className="red">
          <p>delete</p>
          <DeleteForever />
        </button>
      </Header>
      <Entry schema={schema} entry={entry} setEntry={setEntry} />
    </div>
  );
}
