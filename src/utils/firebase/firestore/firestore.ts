import { CollectionReference, DocumentData, collection, doc, getDoc, getFirestore } from "firebase/firestore";
import app from "../config";
import { StaticData } from "../../types";

const db = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}

async function getSchools(){
  const schools = ((await getDoc(doc(db, "public", "static"))).data() as StaticData).schools;
  console.log(schools);
  return schools;
}

export default db;
export {
  createCollection,
  getSchools,
}