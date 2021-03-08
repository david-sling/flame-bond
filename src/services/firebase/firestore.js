import firebase from "./init";
const db = firebase.firestore();

const get = async (collection) => {
  const ref = db.collection(collection);
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
  const res = await db.collection(collection).add(object);
  return res.id;
};

const set = async (collection, doc, object) => {
  await db.collection(collection).doc(doc).set(object, { merge: true });
};

const firestore = { get, getOne, add, set, db };

export default firestore;
