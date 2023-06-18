import { CollectionReference, DocumentData, collection, doc, getDoc } from "firebase/firestore";
import app from "./config";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import db from "./firestore/firestore";
import { User } from "../types";

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

async function handleAuthClick(){
  const fbu = (await signInWithPopup(auth, provider)).user;
  return fbu;
}

async function handleSignOutClick(){
  return auth.signOut();
}

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}

const usersCol = createCollection<User>('users');

async function getUser(ID: string){
  const user = (await getDoc(doc(usersCol, ID))).data();
  return user? user : {} as User;
}

export {
  handleAuthClick,
  handleSignOutClick,
  auth,
  getUser,
}