import { Contention } from "../../types"

function getContentions(){
  const contentions: Contention[] = [
    {
      text: "First Contention", 
      subpoints: ["First Subpoint", "Second Subpoint"]
    },
    {
      text: "Second Contention", 
      subpoints: ["Third Subpoint", "Fourth Subpoint"]
    },
  ];
  return contentions;
}

export {
  getContentions,
}