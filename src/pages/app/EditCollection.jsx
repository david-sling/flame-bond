import { capitalize } from "@material-ui/core";
import { Add, DeleteForever, Done, Save } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Header from "../../components/Header";
import REST from "../../config/rest";
import {
  getCollection,
  getSchema,
  updateSchema,
  removeCollection,
  getCollections,
} from "../../services/actions";

export default function EditCollection({ user, setPage, setCollections }) {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [schema, setSchema] = useState(null);
  const [newField, setNewField] = useState("");
  const [saved, setSaved] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [endpoint, setEndpoint] = useState("");
  console.log({ schema });
  useEffect(() => {
    getCollection(collectionId, setCollection);
    getSchema(collectionId, setSchema);
    setPage(collectionId);
  }, [collectionId]);

  useEffect(() => {
    setSaved(false);
    if (!schema?.fields?.length || schema?._master) return;
    console.log({ schema });
    setSchema({ ...schema, _master: schema.fields[0].key });
  }, [schema]);

  useEffect(() => {
    setEndpoint(`${REST}/${user?.email}/${collectionId}`);
  }, [REST, user, collectionId]);

  const addField = (e) => {
    e.preventDefault();
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
                      <option value="image">image</option>
                      <option value="relation">relation</option>
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
                <form action="submit" onSubmit={addField}>
                  <input
                    type="text"
                    placeholder="New field"
                    value={newField}
                    onChange={(e) => setNewField(e.target.value)}
                  />
                  <button type="submit">
                    <Add />
                  </button>
                  <br />
                </form>
              </th>
            </tr>
          </tbody>
        </table>
        <div
          className="readOnly"
          onClick={() =>
            setSchema({
              ...schema,
              _readOnly: !schema?._readOnly,
            })
          }
        >
          <p>Read Only:</p>
          <input
            type="checkbox"
            value={schema?._readOnly}
            checked={schema?._readOnly}
            name="readOnly"
            id="readOnly"
          />
        </div>
        <div className="rules">
          <h3>Public Access</h3>
          <div className="rule">
            <p>GET:</p>
            <input
              type="checkbox"
              value={schema?.public?.get}
              checked={schema?.public?.get}
              name="readOnly"
              id="readOnly"
              onClick={(e) =>
                setSchema({
                  ...schema,
                  public: { ...schema.public, get: !schema?.public?.get },
                })
              }
            />
          </div>
          <div className="rule">
            <p>GET ONE:</p>
            <input
              type="checkbox"
              value={schema?.public?.getOne}
              checked={schema?.public?.getOne}
              name="readOnly"
              id="readOnly"
              onClick={(e) =>
                setSchema({
                  ...schema,
                  public: { ...schema.public, getOne: !schema?.public?.getOne },
                })
              }
            />
          </div>
          <div className="rule">
            <p>POST:</p>
            <input
              type="checkbox"
              value={schema?.public?.post}
              checked={schema?.public?.post}
              name="readOnly"
              id="readOnly"
              onClick={(e) =>
                setSchema({
                  ...schema,
                  public: { ...schema.public, post: !schema?.public?.post },
                })
              }
            />
          </div>
          <div className="rule">
            <p>PATCH:</p>
            <input
              type="checkbox"
              value={schema?.public?.patch}
              checked={schema?.public?.patch}
              name="readOnly"
              id="readOnly"
              onClick={(e) =>
                setSchema({
                  ...schema,
                  public: { ...schema.public, patch: !schema?.public?.patch },
                })
              }
            />
          </div>
          <div className="rule">
            <p>DELETE:</p>
            <input
              type="checkbox"
              value={schema?.public?.delete}
              checked={schema?.public?.delete}
              name="readOnly"
              id="readOnly"
              onClick={(e) =>
                setSchema({
                  ...schema,
                  public: { ...schema.public, delete: !schema?.public?.delete },
                })
              }
            />
          </div>
        </div>
        <div className="endpoint">
          <h4>API Endpoint: </h4>
          <a href={endpoint} target="_blank" rel="noopener noreferrer">
            {endpoint}
          </a>
        </div>
      </section>
    </div>
  );
}
