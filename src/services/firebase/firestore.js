import firebase from "./init";

var email = null;
var db = null;

firebase.auth().onAuthStateChanged(function (u) {
  if (u) {
    email = u.email;
    console.log(email);
    db = firebase.firestore().collection("_users").doc(email);
  }
});

const get = async (collection, orderBy = "_dateCreated", user) => {
  // while (!email) {}
  if (user) db = firebase.firestore().collection("_users").doc(user.email);
  var ref = db.collection(collection);
  console.log(db);
  if (orderBy) ref = ref.orderBy(orderBy);
  const snapshot = await ref.get();
  const data = snapshot.docs.map((doc, idx) => {
    return { ...doc.data(), id: doc.id, idx };
  });
  return data;
};

const getOne = async (collection, doc) => {
  const ref = db.collection(collection).doc(doc);
  const snapshot = await ref.get();
  return snapshot.data();
};

const add = async (collection, object) => {
  const res = await db.collection(collection).add({
    ...object,
    _dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    _dateUpdated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  return res.id;
};

const set = async (collection, doc, object, create = false) => {
  var obj = {
    ...object,
    _dateUpdated: firebase.firestore.FieldValue.serverTimestamp(),
  };
  if (create)
    obj = {
      ...obj,
      _dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    };
  await db.collection(collection).doc(doc).set(obj, { merge: true });
};

const remove = async (collection, doc) => {
  await db.collection(collection).doc(doc).delete();
};

const deleteCollection = async (collection) => {
  const ref = db.collection(collection);
  const snapshot = await ref.get();
  const data = snapshot.docs.forEach((doc, idx) => {
    ref.doc(doc.id).delete();
  });
  return data;
};

const firestore = { get, getOne, add, set, remove, db, deleteCollection };

export default firestore;
