import firebase from "./init";
const st = firebase.storage();

const getUrl = async (cb = console.log) => {
  var listRef = st.ref("/").child("/images");
  const res = await listRef.listAll();
  var gallery = [];
  res.items.forEach(
    async (item) =>
      await item
        .getDownloadURL()
        .then((url) => (gallery = [...gallery, url]))
        .then(() => cb(gallery))
  );
};

const upload = async (file) => {
  var ref = st.ref("/").child("/images/" + file.name);
  const snapshot = await ref.put(file);
  console.log(snapshot);
};

const storage = { getUrl, upload };

export default storage;
