import { capitalize } from "@material-ui/core";
import { DeleteForever, Publish, Save } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../../components/Header";
import { getEntry, getSchema } from "../../services/actions";
import Entry from "./Entry";
import FormInput from "./FormInput";

export default function EditEntry({ setPage }) {
  const { collectionId, entryId } = useParams();
  const [entry, setEntry] = useState(null);
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    setPage(collectionId);
    getEntry(collectionId, entryId, setEntry);
    getSchema(collectionId, setSchema);
  }, [collectionId, entryId]);

  return (
    <div>
      <Header
        title={schema && entry[schema._master]}
        url={[collectionId, entryId]}
      >
        <button className="green">
          <p>Publish</p>
          <Publish />
        </button>
        <button className="blue">
          <p>Save</p>
          <Save />
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
