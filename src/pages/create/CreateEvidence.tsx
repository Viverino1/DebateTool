import { useState } from "react";
import IndigoButton from "../../components/UI/buttons/IndigoButton";
import TextInputLarge from "../../components/UI/textInput/TextInputLarge";
import TextInputMedium from "../../components/UI/textInput/TextInputMedium";
import EvidenceCard from "../../components/cards/EvidenceCard";
import { emptyEvidence } from "../../utils/helpers";
import TextArea from "../../components/UI/textInput/TextArea";
import ContentionSubpointSelector from "../../components/UI/dropdowns/ContentionSubpointSelector";

export default function CreateEvidence(){
  const [data, setData] = useState(emptyEvidence);
  const {
    cardID,
    ownwerUID,
    teamID,
    isPublic,
    createTime,
    lastEditTime,
    title,
    text,
    reasoning,
    sourceName,
    sourceLink,
    contention,
    subpoint,
  } = data;
  return(
    <div className="flex w-full h-full p-4">
      <div className="flex flex-col space-y-4 w-2/3 h-full">
        <div className="flex flex-col space-y-4 w-full h-fit">
          <TextInputLarge 
          placeholder="Title" 
          onChange={(value) => {setData({...data, ...{title: value}})}}
          value={title}/>

          <ContentionSubpointSelector
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
        <div className="w-full h-1/2">
          <EvidenceCard data={data}/>
        </div>
        <div>
          <IndigoButton callback={() => {console.log("save")}} text="Save Card"/>
        </div>
      </div>
    </div>
  )
}