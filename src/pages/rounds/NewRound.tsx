import { useState } from "react";
import TextInputMedium from "../../components/UI/textInput/TextInputMedium";
import { emptyRound } from "../../utils/helpers";
import RedButton from "../../components/UI/buttons/redButton";
import { XLg } from "react-bootstrap-icons";
import { useAppSelector } from "../../utils/redux/hooks";
import SpeakerSelector from "../../components/UI/selectors/SpeakerSelector";
import { Competition, Round } from "../../utils/types";
import SideSelector from "../../components/UI/selectors/SideSelector";
import { addRound } from "../../utils/firebase/firestore/team";

export default function NewRound(props: {close: () => void, competition: Competition}){
  const [round, setRound] = useState(emptyRound);
  const team = useAppSelector(state => state.team);
  const {topic, side} = useAppSelector(state => state.app);

  return(
    <div className="group relative w-1/2 h-fit flex flex-col space-y-4 items-center text-xl bg-neutral-800/50 border-2 border-neutral-700 p-4 rounded-xl">
      <button 
      className="absolute top-4 right-4 w-10 h-10 border-2 transition-all duration-300 border-neutral-700 hover:border-red-500 rounded-full flex justify-center items-center"
      onClick={() => {props.close()}}>
        <XLg size={20}/>
      </button>

      <div className="w-full text-center">New Round</div>

      <TextInputMedium
      placeholder="Title"
      onChange={(value) => {
        setRound({...round, title: value})
      }}
      value={round.title}
      />
      <div className="w-full flex space-x-4 justify-center items-center">
        <SpeakerSelector
        value={round.teamNumber}
        callback={(value) => {
          setRound({...round, teamNumber: value})
        }}
        />
        <div><SideSelector id="newRound"/></div>

        <div className="w-48"><TextInputMedium
        placeholder="Team Code"
        onChange={(value) => {
          setRound({...round, self: {...round.self, teamCode: value}});
        }}
        value={round.self.teamCode}
        /></div>
      </div>

      <div className="w-full flex flex-col items-center space-y-1">
        <div>Opposition Info</div>
        <div className="w-full h-px bg-red-500"/>
      </div>

      <div className="flex w-full space-x-4">
        <TextInputMedium
        placeholder="Speaker 1"
        onChange={(value) => {
          setRound({...round, opp: {...round.opp, speaker1: value}})
        }}
        value={round.opp.speaker1}
        />

        <TextInputMedium
        placeholder="Speaker 2"
        onChange={(value) => {
          setRound({...round, opp: {...round.opp, speaker2: value}})
        }}
        value={round.opp.speaker2}
        />
      </div>

      <div className="w-full flex space-x-4">
        <TextInputMedium
        placeholder="School"
        onChange={(value) => {
          setRound({...round, opp: {...round.opp, school: value}})
        }}
        value={round.opp.school}
        />

        <div className="w-48"><TextInputMedium
        placeholder="Team Code"
        onChange={(value) => {
          setRound({...round, opp: {...round.opp, teamCode: value}})
        }}
        value={round.opp.teamCode}
        /></div>
      </div>

      <RedButton
      callback={() => {
        const newRound = JSON.parse(JSON.stringify(round)) as Round;
        newRound.competition = props.competition.name;
        newRound.side = side;

        addRound(team.teamID, topic, round).then(() => {
          props.close();
        });
      }}
      text="Add Round"
      />
    </div>
  )
}