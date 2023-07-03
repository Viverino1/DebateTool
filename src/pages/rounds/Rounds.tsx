import { useEffect, useState } from "react";
import { PlusCircleFill, Search } from "react-bootstrap-icons";
import { emptyRound, getValue } from "../../utils/helpers";
import NewCompetition from "./NewCompetition";
import { Competition } from "../../utils/types";
import RoundDescription from "./RoundDescription";
import { useAppSelector } from "../../utils/redux/hooks";
import NewRound from "./NewRound";

export default function Rounds(props: {competition: Competition}){
  const {name, roundIDs, address, location} = props.competition;
  const rounds = useAppSelector(state => state.rounds.rounds);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewRound, setShowNewRound] = useState(false);

  useEffect(() => {
    if(rounds.length == 0){

    }
  }, [])

  return(
    <div className="w-full relative flex justify-center items-center">
    <div className={`absolute z-30 w-full ${showNewRound? "h-full opacity-100" : "h-0 opacity-0"} transition-all duration-300 overflow-clip bg-neutral-800/50 backdrop-blur-md flex justify-center items-center`}>
      <NewRound close={() => {setShowNewRound(!showNewRound)}} competition={props.competition}/>
    </div>

    <div className="relative w-full h-full">
      <div className="absolute top-4 z-20 right-4 left-4">
        <div className="text-center w-full h-16 px-4 rounded-xl flex space-x-4 items-center
        backdrop-blur-sm border-2 border-neutral-700 bg-neutral-800/50">
          <Search size={30}/>
          <input type="text" id="search" className="w-full h-full bg-transparent outline-none text-lg" placeholder={`Search rounds from ${name}.`}
          onChange={() => {
            setSearchQuery(getValue("search", ""));
          }}/>
        </div>
      </div>
      <div className="h-full p-2 pt-22 overflow-auto">
        {rounds.map((round, index) => (
          <div key={index} className="w-full h-1/4">
            <RoundDescription round={emptyRound}/>
          </div>
        ))}

        <div className="w-full h-1/4 p-2">
          <button className="w-full h-full bg-neutral-800/50 border-2 border-neutral-700 rounded-xl p-2 flex flex-col space-y-2 justify-center items-center text-neutral-300"
          onClick={() => {setShowNewRound(!showNewRound)}}>
              <div className="flex justify-center items-center space-x-2">
                <PlusCircleFill size={30}/>
                <div className="text-2xl">New Round</div>
              </div>
              <div className="text-md">Start a new Debate Tool round here!</div>
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}