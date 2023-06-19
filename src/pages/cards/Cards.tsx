import { Search } from "react-bootstrap-icons";
import EvidenceCard from "../../components/cards/EvidenceCard";
import { useEffect, useState } from "react";
import { getCardIDs } from "../../utils/firebase/firestore/firestore";
import { useAppSelector } from "../../utils/redux/hooks";

export default function Cards(){
  const user = useAppSelector((state) => state.auth.user);
  const {side, topic} = useAppSelector((state) => state.app);

  const [evidenceIDs, setEvidenceIDs] = useState<string[]>([]);

  useEffect(() => {
    getCardIDs(user.school, topic, side)
    .then((ids) => {
      setEvidenceIDs(ids.evidences);
    })
  })

  const ids = [];
  for (let i = 1; i <= 12; i++) {
    ids[i] = i;
  }

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
            <EvidenceCard ID={String(id) }/>
          </div>
        ))}
      </div>
    </div>
  )
}