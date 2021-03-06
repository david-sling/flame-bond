import firebase from "./init";

var email = null;
var st = firebase.storage().ref("/" + email);

firebase.auth().onAuthStateChanged(function (u) {
  if (u) {
    email = u.email;
    st = firebase.storage().ref("/" + email);
    console.log(email);
  }
});

const getUrl = async (path, cb = console.log, user) => {
  if (user) st = firebase.storage().ref("/" + user.email);
  var listRef = st.child(path);
  const res = await listRef.listAll();
  var gallery = [];
  res.items.forEach(
    async (item, idx) =>
      await item
        .getDownloadURL()
        .then((url) => (gallery = [...gallery, url]))
        .then(() => {
          if (idx == res.items.length - 1) {
            gallery = gallery.sort().reverse();
            cb(gallery);
          }
        })
  );
};

const upload = async (file) => {
  const [type, ext] = file.type.toString().split("/");
  var ref = st.child(`/${type}/${Date.now()}.${ext}`);
  const snapshot = await ref.put(file);
  console.log(snapshot);
};

const remove = (url, setGallery) => {
  let pictureRef = st.refFromURL(url);

  pictureRef
    .delete()
    .then(() => {
      setGallery((g) => g.filter((image) => image !== url));
    })
    .catch((err) => {
      console.log(err);
    });
};

const storage = { getUrl, upload, remove };

export default storage;
