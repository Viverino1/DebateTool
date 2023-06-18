type Evidence = {
  cardID: string,
  ownwerUID: string,
  teamID: string,
  isPublic: boolean,
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
  userName: string,
  displayName: string,
  speaker: number,
}

export type {
  Evidence,
  Contention,
  User,
};