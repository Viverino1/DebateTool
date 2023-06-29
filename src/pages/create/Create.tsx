import { Outlet, useNavigate } from "react-router-dom";
import IndigoButton from "../../components/UI/buttons/IndigoButton";
import EvidenceCard from "../../components/cards/EvidenceCard";
import { Evidence, Quote, Rebuttal } from "../../utils/types";
import QuoteCard from "../../components/cards/QuoteCard";
import EmeraldButton from "../../components/UI/buttons/emeraldButton";
import RebuttalCard from "../../components/cards/RebuttalCard";
import AmberButton from "../../components/UI/buttons/amberButton";

export default function Create(){
  return(
    <div className="w-full h-full p-2 overflow-auto">
      <EvidenceExample/>
      <QuoteExample/>
      <RebuttalExample/>
    </div>
  )
}

function EvidenceExample(){
  const navigate = useNavigate();

  const data = {
    type: "evidence",
    cardID: "ExampleEvidence",
    ownerUID: "uid",
    isPublic: true,
    title: "Lorem Ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    sourceName: "Lipsum",
    sourceLink: "https://www.lipsum.com/",
    contention: 0,
    subpoint: 2,
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

function QuoteExample(){
  const navigate = useNavigate();

  const data = {
    type: "quote",
    cardID: "ExampleQuote",
    ownerUID: "",
    isPublic: true,
    title: "Anti-Revenge Quote",
    sourceName: "The Times of India",
    sourceLink: "https://timesofindia.indiatimes.com/blogs/the-photo-blog/remembering-gandhi-top-10-quotes-by-the-mahatma/",
    contention: 0,
    subpoint: 2,
    quote: "An eye for an eye only ends up making the whole world blind.",
    quotee: "Mahatma Gandhi",
  } as Quote;
  return(
    <div className="flex w-full h-1/2">
        <div className="p-2 flex flex-col space-y-4 text-neutral-200 text-xl">
          <div className="text-4xl text-emerald-500">Create Quote Card</div>
          <div className="">Quote cards are best used to store quotes for pathos that backs up a subpoint or contention in your case.</div>
          <div>
            <div>What's saved in a Quote card?</div>
            <ul className="list-disc list-inside ml-4">
              <li>Title</li>
              <li>Source</li>
              <li>Text Evidence</li>
              <li>Reasoning (How does this evidence prove your point?)</li>
              <li>Contention and Subpoint</li>
            </ul>
          </div>
          <EmeraldButton callback={() => {navigate("/create/quote")}} text="Create Quote Card"/>
        </div>
        <div className="w-1/2 h-full">
          <QuoteCard data={data}/>
        </div>
        <Outlet/>
      </div>
  )
}

function RebuttalExample(){
  const navigate = useNavigate();

  const data = {
    type: "evidence",
    cardID: "ExampleEvidence",
    ownerUID: "uid",
    isPublic: true,
    title: "Lorem Ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    sourceName: "Lipsum",
    sourceLink: "https://www.lipsum.com/",
    rebuttalTo: "eee",
  } as Rebuttal;
  return(
    <div className="flex w-full h-1/2">
        <div className="w-1/2 h-full">
          <RebuttalCard data={data}/>
        </div>
        <div className="p-2 flex flex-col space-y-4 text-neutral-200 text-xl">
          <div className="text-4xl text-amber-500">Create Rebuttal Card</div>
          <div className="">Rebuttal cards are best used to store evidence that you will use to refute your opposition's claims against your case.</div>
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
          <AmberButton callback={() => {navigate("/create/rebuttal")}} text="Create Rebuttal Card"/>
        </div>
        <Outlet/>
      </div>
  )
}