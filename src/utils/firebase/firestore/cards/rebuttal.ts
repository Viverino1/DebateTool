import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { Rebuttal } from "../../../types";
import db from "../firestore";
import store from "../../../redux/store";
import { addRebuttalCard, editRebuttalCard, removeRebuttalCard } from "../../../redux/reducers/cards";

async function saveRebuttalCard(card: Rebuttal, topic:string, side: string){
  if(card.teamID == ""){card.teamID = "NO_TEAM"}
  
  if(!card.cardID){
    const cardRef = doc(collection(db, "cards", topic, side));
    card.cardID = cardRef.id;
    store.dispatch(addRebuttalCard(card))
    await setDoc(cardRef, card);
  }else{
    const docRef = doc(db, "cards", topic, side, card.cardID);
    store.dispatch(editRebuttalCard(card));
    await setDoc(docRef, card, {merge: true});
  }
  return;
}

async function deleteRebuttalCard(cardID: string, topic: string, side: string){
  const docRef = doc(db, "cards", topic, side, cardID);
  store.dispatch(removeRebuttalCard(cardID));
  await deleteDoc(docRef);
}

export {
  saveRebuttalCard,
  deleteRebuttalCard,
}