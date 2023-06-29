import { Rebuttal } from "../../utils/types";
import CardDetails from "./components/CardDetails";

export default function RebuttalCardExpanded(props: {data: Rebuttal}){
  const {
    title,
    sourceName,
    sourceLink,
    text,
    reasoning,
    rebuttalTo,
  } = props.data;

  return(
    <div className="relative w-full h-full overflow-auto">
      <div className="absolute flex justify-center items-center blur-3xl opacity-20">
        <div className="w-[70vh] h-[70vh] rounded-full bg-amber-500 -translate-x-1/2 -translate-y-1/2"/>
      </div>
      <div className="absolute w-full h-full p-4 text-lg text-neutral-300 overflow-auto">
        <div className="text-amber-500 text-4xl mb-2">{title}</div>

        <div className="text-amber-500 text-2xl">Source</div>
        <div>{sourceName}</div>
        <div className="mb-4"><a className="underline" href={sourceLink} target="_blank">{sourceLink}</a></div>

        <div className="text-amber-500 text-2xl">Rebuttal To</div>
        <div className="mb-4">{rebuttalTo}</div>

        <div className="text-amber-500 text-2xl">Evidence</div>
        <div className="mb-4">{text}</div>

        <div className="text-amber-500 text-2xl">Reasoning</div>
        <div className="mb-4">{reasoning}</div>

        <div className="w-full h-px bg-neutral-400 mb-4"/>

        <CardDetails card={props.data}/>
      </div>
    </div>
  )
}