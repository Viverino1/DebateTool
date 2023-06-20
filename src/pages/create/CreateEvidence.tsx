import { useState } from "react";
import IndigoButton from "../../components/UI/buttons/IndigoButton";
import TextInputLarge from "../../components/UI/textInput/TextInputLarge";
import TextInputMedium from "../../components/UI/textInput/TextInputMedium";
import EvidenceCard from "../../components/cards/EvidenceCard";
import { emptyEvidence } from "../../utils/helpers";
import TextArea from "../../components/UI/textInput/TextArea";
import ContentionSubpointSelector from "../../components/UI/selectors/ContentionSubpointSelector";
import VisibilitySelector from "../../components/UI/selectors/VisibilitySelector";
import { Evidence } from "../../utils/types";
import store from "../../utils/redux/store";
import { saveEvidenceCard } from "../../utils/firebase/firestore/cards/evidence";

export default function CreateEvidence(){
  const [data, setData] = useState(emptyEvidence);
  const {
    isPublic,
    title,
    text,
    reasoning,
    sourceName,
    sourceLink,
    contention,
    subpoint,
  } = data;
  //console.log(cardID, ownwerUID, teamID, visibility, createTime, lastEditTime, contention, subpoint);
  return(
    <div className="flex w-full h-full p-4">
      <div className="flex flex-col space-y-4 w-2/3 h-full">
        <div className="flex flex-col space-y-4 w-full h-fit">
          <TextInputLarge 
          placeholder="Title" 
          onChange={(value) => {setData({...data, ...{title: value}})}}
          value={title}/>

          <ContentionSubpointSelector
          value={{contention: contention, subpoint: subpoint}}
          onChange={(contention, subpoint) => {
            setData({...data, ...{contention: contention, subpoint: subpoint}})
          }}/>
    
          <TextInputMedium
          value={sourceName}
          placeholder="Source Name"
          onChange={(value) => {setData({...data, ...{sourceName: value}})}}/>

          <div className="text-indigo-500">
            <TextInputMedium
            value={sourceLink}
            placeholder="Source Link"
            onChange={(value) => {setData({...data, ...{sourceLink: value}})}}/>
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
          <EvidenceCard data={data}/>
        </div>
        <VisibilitySelector
        callback={(value) => {
          setData({...data, isPublic: value == "public"? true : false});
        }}
        value={isPublic? "public" : "private"}
        />
        <div>
          <IndigoButton callback={() => {handleCardSave(data)}} text="Save Card"/>
        </div>
      </div>
    </div>
  )
}

function handleCardSave(data: Evidence){
  const state = store.getState();
  const user = state.auth.user;
  const {topic, side} = state.app;


  let time = new Date().getTime();
  data.createTime = time;
  data.lastEditTime = time;
  data.ownerUID = user.uid;
  data.school = user.school;
  data.teamID = user.teamID;
  console.log(topic, side);

  saveEvidenceCard(data, topic, side);
}