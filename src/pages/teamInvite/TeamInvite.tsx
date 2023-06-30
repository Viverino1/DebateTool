import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { getTeamName, joinTeam } from "../../utils/firebase/firestore/team";
import Loading from "../../components/Loading";
import RedButton from "../../components/UI/buttons/redButton";
import { useAppSelector } from "../../utils/redux/hooks";

export default function TeamInvite(){
  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState("");
  const [teamID, setTeamID] = useState("");
  const user = useAppSelector((state) => state.auth.user);
  
  const location = useLocation();

  useEffect(() => {
    let path = location.pathname.replace("/invite/", "");
    const ID = path == location.pathname? "" : path;

    getTeamName(ID).then((tn) => {
      setTeamName(tn);
      setTeamID(ID);
      setLoading(false);
    });
  }, [])

  if(loading){return <Loading/>}

  return(
    <div className="relative w-full h-full">
      <div className="absolute z-0 w-full h-full flex justify-center items-center">
        <div className="absolute z-20 w-[50vh] h-[50vh] bg-red-500/50 rounded-full blur-3xl"/>
      </div>

      <div className="relative z-30 w-full h-full flex flex-col items-center justify-center p-4">
        <div className="absolute top-4 text-6xl">You're Invited!</div>

        <div className="relative w-96 h-fit border-2 border-neutral-700 rounded-xl overflow-clip">
          <div className=" z-10 w-full h-fit flex flex-col space-y-4 items-center p-4 bg-neutral-800/50">
            <div className="text-2xl text-red-500 w-full break-words text-center">{teamName}</div>
            <div className="w-full h-px bg-neutral-400"/>
            <div className="text-lg text-center">
              This is a Debate Tool team.
              Join it to collaborate in creating contentions, saving private cards, launching into realtime rounds, share cases, and much more.
            </div>
            <RedButton
            callback={() => {joinTeam(teamID, user)}}
            text="Join Team"
            />
          </div>
        </div>
      </div>
    </div>
  )
}