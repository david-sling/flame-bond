import { capitalize } from "@material-ui/core";
import { Add, DeleteForever, Save } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../../components/Header";
import { getCollection, getSchema } from "../../services/actions";

export default function EditCollection({ setPage }) {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    getCollection(collectionId, setCollection);
    getSchema(collectionId, setSchema);
    setPage(collectionId);
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
      <section>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>
                <p>Master</p>
              </td>
              <td></td>
            </tr>
            {collection &&
              schema?.fields.map((item) => (
                <tr>
                  <th>
                    <h3>{capitalize(item.key)}</h3>
                  </th>
                  <td>
                    <select value={item.type}>
                      <option value="text">text</option>
                      <option value="markdown">markdown</option>
                    </select>
                  </td>
                  <td>
                    <input type="radio" checked={item.key == schema._master} />
                  </td>
                  <td className="delete">
                    <DeleteForever />
                  </td>
                </tr>
              ))}
            <tr>
              <th className="add">
                <input type="text" placeholder="New field" />
                <div>
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
