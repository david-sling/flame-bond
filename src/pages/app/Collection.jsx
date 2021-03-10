import { Add, Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { firestore } from "../../services/firebase";
import { Redirect, useParams } from "react-router";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { getCollection, getSchema } from "../../services/actions";

export default function Collection({ setPage }) {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [schema, setSchema] = useState(null);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    setPage(collectionId);
    getCollection(collectionId, setCollection);
    getSchema(collectionId, setSchema);
  }, [collectionId]);

  if (redirect) return <Redirect to={redirect} />;

  return (
    <div className="Collection">
      <Header title={schema?.name} url={[collectionId]}>
        <Link to={`${collectionId}/edit`}>
          <button className="blue">
            <p>Edit</p>
            <Edit />
          </button>
        </Link>
        <Link to={`/${collectionId}/new`}>
          <button className="green">
            <p>New</p>
            <Add />
          </button>
        </Link>
      </Header>
      <section>
        <table id="collection">
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
                <tr
                  key={item.id}
                  onClick={() => setRedirect(`/${collectionId}/${item.id}`)}
                >
                  {/* <Link to={`/${collectionId}/${item.id}`}> */}
                  <td>{item.idx + 1}</td>
                  <td>{item.id}</td>
                  <td>{item[schema._master]}</td>
                  <td>
                    <ul>
                      <li>{item._published ? "Active" : "Draft"}</li>
                    </ul>
                  </td>
                  {/* </Link> */}
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
