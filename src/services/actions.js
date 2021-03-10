import { firestore } from "./firebase";

const getSchema = async (collectionId, setSchema) => {
  const data = await firestore.getOne("_collections", collectionId);
  setSchema(data);
  console.log(data);
};

const getEntry = async (collectionId, entryId, setEntry) => {
  const data = await firestore.getOne(collectionId, entryId);
  setEntry(data);
  console.log(data);
};

const getCollections = async (setCollections) => {
  const data = await firestore.get("_collections");
  setCollections(data);
};

export { getSchema, getEntry, getCollections };
