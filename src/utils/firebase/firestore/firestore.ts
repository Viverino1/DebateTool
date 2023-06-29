import { CollectionReference, DocumentData, and, collection, doc, getDoc, getDocs, initializeFirestore, or, persistentLocalCache, persistentMultipleTabManager, query, where } from "firebase/firestore";
import app from "../config";
import { Cards, Evidence, Quote, Rebuttal, StaticData, User } from "../../types";

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
    and(
      where("school", "==", user.school),
      where("isPublic", "==", true),
    ),
  ));

  const querySnapshot = await getDocs(q);

  const evidences: Evidence[] = [];
  const rebuttals: Rebuttal[] = [];
  const quotes: Quote[] = [];

  querySnapshot.forEach((doc) => {
    const card = doc.data();

    if(card.type == "evidence"){
      evidences.push(card as Evidence);
    }

    if(card.type == "quote"){
      quotes.push(card as Quote);
    }

    if(card.type == "rebuttal"){
      rebuttals.push(card as Rebuttal);
    }
  })

  return {evidences: evidences, rebuttals: rebuttals, quotes: quotes} as Cards;
}

export default db;
export {
  createCollection,
  getSchools,
  getTopics,
  getCards,
}