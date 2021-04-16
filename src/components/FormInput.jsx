import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import Gallery from "../pages/app/Gallery";
import { getCollection, getCollections, getSchema } from "../services/actions";

//type: markdown
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function FormInput({ type, value, setValue }) {
  //type: image
  const [imgModal, setImgModal] = useState(false);

  //type: relation
  const [collections, setCollections] = useState([]);
  const [collectionId, setCollectionId] = useState(null);
  const [collection, setCollection] = useState([]);
  const [schema, setSchema] = useState({});

  const getRelations = () => {
    getCollections(setCollections);
  };

  useEffect(() => {
    if (!collectionId) return;
    getCollection(collectionId, setCollection);
    getSchema(collectionId, setSchema);
  }, [collectionId]);

  switch (type) {
    case "text":
      return (
        <input
          className="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    case "markdown":
      return (
        <MdEditor
          style={{ height: "400px", marginBottom: 10 }}
          value={value}
          renderHTML={(value) => mdParser.render(value)}
          onChange={({ html, text }) => setValue(text)}
        />
      );
    case "image":
      return [
        <div className="imageInput">
          <img src={value} alt="" />
          <div className="buttons">
            <button type="button" onClick={() => setImgModal(true)}>
              {value ? "CHANGE IMAGE" : "CHOOSE IMAGE"}
            </button>
            {value && (
              <button onClick={() => setValue(null)} className="remove">
                REMOVE IMAGE
              </button>
            )}
          </div>
        </div>,
        <Modal open={imgModal} setOpen={setImgModal}>
          <div className="head">Gallery</div>
          <Gallery
            setPage={console.log}
            handleSelect={(url) => {
              setValue(url);
              setImgModal(false);
            }}
            hidehead
          />
        </Modal>,
      ];
    case "relation":
      return [
        <div className="relationInput">
          {value?.entry
            ? [
                <p className="text">
                  <span>{value.collection} :</span> {value.entry}
                </p>,
                <button onClick={() => setValue(null)}>CHANGE</button>,
              ]
            : [
                <select
                  value={collectionId || value?.collection}
                  onClick={getRelations}
                  onChange={(e) => setCollectionId(e.target.value)}
                >
                  <option value="SELECT">SELECT</option>
                  {collections.map((item) => (
                    <option value={item.id}>{item.id}</option>
                  ))}
                </select>,
                <select
                  value={"SELECT"}
                  // onClick={getRelations}
                  onChange={(e) =>
                    setValue({
                      collection: collectionId,
                      entry: e.target.value,
                    })
                  }
                >
                  <option value="SELECT">SELECT</option>
                  {collection?.map((item) => (
                    <option value={item.id}>
                      {item[schema._master]} | {item.id}
                    </option>
                  ))}
                </select>,
              ]}
        </div>,
      ];
    default:
      return <p>Invalid Data Type</p>;
  }
}
