import { Add } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { storage } from "../../services/firebase";

export default function Gallery({ setPage }) {
  const [gallery, setGallery] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setPage("_gallery");
    storage.getUrl(setGallery);
  }, [setPage]);

  const handleUpload = async (e) => {
    setUploading(true);
    if (e.target.files[0].name) return setUploading(false);
    console.log(e.target.files[0]);
    await storage.upload(e.target.files[0]);
    await storage.getUrl(setGallery);
    setUploading(false);
  };

  return (
    <div className="Gallery">
      <Header title="Gallery" url={["_gallery"]}></Header>
      <div className="center">
        <div className="grid">
          <div className="grid-item newPhoto">
            <div className="design center">
              {uploading ? "uploading" : <Add />}
            </div>
            <input onChange={handleUpload} type="file" />
          </div>
          {gallery.map((item) => (
            <div key={item} className="grid-item">
              <img src={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
