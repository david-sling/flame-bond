import { DeleteForever, Save } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../../components/Header";
import { getCollection, getSchema } from "../../services/actions";

export default function EditCollection() {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    getCollection(collectionId, setCollection);
    getSchema(collectionId, setSchema);
  }, [collectionId]);

  return (
    <div className="EditCollection">
      <Header title={schema?.name} url={[collectionId]}>
        <button className="blue">
          <p>Save</p>
          <Save />
        </button>
        <button className="red">
          <p>Delete</p>
          <DeleteForever />
        </button>
      </Header>
    </div>
  );
}
