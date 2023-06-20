import { Search } from "react-bootstrap-icons";
import EvidenceCard from "../../components/cards/EvidenceCard";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../utils/redux/hooks";
import { Evidence } from "../../utils/types";
import { getCards } from "../../utils/firebase/firestore/firestore";

export default function Cards(){
  const user = useAppSelector((state) => state.auth.user);
  //const {side, topic} = useAppSelector((state) => state.app);

  const [evidenceIDs, setEvidenceIDs] = useState<string[]>([]);

  useEffect(() => {
    //getCards(side, topic);
  }, [])

  return(
    <div className="relative flex flex-col w-full h-full">
      <div className="absolute top-4 z-20 right-8 left-4">
        <div className="text-center w-full h-16 px-4 rounded-xl flex space-x-4 items-center
        backdrop-blur-sm border-2 border-neutral-700 bg-neutral-800/50">
          <Search size={30}/>
          <input type="text" id="search" className="w-full h-full bg-transparent outline-none text-lg" placeholder="Search"/>
        </div>
      </div>
      <div className="flex flex-wrap p-2 pt-22 w-full h-full overflow-auto">
        {evidenceIDs.map((id) => (
          <div key={id} className="w-1/3 h-1/2">
            <EvidenceCard data={{} as Evidence}/>
          </div>
        ))}
      </div>
    </div>
  )
}