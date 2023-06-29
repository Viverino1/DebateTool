import { ArrowsAngleExpand, StarFill } from "react-bootstrap-icons";
import { contsub, contsubTooltip } from "../../utils/helpers";
import { Quote } from "../../utils/types";
import Tooltip from "../UI/tooltip";
import { useNavigate } from "react-router-dom";

export default function QuoteCard(props: {data: Quote}){

  const navigate = useNavigate();

  const {
    cardID,
    contention,
    subpoint,
    isPublic,
    sourceLink,
    sourceName,
    title,
    quote,
    quotee,

  } = props.data;

  const contentionSubpoint = contsub(contention, subpoint);

  return(
    <div className="w-full h-full p-2">
      <div className="relative w-full h-full rounded-xl overflow-clip border-2 border-neutral-700">
        <div className="absolute z-0 top-0 right-0 left-0 bottom-0 bg-neutral-800 blur-3xl opacity-50">
          <div className="w-1/2 h-1/2 bg-emerald-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="absolute z-10 top-0 right-0 left-0 bottom-0 w-full h-full flex flex-col space-y-2 p-4">
          <div className="h-fit">
            <div className="flex space-x-4 items-center justify-between h-8 over">
              <div className="flex space-x-4 text-sm w-full">
                <div className="w-fit h-fit bg-emerald-500 rounded-full px-2 py-1">Quote</div>
                <div className="relative group flex justify-center">
                  <div className="w-fit h-fit bg-neutral-500 rounded-full px-2 py-1">{isPublic? "public" : "private"}</div>
                  <Tooltip text="Anyone can view this card."/>
                </div>
                <div className={`${contentionSubpoint == "NAN"? "hidden" : "flex"} relative group justify-center`}>
                  <div className="w-fit h-fit bg-neutral-500 rounded-full px-2 py-1 whitespace-nowrap">{contentionSubpoint}</div>
                  <Tooltip text={contsubTooltip(contention, subpoint)}/>
                </div>
              </div>

              <div className="w-22 flex space-x-4">
                <button className="border-2 p-2 rounded-full">
                  <StarFill size={15}/>
                </button>
                <button className="border-2 p-2 rounded-full"
                onClick={() => {navigate(`/cards/${cardID}`)}}>
                  <ArrowsAngleExpand size={15}/>
                </button>
              </div>

            </div>
            <div className="h-fit text-xl mt-2">{title}</div>
            <a href={sourceLink} target="_blank" className="text-emerald-500 underline">{sourceName}</a>
          </div>
          <div className="h-full overflow-auto text-neutral-300 text-2xl text-center">"{quote}" - {quotee}</div>
        </div>
      </div>
    </div>
  )
}