import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { Evidence } from "../../../types";
import db from "../firestore";
import store from "../../../redux/store";
import { addEvidenceCard, editEvidenceCard, removeEvidenceCard } from "../../../redux/reducers/cards";

async function saveEvidenceCard(card: Evidence, topic:string, side: string){
  if(card.teamID == ""){card.teamID = "NO_TEAM"}
  
  if(!card.cardID){
    const cardRef = doc(collection(db, "cards", topic, side));
    card.cardID = cardRef.id;
    store.dispatch(addEvidenceCard(card))
    await setDoc(cardRef, card);
  }else{
    const docRef = doc(db, "cards", topic, side, card.cardID);
    store.dispatch(editEvidenceCard(card));
    await setDoc(docRef, card, {merge: true});
  }
  return;
}

async function deleteEvideneCard(cardID: string, topic: string, side: string){
  const docRef = doc(db, "cards", topic, side, cardID);
  store.dispatch(removeEvidenceCard(cardID));
  await deleteDoc(docRef);
}

export {
  saveEvidenceCard,
  deleteEvideneCard,
}