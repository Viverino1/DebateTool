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
  contention: number,
  subpoint: number,
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

type OppSpeech = {
  start: number,
  end: number,
  notes: string,
}

type SelfSpeech = {
  start: number,
  end: number,
  speech: string,
}

type Round = {
  title: string,
  firstSpeaker: "self" | "opp",

  self: {
    teamCode: string,
    school: string,
    speeches: {
      intro: SelfSpeech,
      crossfire1: SelfSpeech,
      rebuttal: SelfSpeech,
      crossfire2: SelfSpeech,
      summary: SelfSpeech,
      grandCrossfire: SelfSpeech,
      final: SelfSpeech
    }
  }

  opp: {
    teamCode: string,
    school: string,
    speeches: {
      intro: OppSpeech,
      crossfire1: OppSpeech,
      rebuttal: OppSpeech,
      crossfire2: OppSpeech,
      summary: OppSpeech,
      grandCrossfire: OppSpeech,
      final: OppSpeech
    }
  }
}

type Team = {
  teamName: string,
  teamID: string,
  contentions: Contention[],
  rounds: Round[],
}

type Invite = {
  invitedOn: number,
  permission: string,
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
  Team,
  Round,
  Invite,
};