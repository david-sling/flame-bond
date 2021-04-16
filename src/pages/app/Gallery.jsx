import { Add, DeleteForever } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { addImages, getImages } from "../../services/actions";
import { storage } from "../../services/firebase";

export default function Gallery({
  setPage,
  hidehead,
  handleSelect = (f) => console.log(f),
}) {
  const [gallery, setGallery] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setPage("_gallery");
    getImages(setGallery);
  }, [setPage]);

  const handleUpload = async (e) => {
    setUploading(true);
    addImages(e.target.files[0], setGallery);
    setUploading(false);
  };

  const handleRemove = (url) => {
    storage.remove(url, setGallery);
  };

  return (
    <div className="Gallery">
      {!hidehead && <Header title="Gallery" url={["_gallery"]}></Header>}
      <div className="center">
        <div className="grid">
          <div className="grid-item newPhoto">
            <div className="design center">
              {uploading
                ? "uploading"
                : [<Add />, <p>Drag and drop or click to upload</p>]}
            </div>
            <input onChange={handleUpload} type="file" accept="image/*" />
          </div>
          {gallery.map((item) => (
            <div key={item} className="grid-item">
              <div className="img" onClick={() => handleSelect(item)}>
                <img src={item} />
              </div>
              <div className="deleteIcon" onClick={() => handleRemove(item)}>
                <DeleteForever />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
