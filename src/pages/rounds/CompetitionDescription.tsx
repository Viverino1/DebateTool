import { useNavigate } from "react-router-dom";
import { Competition } from "../../utils/types";

export default function CompetitionDescription(props: {competition: Competition}){
  const navigate = useNavigate();

  const {name, location, address} = props.competition;
  return (
    <div className="w-full h-full p-2">
      <button 
      className="w-full h-full bg-neutral-800/50 border-2 border-neutral-700 rounded-xl p-2 flex flex-col space-y-2"
      onClick={() => {
        navigate(name);
      }}>
        <div className="text-2xl text-red-500">{name}</div>
        <div className="text-md">Location: {location}</div>
        <div className="text-md">Address: {address}</div>
      </button>
    </div>
  )
}