import { useState } from "react";
import { Search } from "react-bootstrap-icons";
import { getValue } from "../../utils/helpers";
import Round from "../../components/Round";

const rounds = [1, 2, 3, 4, 5]

export default function Rounds(){
  const [searchQuery, setSearchQuery] = useState("");

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
        {rounds.map((round) => (
          <div key={round} className="lg:w-1/2 w-full h-1/2">
            <Round/>
          </div>
        ))}
      </div>
    </div>
  )
}