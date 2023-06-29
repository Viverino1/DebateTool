import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { Quote } from "../../../types";
import db from "../firestore";
import store from "../../../redux/store";
import { addQuoteCard, editQuoteCard, removeQuoteCard } from "../../../redux/reducers/cards";

async function saveQuoteCard(card: Quote, topic:string, side: string){
  if(card.teamID == ""){card.teamID = "NO_TEAM"}
  
  if(!card.cardID){
    const cardRef = doc(collection(db, "cards", topic, side));
    card.cardID = cardRef.id;
    store.dispatch(addQuoteCard(card))
    await setDoc(cardRef, card);
  }else{
    const docRef = doc(db, "cards", topic, side, card.cardID);
    store.dispatch(editQuoteCard(card));
    await setDoc(docRef, card, {merge: true});
  }
  return;
}

async function deleteQuoteCard(cardID: string, topic: string, side: string){
  const docRef = doc(db, "cards", topic, side, cardID);
  store.dispatch(removeQuoteCard(cardID));
  await deleteDoc(docRef);
}

export {
  saveQuoteCard,
  deleteQuoteCard,
}