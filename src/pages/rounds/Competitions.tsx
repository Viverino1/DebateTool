import { useState } from "react";
import { PlusCircleFill, Search } from "react-bootstrap-icons";
import { getValue } from "../../utils/helpers";
import { OppSpeech, Round, SelfSpeech } from "../../utils/types";
import { useAppSelector } from "../../utils/redux/hooks";
import CompetitionDescription from "../../components/rounds/CompetitionDescription";
import NewCompetition from "./NewCompetition";

export default function Competitions(){
  const [searchQuery, setSearchQuery] = useState("");

  const selfSpeech: SelfSpeech = {
    start: 23250,
    end: 90210,
    speech: "This is the text from the speech",
  }

  const oppSpeech: OppSpeech = {
    start: 23250,
    end: 90210,
    notes: "The opposition accused us of...",
  }

  const round: Round = {
    roundID: "ID",

    title: "This is the title",
    competition: "Pattonville",
    teamNumber: 2,
    side: "AFF",

    self: {
      teamCode: "D7",

      speeches: {
        intro: selfSpeech,
        crossfire1: selfSpeech,
        rebuttal: selfSpeech,
        crossfire2: selfSpeech,
        summary: selfSpeech,
        grandCrossfire: selfSpeech,
        final: selfSpeech,
      }
    },

    opp: {
      teamCode: "E6",
      school: "Marquette High School",
      speaker1: "John Doe",
      speaker2: "Jessy Jacobs",

      speeches: {
        intro: oppSpeech,
        crossfire1: oppSpeech,
        rebuttal: oppSpeech,
        crossfire2: oppSpeech,
        summary: oppSpeech,
        grandCrossfire: oppSpeech,
        final: oppSpeech,
      }
    }
  };

  const competitions = useAppSelector((state) => state.team.competitions);

  const [showNewComp, setShowNewComp] = useState(false);

  return(
    <div className="w-full relative flex justify-center items-center">
    <div className={`absolute z-30 w-full ${showNewComp? "h-full opacity-100" : "h-0 opacity-0"} transition-all duration-300 overflow-clip bg-neutral-800/50 backdrop-blur-md flex justify-center items-center`}>
      <NewCompetition close={() => {setShowNewComp(!showNewComp)}}/>
    </div>
    <div className="relative flex flex-col w-full h-full">
      <div className="absolute top-4 z-20 right-4 left-4">
        <div className="text-center w-full h-16 px-4 rounded-xl flex space-x-4 items-center
        backdrop-blur-sm border-2 border-neutral-700 bg-neutral-800/50">
          <Search size={30}/>
          <input type="text" id="search" className="w-full h-full bg-transparent outline-none text-lg" placeholder="Search"
          onChange={() => {
            setSearchQuery(getValue("search", ""));
          }}/>
        </div>
      </div>
      <div className="flex flex-wrap p-2 pt-22 w-full h-full overflow-auto">
        {competitions.map((comp, index) => (
          <div key={index} className="w-1/2 h-1/4">
            <CompetitionDescription competition={comp}/>
          </div>
        ))}

        <div className="w-1/2 h-1/4 p-2">
          <button className="w-full h-full bg-neutral-800/50 border-2 border-neutral-700 rounded-xl p-2 flex flex-col space-y-2 justify-center items-center text-neutral-300"
          onClick={() => {setShowNewComp(!showNewComp)}}>
              <div className="flex justify-center items-center space-x-2">
                <PlusCircleFill size={30}/>
                <div className="text-2xl">Add Competition</div>
              </div>
              <div>Add competition to organize your rounds by competition.</div>
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}