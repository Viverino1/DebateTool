type Card = {
  type: string,
  cardID: string,
  ownerUID: string,
  teamID: string,
  school: string,
  isPublic: boolean,
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

type Rebuttal = Card & {
  text: string,
  rebuttalTo: string,
}

type Cards = {
  evidences: Evidence[],
  quotes: Quote[],
  rebuttals: Rebuttal[],
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
  Cards,
  Rebuttal,
};