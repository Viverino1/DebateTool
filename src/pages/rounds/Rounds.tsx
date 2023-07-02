import { useNavigate } from "react-router-dom";

export default function Rounds(props: {rounds: string[]}){
  const {rounds} = props;

  const navigate = useNavigate();

  return(
    <div>{rounds.map((e) => (<button onClick={() => navigate(e)} key={e}>{e}</button>))}</div>
  )
}