import { CollectionReference, DocumentData, collection, doc, getDoc, getFirestore } from "firebase/firestore";
import app from "../config";
import { StaticData } from "../../types";

const db = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}

async function getSchools(){
  const schools = ((await getDoc(doc(db, "public", "static"))).data() as StaticData).schools;
  return schools;
}

async function getTopics(){
  const topics = ((await getDoc(doc(db, "public", "static"))).data() as StaticData).topics;
  return topics;
}

async function getCardIDs(school: string, topic: string, side: string){
  const schoolDoc: any = (await getDoc(doc(db, "schools", school))).data();
  const ids = schoolDoc.cards[topic][side]

  const evidences = ids["evidences"];

  return {evidences: evidences as string[]};
}

export default db;
export {
  createCollection,
  getSchools,
  getTopics,
  getCardIDs,
}