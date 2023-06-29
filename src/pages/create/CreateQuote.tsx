import { useNavigate } from "react-router-dom";
import VisibilitySelector from "../../components/UI/selectors/VisibilitySelector";
import QuoteCard from "../../components/cards/QuoteCard";
import { Quote } from "../../utils/types";
import { useState } from "react";
import { emptyQuote } from "../../utils/helpers";
import EmeraldButton from "../../components/UI/buttons/emeraldButton";
import store from "../../utils/redux/store";
import { saveQuoteCard } from "../../utils/firebase/firestore/cards/quote";
import TextInputLarge from "../../components/UI/textInput/TextInputLarge";
import ContentionSubpointSelector from "../../components/UI/selectors/ContentionSubpointSelector";
import TextInputMedium from "../../components/UI/textInput/TextInputMedium";
import TextArea from "../../components/UI/textInput/TextArea";

export default function CreateQuote(props: {editCard?: Quote}){
  const {editCard} = props;
  const navigate = useNavigate();

  const [data, setData] = useState(editCard? editCard : emptyQuote);
  const {
    isPublic,
    title,
    quote,
    quotee,
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
          value={{contention: contention, subpoint: subpoint}}
          onChange={(contention, subpoint) => {
            setData({...data, ...{contention: contention, subpoint: subpoint}})
          }}/>
    
          <TextInputMedium
          value={sourceName}
          placeholder="Source Name"
          onChange={(value) => {setData({...data, ...{sourceName: value}})}}/>

          <div className="text-emerald-500">
            <TextInputMedium
            value={sourceLink}
            placeholder="Source Link"
            onChange={(value) => {setData({...data, ...{sourceLink: value}})}}/>
          </div>

          <TextInputMedium
          value={quotee}
          placeholder="Quotee (who said the quote)"
          onChange={(value) => {setData({...data, ...{quotee: value}})}}/>

        </div>

        <div className="flex flex-col space-y-4 w-full h-full">
          <TextArea
          value={quote}
          placeholder="Quote"
          onChange={(value) => {setData({...data, ...{quote: value}})}}/>

          <TextArea
          value={reasoning}
          placeholder="Reasoning"
          onChange={(value) => {setData({...data, ...{reasoning: value}})}}/>
        </div>

      </div>
      <div className="w-1/3 h-full flex flex-col space-y-4 justify-center items-center p-2">
        <div className="w-full h-1/2 -mb-2 -mr-4">
          <QuoteCard data={data}/>
        </div>
        <VisibilitySelector
        callback={(value) => {
          setData({...data, isPublic: value == "public"? true : false});
        }}
        value={isPublic? "public" : "private"}
        />
        <div>
          <EmeraldButton callback={() => {handleCardSave(data).then(() => {navigate("/cards")})}} text="Save Card"/>
        </div>
      </div>
    </div>
  )
}

async function handleCardSave(data: Quote){
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

  await saveQuoteCard(data, topic, side);
  return;
}