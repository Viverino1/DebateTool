type Evidence = {
  cardID: string,
  ownwerUID: string,
  teamID: string,
  school: string,
  visibility: string,
  createTime: number,
  lastEditTime: number,
  title: string,
  text: string,
  reasoning: string,
  sourceName: string,
  sourceLink: string,
  contention: number,
  subpoint: number,
}

type Contention = {
  text: string,
  subpoints: string[],
}

type User = {
  uid: string,
  teamID: string,
  email: string,
  photoURL: string,
  displayName: string,
  firstName: string,
  lastName: string,
  school: string,
  speaker: number,
}

type School = {
  district: string,
  name: string,
}

type StaticData = {
  schools: School[],
}

export type {
  School,
  StaticData,
  Evidence,
  Contention,
  User,
};