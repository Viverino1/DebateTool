import {doc, getDoc, setDoc } from "firebase/firestore";
import app from "./config";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { createCollection } from "./firestore/firestore";
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

const usersCol = createCollection<User>('users');

async function getUser(ID: string){
  const user = (await getDoc(doc(usersCol, ID))).data();
  return user? user : {} as User;
}

async function createUser(user: User){
  await setDoc(doc(usersCol, user.uid), user);

  return;
}

async function editUser(user: User){
  await setDoc(doc(usersCol, user.uid), user, {merge: true});
}

export {
  handleAuthClick,
  handleSignOutClick,
  auth,
  getUser,
  createUser,
  editUser,
  usersCol,
}