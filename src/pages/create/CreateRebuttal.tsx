import { useState } from "react";
import IndigoButton from "../../components/UI/buttons/IndigoButton";
import TextInputLarge from "../../components/UI/textInput/TextInputLarge";
import TextInputMedium from "../../components/UI/textInput/TextInputMedium";
import { emptyRebuttal } from "../../utils/helpers";
import TextArea from "../../components/UI/textInput/TextArea";
import VisibilitySelector from "../../components/UI/selectors/VisibilitySelector";
import { Rebuttal } from "../../utils/types";
import store from "../../utils/redux/store";
import { useNavigate } from "react-router-dom";
import RebuttalCard from "../../components/cards/RebuttalCard";
import { saveRebuttalCard } from "../../utils/firebase/firestore/cards/rebuttal";

export default function CreateRebuttal(props: {editCard?: Rebuttal}){
  const {editCard} = props;
  const navigate = useNavigate();

  const [data, setData] = useState(editCard? editCard : emptyRebuttal);
  const {
    isPublic,
    title,
    text,
    reasoning,
    sourceName,
    sourceLink,
    rebuttalTo,
  } = data;

  return(
    <div className="flex w-full h-full p-4">
      <div className="flex flex-col space-y-4 w-2/3 h-full">
        <div className="flex flex-col space-y-4 w-full h-fit">
          <TextInputLarge 
          placeholder="Title" 
          onChange={(value) => {setData({...data, ...{title: value}})}}
          value={title}/>

          <TextInputMedium
          value={sourceName}
          placeholder="Source Name"
          onChange={(value) => {setData({...data, ...{sourceName: value}})}}/>

          <div className="text-amber-500">
            <TextInputMedium
            value={sourceLink}
            placeholder="Source Link"
            onChange={(value) => {setData({...data, ...{sourceLink: value}})}}/>
          </div>

          <div>
            <TextInputMedium
            value={rebuttalTo}
            placeholder="Rebuttal To"
            onChange={(value) => {setData({...data, ...{rebuttalTo: value}})}}/>
          </div>
        </div>
        <div className="flex flex-col space-y-4 w-full h-full">
          <TextArea
          value={text}
          placeholder="Source Text"
          onChange={(value) => {setData({...data, ...{text: value}})}}/>

          <TextArea
          value={reasoning}
          placeholder="Reasoning"
          onChange={(value) => {setData({...data, ...{reasoning: value}})}}/>
        </div>
      </div>
      <div className="w-1/3 h-full flex flex-col space-y-4 justify-center items-center p-2">
        <div className="w-full h-1/2 -mb-2 -mr-4">
          <RebuttalCard data={data}/>
        </div>
        <VisibilitySelector
        callback={(value) => {
          setData({...data, isPublic: value == "public"? true : false});
        }}
        value={isPublic? "public" : "private"}
        />
        <div>
          <IndigoButton callback={() => {handleCardSave(data).then(() => {navigate("/cards")})}} text="Save Card"/>
        </div>
      </div>
    </div>
  )
}

async function handleCardSave(data: Rebuttal){
  const state = store.getState();
  const user = state.auth.user;
  const {topic, side} = state.app;


  let time = new Date().getTime();
  data.lastEditTime = time;

  if(!data.cardID){
    data.createTime = time;
    data.ownerUID = user.uid;
    data.school = user.school;
    data.teamID = user.teamID;
  }

  await saveRebuttalCard(data, topic, side);
  return;
}