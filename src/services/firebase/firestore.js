import firebase from "./init";
const db = firebase.firestore();

const get = async (collection) => {
  const ref = db.collection(collection);
  const snapshot = await ref.get();
  const data = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
};

const add = async (collection, object) => {
  const res = await db.collection(collection).add(object);
  return res.id;
};

const set = async (collection, doc, object) => {
  await db.collection(collection).doc(doc).set(object, { merge: true });
};

const firestore = { get, add, set, db };

export default firestore;
