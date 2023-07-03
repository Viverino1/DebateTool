import { useNavigate } from "react-router-dom";
import { Round } from "../../utils/types";

export default function RoundDescription(props: {round: Round}){
  const navigate = useNavigate();
  const {roundID} = props.round;

  return (
    <div className="w-full h-full p-2">
      <button 
      className="w-full h-full bg-neutral-800/50 border-2 border-neutral-700 rounded-xl p-2 flex flex-col space-y-2"
      onClick={() => {
        navigate(roundID);
      }}>
      </button>
    </div>
  )
}