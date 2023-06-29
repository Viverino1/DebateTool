import { useDispatch } from "react-redux";
import TextInputMedium from "../../components/UI/textInput/TextInputMedium";
import { useAppSelector } from "../../utils/redux/hooks";
import { setUser } from "../../utils/redux/reducers/auth";
import RedButton from "../../components/UI/buttons/redButton";
import { editUser } from "../../utils/firebase/auth";
import SpeakerSelector from "../../components/UI/selectors/SpeakerSelector";
import UserSelector from "../../components/UI/selectors/UserSelector";
import { useState } from "react";
import { createTeam, getTeam, saveTeamName } from "../../utils/firebase/firestore/team";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import { Contention, User } from "../../utils/types";
import { setContentions, setTeam } from "../../utils/redux/reducers/team";

export default function Settings(){
  const user = useAppSelector((state) => state.auth.user);
  const {topic, side} = useAppSelector((state) => state.app);

  // const {side, topic} = useAppSelector((state) => state.app);

  // useEffect(() => {
  //   console.log(user.teamID, getTeam(user.teamID, topic, side));
  // }, [side, topic]);

  return(
    <div className="w-full h-full flex flex-col space-y-4 p-4 text-md overflow-auto">
      {user.teamID? <TeamSettings/> : <CreateTeam user={user} topic={topic} side={side}/>}
      {user.teamID? <CaseSettings/> : null}
      <UserSettings/>
    </div>
  )
}

function UserSettings(){
  const dispatch = useDispatch();
  const user = useAppSelector((state) => (state.auth.user));

  return(
    <div className="w-full h-fit flex space-y-4 p-4 rounded-xl border-2 border-neutral-500/50">
      <div className="w-full flex flex-col space-y-4">
        <div className="text-3xl text-red-500">User Settings</div>

        <div className="w-full">
          <div className="text-xl mb-2">Display Name</div>
          <TextInputMedium
          placeholder="Enter a display name."
          onChange={(value) => {dispatch(setUser({
            ...user,
            displayName: value,
          }))}}
          value={user.displayName}
          />
        </div>

        <div className="w-full">
          <div className="text-xl mb-2">First Name</div>
          <TextInputMedium
          placeholder="Enter your first name."
          onChange={(value) => {dispatch(setUser({
            ...user,
            firstName: value,
          }))}}
          value={user.firstName}
          />
        </div>

        <div className="w-full">
          <div className="text-xl mb-2">Last Name</div>
          <TextInputMedium
          placeholder="Enter your last name."
          onChange={(value) => {dispatch(setUser({
            ...user,
            lastName: value,
          }))}}
          value={user.lastName}
          />
        </div>

        <div className="w-full">
          <div className="text-xl mb-2">Speaker</div>
          <SpeakerSelector
          callback={(value) => {dispatch(setUser({
            ...user,
            speaker: value,
          }))}}
          value={user.speaker}
          />
        </div>

        <RedButton
        text="Save"
        callback={() => {
          editUser(user);
        }}
        />

      </div>
    </div>
  )
}

function TeamSettings(){
  const dispatch = useDispatch();
  const team = useAppSelector((state) => (state.team));

  return(
    <div className="w-full h-fit flex space-y-4 p-4 rounded-xl border-2 border-neutral-500/50">
      <div className="w-full flex flex-col space-y-4">
        <div className="text-3xl text-red-500">Team Settings</div>
        <TextInputMedium
          placeholder="Enter a team name."
          onChange={(value) => {dispatch(setTeam({
            ...team,
            teamName: value,
          }))}}
          value={team.teamName}
          />

        <RedButton
        text="Save"
        callback={() => {
          saveTeamName(team.teamID, team.teamName);
        }}
        />  
      </div>
    </div>
  )
}

function CaseSettings(){
  const dispatch = useDispatch();

  const contentions = useAppSelector((state) => state.team.contentions);

  return(
    <div className="w-full h-fit flex space-y-4 p-4 rounded-xl border-2 border-neutral-500/50">
      <div className="w-full flex flex-col space-y-4">
        <div className="text-3xl text-red-500">Case Settings</div>

        {contentions.map((cont, index) => (
          <div className="w-full" key={index}>
            <div className="text-lg mb-2">Contention {index + 1}</div>
            <TextInputMedium
            placeholder={`Enter a name for contention ${index + 1}`}
            onChange={(value) => {
              const newContentions: Contention[] = JSON.parse(JSON.stringify(contentions));

              newContentions[index].text = value;

              dispatch(setContentions(newContentions))
            }}
            value={cont.text}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function CreateTeam(props: {user: User, topic: string, side: string}){
  const dispatch = useDispatch();

  const {user, topic, side} = props;

  const [teamMember, setTeamMember] = useState("");
  const [teamName, setTeamName] = useState("");

  const [errMsg, setErrMsg] = useState("");

  return(
    <div className="w-full h-fit flex space-y-4 p-4 rounded-xl border-2 border-neutral-500/50">
      <div className="w-full flex flex-col space-y-4">
        <div className="text-3xl text-red-500">Create Team</div>

        <div className="w-full">
          <div className="text-xl mb-2">Team Name</div>
          <TextInputMedium
          placeholder="Enter a team name."
          onChange={(value) => {setTeamName(value); setErrMsg("")}}
          value={teamName}
          />
        </div>

        <div className="w-full">
          <div className="text-xl mb-2">Team Member</div>
          <UserSelector
          callback={(value) => {setTeamMember(value); setErrMsg("")}}
          value={teamMember}
          />
        </div>

        <div className="flex items-center space-x-4 w-full ">
          <RedButton
          callback={() => {
            if(!teamName){
              setErrMsg("Please choose a team name.");
              return;
            }
            if(!teamMember){
              setErrMsg("Please choose a team member.");
              return;
            }
            if(teamMember == user.uid){
              setErrMsg("You cannot select yourself as a team member.");
              return;
            }
            createTeam(teamName, user.uid, teamMember).then((id) => {
              getTeam(id, topic, side).then((team) => {
                dispatch(setTeam(team));
                dispatch(setUser({...user, teamID: team.teamID}));
              })
            })
          }}
          text="Create Team"
          />
          <div className={`items-center space-x-2 text-lg text-red-500 transition-all overflow-clip w-fit animate-pulse ${errMsg? "flex" : "hidden"}`}>
            <ExclamationCircleFill size={30}/>
            <div>{errMsg}</div>
          </div>
        </div>
      </div>
    </div>
  )
}