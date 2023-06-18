import { Evidence } from "../../../types";

function getEvidenceCard(ID: string){
  return {
    cardID: ID,
    ownwerUID: "userID",
    teamID: "teamID",
    isPublic: true,
    createTime: 23250,
    lastEditTime: 90210,
    title: "This is the title.",
    text: "union representation elections allowed for [...] workers to force other workers to join a union or lose their job. Under the closed shop arrangement permissible under the Wagner Act, unions controlled who was hired, since union membership was mandatory for employment.",
    reasoning: "In states without Right to Work laws, there is a condition in many fields of work saying that one must join a union in order to be employed in a job. This means that people no longer have the choice of whether or not to join a union. Moreover, unions have control as to who is employed, because they have the right to decline someone of union membership along with the job that requires it.",
    sourceName: "Cato",
    sourceLink: "https://www.cato.org/sites/cato.org/files/serials/files/cato-journal/2010/1/cj30n1-9.pdf",
    contention: 3,
    subpoint: 2,
  } as Evidence
}

export {
  getEvidenceCard,
}