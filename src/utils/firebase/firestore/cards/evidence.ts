import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Evidence } from "../../../types";
import db from "../firestore";
import { emptyEvidence } from "../../../helpers";

async function getEvidenceCard(topic: string, side: string, ID: string){
  const card = (await getDoc(doc(db, "cards", topic, side, ID))).data() as Evidence;
  console.log(card);
  return card? card : emptyEvidence;
}

async function saveEvidenceCard(card: Evidence, topic:string, side: string){
  const docRef = doc(db, "schools", card.school);

  if(!card.cardID){
    const cardRef = doc(collection(db, "cards", topic, side));
    card.cardID = cardRef.id;
    await setDoc(cardRef, card);

    await updateDoc(docRef, {
      [`cards.${topic}.${side}.evidences`]: arrayUnion(card.cardID),
    })

  }else{
    await setDoc(doc(db, topic, side, card.cardID), card, {merge: true});
  }

  return;
}

export {
  getEvidenceCard,
  saveEvidenceCard,
}