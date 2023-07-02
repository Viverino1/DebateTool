import { arrayUnion, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Competition, Contention, Invite, Team, User } from "../../types"
import db from "./firestore";
import { usersCol } from "../auth";
import store from "../../redux/store";

async function createTeam(teamName: string, ownerUID: string, memberUID: string){
  const teamDoc = doc(collection(db, "teams"));
  const teamRef = doc(db, "teams", teamDoc.id);

  await setDoc(teamDoc, {teamName: teamName});
  await setDoc(doc(usersCol, ownerUID), {teamID: teamDoc.id}, {merge: true});

  await setDoc(doc(teamRef, "members", ownerUID), {
    memberSince: Math.floor(Date.now()/1000),
    permission: "owner",
  });

  await setDoc(doc(teamRef, "invites", memberUID), {
    invitedOn: Math.floor(Date.now()/1000),
    permission: "member",
  } as Invite);

  return teamDoc.id;
}

async function getContentions(teamID: string, topic: string, side: string){
  const contentions = (await getDoc(doc(db, "teams", teamID, "contentions", topic))).data()
  if(contentions && side in contentions){
    return contentions[side];
  }else{
    return [] as Contention[];
  }
}

async function getTeam(teamID: string, topic: string, side: string){
  const team = JSON.parse(JSON.stringify(store.getState().team));
  if(!teamID){return team}
  const teamDoc = await getDoc(doc(db, "teams", teamID));
  const teamData = await teamDoc.data();

  const contentions = await getContentions(teamID, topic, side);

  console.log(teamData);

  if(teamData){
    team.teamID = teamDoc.id;
    team.teamName = teamData.teamName;
    team.competitions = (teamData.competitions[topic]? teamData.competitions[topic] : []);
    team.contentions = contentions;
  }

  return team;
}

async function getTeamName(teamID: string){
  const teamDoc = await getDoc(doc(db, "teams", teamID));
  const d = await teamDoc.data();
  const teamData = d? d : undefined;

  return teamData? teamData.teamName as string : "" as string;
}

async function saveTeamName(teamID: string, teamName: string){
  await setDoc(doc(db, "teams", teamID), {teamName: teamName});
  return;
}

async function saveContentions(team: Team, topic: string){
  await setDoc(doc(db, "teams", team.teamID, "contentions", topic), team.contentions, {merge: true});
}

async function getInvite(teamID: string, user: User){
  const inviteDoc = doc(db, "teams", teamID, "invites", user.uid);
  const inviteData = (await getDoc(inviteDoc)).data() as Invite;
  return inviteData? inviteData : {invitedOn: 0, permission: ""} as Invite;
}

async function joinTeam(teamID: string, user: User, invite: Invite){
  const inviteDoc = doc(db, "teams", teamID, "invites", user.uid);
  const memberDoc = doc(db, "teams", teamID, "members", user.uid);
  await setDoc(memberDoc, {memberSince: Date.now() / 1000, permission: invite.permission});
  await deleteDoc(inviteDoc);
}

async function newCompetition(team: Team, competition: Competition){
  const teamDoc = doc(db, "teams", team.teamID);

  await updateDoc(teamDoc, {
    [`competitions.`]: arrayUnion()
  })
}

export {
  getContentions,
  createTeam,
  getTeam,
  saveTeamName,
  saveContentions,
  getTeamName,
  joinTeam,
  getInvite,
}