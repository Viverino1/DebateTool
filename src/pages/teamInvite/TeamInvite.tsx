import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { getInvite, getTeamName, joinTeam } from "../../utils/firebase/firestore/team";
import Loading from "../../components/Loading";
import RedButton from "../../components/UI/buttons/redButton";
import { useAppSelector } from "../../utils/redux/hooks";
import { Invite } from "../../utils/types";

export default function TeamInvite(){
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState("");
  const [teamID, setTeamID] = useState("");
  const [invite, setInvite] = useState<Invite>({invitedOn: 0, permission: ""});
  const user = useAppSelector((state) => state.auth.user);
  
  const location = useLocation();

  useEffect(() => {
    let path = location.pathname.replace("/invite/", "").replace("/", "");
    const ID = path == location.pathname? "" : path;
    

    if(!ID){
      setTeamID("");
      setLoading(false);
      return;
    }

    getTeamName(ID).then((tn) => {
      setTeamName(tn);
      setTeamID(ID);
      
      if(!tn){
        setLoading(false);
        return;
      }

      getInvite(ID, user).then((invite) => {
        setInvite(invite);
        setLoading(false)
      })
    });
  }, []);

  if(loading){return <Loading/>}

  if(!teamID){navigate("/cards")}
  if(!invite.permission){navigate("/cards")}

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
            <div className="text-lg text-center">
              You were invited to this team on
              {" " + new Date(invite.invitedOn * 1000).toDateString()} at 
              {" " + new Date(invite.invitedOn * 1000).toLocaleTimeString()} to be a {invite.permission}
               </div>
            <RedButton
            callback={() => {joinTeam(teamID, user, invite).then()}}
            text="Join Team"
            />
          </div>
        </div>
      </div>
    </div>
  )
}