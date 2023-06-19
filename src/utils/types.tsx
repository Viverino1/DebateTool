type Card = {
  type: string,
  cardID: string,
  ownwerUID: string,
  teamID: string,
  school: string,
  visibility: string,
  createTime: number,
  lastEditTime: number,
  title: string,
  sourceName: string,
  sourceLink: string,
  reasoning: string,
}

type Evidence = Card & {
  text: string,
  contention: number,
  subpoint: number,
}

type Quote = Card & {
  quote: string,
  quotee: string,
  contention: string,
  subpoint: string,
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
  topics: string[]
}

export type {
  School,
  StaticData,
  Evidence,
  Contention,
  User,
  Card,
  Quote,
};