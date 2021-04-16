import React, { useState } from "react";
import Modal from "../components/Modal";
import Gallery from "../pages/app/Gallery";

export default function FormInput({ type, value, setValue }) {
  const [imgModal, setImgModal] = useState(false);
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
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      );
    case "image":
      return [
        <div className="imageInput">
          <img src={value} alt="" />
          <button type="button" onClick={() => setImgModal(true)}>
            Choose Image
          </button>
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
    default:
      return <p>Invalid Data Type</p>;
  }
}
