import { CollectionReference, DocumentData, collection, doc, getDoc, initializeFirestore, or, persistentLocalCache, persistentMultipleTabManager, query, where } from "firebase/firestore";
import app from "../config";
import { StaticData, User } from "../../types";

const db = initializeFirestore(app, {
  
  localCache: persistentLocalCache(/*settings*/{tabManager: persistentMultipleTabManager()})
});

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

async function getCards(topic: string, side: string, user: User){ //return all cards that the user can possibly view.
  const cardsRef = collection(db, "cards", topic, side);

  const q = query(cardsRef, or(
    where("ownerUID", "==", user.uid),
    where("teamID", "==", user.teamID),
    where("school", "==", user.school),
  ));

  

}

export default db;
export {
  createCollection,
  getSchools,
  getTopics,
  getCards,
}