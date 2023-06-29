import { PencilFill, Trash3Fill } from "react-bootstrap-icons";
import UserInfo from "../../../components/information/UserInfo";
import { Card } from "../../../utils/types";
import { useNavigate } from "react-router-dom";
import { deleteEvideneCard } from "../../../utils/firebase/firestore/cards/evidence";
import { useAppSelector } from "../../../utils/redux/hooks";
import { deleteQuoteCard } from "../../../utils/firebase/firestore/cards/quote";
import { deleteRebuttalCard } from "../../../utils/firebase/firestore/cards/rebuttal";

export default function CardDetails(props: {card: Card}){
  const navigate = useNavigate();

  const {topic, side} = useAppSelector((state) => state.app);
  const {card} = props;

  const {
    ownerUID,
    createTime,
    lastEditTime,
    cardID,
    isPublic,
  } = card;

  return(
    <div className="flex flex-col space-y-4 w-fit h-fit text-lg">
      <div>
        <div className="text-2xl">Details</div>
        <div className="">{Details(createTime, lastEditTime, isPublic)}</div>
      </div>
      <div className="text-2xl mb-4">Options</div>
        <div className="w-fit h-fit flex space-x-4 mb-4 bg-neutral-800 rounded-xl p-4">
          <button onClick={() => {
            navigate(`/cards/edit/${cardID}`);
          }}>
            <PencilFill size={25}/>
          </button>
          <button onClick={() => {
            if(card.type == "evidence"){
              deleteEvideneCard(card.cardID, topic, side).then(() => {
                navigate("/cards");
              })
            }else if(card.type == "quote"){
              deleteQuoteCard(card.cardID, topic, side).then(() => {
                navigate("/cards");
              })
            }else if(card.type == "rebuttal"){
              deleteRebuttalCard(card.cardID, topic, side).then(() => {
                navigate("/cards");
              })
            }
          }}>
            <Trash3Fill size={25}/>
          </button>
        </div>
      <div className="text-2xl">Creator:</div>
      <div className="flex space-x-4 w-full h-full">
        <UserInfo uid={ownerUID}/>
      </div>
    </div>
  )
}

function Details(createdTime: number, editedTime: number, isPublic: boolean){
  const createdDate = new Date(createdTime);
  const editedDate = new Date(editedTime);
  var outputString = `This card was created on ${createdDate.toLocaleDateString()} at ${createdDate.toLocaleTimeString()}`;

  if(createdTime == editedTime){
    outputString += ", and was not edited since then.";
  }else{
    outputString += `, and was last edited on ${editedDate.toLocaleDateString()} at ${editedDate.toLocaleTimeString()}.`
  }

  outputString += isPublic? " This card is public." : " This card is private.";

  return outputString;
}