import { capitalize } from "@material-ui/core";
import { Add, DeleteForever, Done, Save } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Header from "../../components/Header";
import {
  getCollection,
  getSchema,
  updateSchema,
  removeCollection,
  getCollections,
} from "../../services/actions";

export default function EditCollection({ setPage, setCollections }) {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [schema, setSchema] = useState(null);
  const [newField, setNewField] = useState("");
  const [saved, setSaved] = useState(true);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    getCollection(collectionId, setCollection);
    getSchema(collectionId, setSchema);
    setPage(collectionId);
  }, [collectionId]);

  useEffect(() => {
    setSaved(false);
    if (!schema?.fields?.length || schema?._master) return;
    console.log(schema);
    setSchema({ ...schema, _master: schema.fields[0].key });
  }, [schema]);

  const addField = () => {
    if (!newField) return;
    var fields = schema.fields || [];
    fields = [...fields, { key: newField, type: "text" }];
    setSchema({ ...schema, fields });
    setNewField("");
  };

  const handleSave = async () => {
    await updateSchema(collectionId, schema);
    setSaved(true);
  };

  const handleDelete = async () => {
    await removeCollection(collectionId);
    setDeleted(true);
    getCollections(setCollections);
  };

  if (deleted) return <Redirect to="/" />;

  return (
    <div className="EditCollection">
      <Header title={schema?.name} url={[collectionId]}>
        <button
          onClick={handleSave}
          className={saved ? "blue active button" : "blue button"}
        >
          <p>{saved ? "Saved" : "Save"}</p>
          {saved ? <Done /> : <Save />}
        </button>
        <button onClick={handleDelete} className="red button">
          <p>Delete</p>
          <DeleteForever />
        </button>
      </Header>
      <section>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>{Boolean(schema?.fields?.length) && <p>Master</p>}</td>
              <td></td>
            </tr>
            {collection &&
              schema?.fields?.map((item, idx) => (
                <tr>
                  <th>
                    <h3>{capitalize(item.key)}</h3>
                  </th>
                  <td>
                    <select
                      value={item.type}
                      onChange={(e) => {
                        const fields = schema.fields;
                        fields[idx].type = e.target.value;
                        setSchema({ ...schema, fields });
                      }}
                    >
                      <option value="text">text</option>
                      <option value="markdown">markdown</option>
                    </select>
                  </td>
                  <td>
                    <input
                      id="radio"
                      type="radio"
                      onClick={() =>
                        setSchema({ ...schema, _master: item.key })
                      }
                      checked={item.key == schema._master}
                    />
                  </td>
                  <td className="delete">
                    <DeleteForever
                      onClick={() => {
                        const fields = schema.fields.filter(
                          (field) => field.key != item.key
                        );
                        setSchema({ ...schema, fields });
                      }}
                    />
                  </td>
                </tr>
              ))}
            <tr>
              <th className="add">
                <input
                  type="text"
                  placeholder="New field"
                  value={newField}
                  onChange={(e) => setNewField(e.target.value)}
                />
                <div onClick={addField}>
                  <Add />
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
