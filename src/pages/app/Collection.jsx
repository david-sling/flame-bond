import { Add, Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { firestore } from "../../services/firebase";
import { useParams } from "react-router";
import Header from "../../components/Header";

export default function Collection({ setPage }) {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    setPage(collectionId);
    getCollection();
    getSchema();
  }, [collectionId]);

  const getSchema = async () => {
    const data = await firestore.getOne("_collections", collectionId);
    setSchema(data);
    console.log(data);
  };

  const getCollection = async () => {
    const data = await firestore.get(collectionId);
    setCollection(data);
    console.log(data);
  };

  return (
    <div className="Collection">
      <Header title={schema?.name} url={collectionId}>
        <button className="blue">
          <p>Edit</p>
          <Edit />
        </button>
        <button className="green">
          <p>New</p>
          <Add />
        </button>
      </Header>
      <section>
        <table>
          <thead>
            <tr>
              <th>idx</th>
              <th>id</th>
              <th>{schema?._master}</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {schema &&
              collection?.map((item) => (
                <tr key={item.id}>
                  <td>{item.idx + 1}</td>
                  <td>{item.id}</td>
                  <td>{item[schema._master]}</td>
                  <td>{JSON.stringify(item._published)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
