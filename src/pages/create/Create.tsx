import { Outlet, useNavigate } from "react-router-dom";
import IndigoButton from "../../components/UI/buttons/IndigoButton";
import EvidenceCard from "../../components/cards/EvidenceCard";
import { Evidence } from "../../utils/types";

export default function Create(){
  return(
    <div className="w-full h-full p-2">
      <EvidenceExample/>
    </div>
  )
}

function EvidenceExample(){
  const navigate = useNavigate();

  const data = {
    cardID: "ExampleEvidence",
    ownwerUID: "uid",
    visibility: "public",
    title: "This is where you add a title.",
    contention: 1,
    subpoint: 3,
  } as Evidence;
  return(
    <div className="flex w-full h-1/2">
        <div className="w-1/2 h-full">
          <EvidenceCard data={data}/>
        </div>
        <div className="p-2 flex flex-col space-y-4 text-neutral-200 text-xl">
          <div className="text-4xl text-indigo-500">Create Evidence Card</div>
          <div className="">Evidence cards are best used to store core evidence that backs up a subpoint or contention in your case.</div>
          <div>
            <div>What's saved in an evidence card?</div>
            <ul className="list-disc list-inside ml-4">
              <li>Title</li>
              <li>Source</li>
              <li>Text Evidence</li>
              <li>Reasoning (How does this evidence prove your point?)</li>
              <li>Contention and Subpoint</li>
            </ul>
          </div>
          <IndigoButton callback={() => {navigate("/create/evidence")}} text="Create Evidence Card"/>
        </div>
        <Outlet/>
      </div>
  )
}