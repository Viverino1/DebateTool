import { Card, Cards, Evidence, Quote, Rebuttal, Team } from "./types";

function getValue(id: string, fallback: string){
  const inputElement = document.getElementById(id) as HTMLInputElement | null;
  const value = inputElement?.value;
  return value? value : fallback;
}

function getRadioValue(id: string){
  const inputElement = document.getElementById(id) as HTMLInputElement | null;
  const value = inputElement?.checked;
  return value? value : false;
}

const emptyCard: Card = {
  type: "",
  cardID: "",
  ownerUID: "",
  teamID: "",
  school: "",
  isPublic: false,
  createTime: 0,
  lastEditTime: 0,
  title: "",
  sourceName: "",
  sourceLink: "",
  reasoning: "",
}

const emptyEvidence: Evidence = {
  ...emptyCard,
  text: "",
  type: "evidence",
  contention: -3,
  subpoint: -3,
}

const emptyQuote: Quote = {
  ...emptyCard,
  type: "quote",
  quote: "",
  quotee: "",
  contention: -3,
  subpoint: -3,
}

const emptyRebuttal: Rebuttal = {
  ...emptyCard,
  type: "rebuttal",
  text: "",
  rebuttalTo: "",
}

const emptyCards: Cards = {
  evidences: [],
  rebuttals: [],
  quotes: [],
}

const emptyTeam: Team = {
  teamName: "",
  teamID: "",
  contentions: [],
  rounds: [],
}

function contsub(c: number, s: number){
  var outputString = "";
  if(c >= 0){
    outputString += ("C" + (c+1));
    if(s >= 0){
      outputString += (" S" + (s+1));
    }
  }else{
    switch(c){
      case -3: outputString = "NAN"; break;
      case -2: outputString = "Intro"; break;
      case -1: outputString = "Conclusion"; break;
      default: ""; break;
    }
  }
  return outputString;
}

function contsubTooltip(c: number, s: number){
  var outputString = "";
  if(c >= 0){
    outputString += ("Contention " + (c+1));
    if(s >= 0){
      outputString += (", Subpoint " + (s+1));
    }
  }else{
    switch(c){
      case -3: outputString = "NAN"; break;
      case -2: outputString = "Intro"; break;
      case -1: outputString = "Conclusion"; break;
      default: ""; break;
    }
  }
  return outputString;
}

export{
  getValue,
  getRadioValue,
  emptyEvidence,
  contsub,
  contsubTooltip,
  emptyCards,
  emptyQuote,
  emptyRebuttal,
  emptyTeam,
}