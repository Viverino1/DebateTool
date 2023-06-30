import { useState } from "react";
import { Search } from "react-bootstrap-icons";
import { emptyRound, getValue } from "../../utils/helpers";
import RoundCard from "../../components/Round";
import { Round } from "../../utils/types";
import { useAppSelector } from "../../utils/redux/hooks";

const rounds = [1, 2, 3, 4, 5];

export default function Rounds(){
  const team = useAppSelector((state) => state.team);
  const [searchQuery, setSearchQuery] = useState("");

  const round: Round = emptyRound;

  round.title = "This is the title.";
  round.firstTeam = team.teamID;

  return(
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
        {rounds.map((r) => (
          <div key={r} className="lg:w-1/2 w-full h-1/2">
            <RoundCard round={round} team={team}/>
          </div>
        ))}
      </div>
    </div>
  )
}