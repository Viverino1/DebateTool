import { collection, doc, setDoc } from "firebase/firestore";
import { Evidence } from "../../../types";
import db from "../firestore";

async function saveEvidenceCard(card: Evidence, topic:string, side: string){
  if(card.teamID == ""){card.teamID = "NO_TEAM"}
  
  if(!card.cardID){
    const cardRef = doc(collection(db, "cards", topic, side));
    card.cardID = cardRef.id;
    await setDoc(cardRef, card);
  }else{
    await setDoc(doc(db, topic, side, card.cardID), card, {merge: true});
  }

  return;
}

export {
  saveEvidenceCard,
}