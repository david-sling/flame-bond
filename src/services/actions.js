import { firestore } from "./firebase";

//SCHEMA
const getSchema = async (collectionId, setSchema) => {
  const data = await firestore.getOne("_collections", collectionId);
  setSchema(data);
};

//COLLECTIONS
const getCollections = async (setCollections) => {
  const data = await firestore.get("_collections");
  setCollections(data);
};

const getCollection = async (collectionId, setCollection) => {
  const data = await firestore.get(collectionId);
  setCollection(data);
};

//ENTRY
const getEntry = async (collectionId, entryId, setEntry) => {
  const data = await firestore.getOne(collectionId, entryId);
  setEntry(data);
};

const createEntry = async (collection, entry, setId) => {
  const data = await firestore.add(collection, entry);
  setId(data);
};

const updateEntry = async (collection, id, entry) => {
  await firestore.set(collection, id, entry);
  return true;
};

const removeEntry = async (collection, entryId, setDeleted) => {
  await firestore.remove(collection, entryId);
  setDeleted(true);
};

export {
  getSchema,
  getEntry,
  getCollections,
  getCollection,
  createEntry,
  updateEntry,
  removeEntry,
};
