import { useState } from "react";
import TextInputMedium from "../../components/UI/textInput/TextInputMedium";
import { emptyCompetition } from "../../utils/helpers";
import RedButton from "../../components/UI/buttons/redButton";
import { XLg } from "react-bootstrap-icons";
import { newCompetition } from "../../utils/firebase/firestore/team";
import { useAppSelector } from "../../utils/redux/hooks";

export default function NewCompetition(props: {close: () => void}){
  const [competition, setCompetition] = useState(emptyCompetition);
  const team = useAppSelector(state => state.team);
  const topic = useAppSelector(state => state.app.topic);

  return(
    <div className="relative w-1/2 h-fit flex flex-col space-y-4 items-center text-xl bg-neutral-800/50 border-2 border-neutral-700 p-4 rounded-xl">
      <button 
      className="absolute top-4 right-4 w-10 h-10 border-2 transition-all duration-300 border-neutral-700 hover:border-red-500 rounded-full flex justify-center items-center"
      onClick={() => {props.close()}}>
        <XLg size={20}/>
      </button>

      <div className="w-full text-center">New Competition</div>

      <TextInputMedium
      placeholder="Name"
      onChange={(value) => {
        setCompetition({...competition, name: value})
      }}
      value={competition.name}
      />

      <TextInputMedium
      placeholder="Location"
      onChange={(value) => {
        setCompetition({...competition, location: value})
      }}
      value={competition.location}
      />

      <TextInputMedium
      placeholder="Address"
      onChange={(value) => {
        setCompetition({...competition, address: value})
      }}
      value={competition.address}
      />

      <RedButton
      callback={() => {
        newCompetition(team, competition, topic);
        props.close();
      }}
      text="Add Competition"
      />
    </div>
  )
}