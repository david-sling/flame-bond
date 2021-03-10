import { Save } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../../components/Header";
import { getSchema } from "../../services/actions";
import Entry from "./Entry";

export default function NewEntry({ setPage }) {
  const { collectionId } = useParams();
  const [entry, setEntry] = useState({});
  const [schema, setSchema] = useState(null);
  useEffect(() => {
    setPage(collectionId);
    getSchema(collectionId, setSchema);
  }, [collectionId]);
  return (
    <div>
      <Header title="New" url={[collectionId, "new"]}>
        <button className="blue">
          <p>Save</p>
          <Save />
        </button>
      </Header>
      <Entry schema={schema} entry={entry} setEntry={setEntry} />
    </div>
  );
}
