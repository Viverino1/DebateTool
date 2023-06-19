import { useState } from "react";

export default function SpeakerSelector(props: {value: number, callback: (value: number) => void}){
  const {value, callback} = props;
  const [speaker, setSpeaker] = useState(value);

  return(
    <div className="flex space-x-4 h-fit w-fit">
      <button
      className={`w-fit h-fit rounded-xl px-4 py-2 transition-all duration-300 border-2 hover:border-red-500 ${speaker == 1? "bg-red-500 border-red-500" : "bg-neutral-800 border-neutral-800"}`}
      onClick={() => {
        setSpeaker(1);
        callback(1);
      }}
      >Speaker 1</button>

      <button
      className={`w-fit h-fit rounded-xl px-4 py-2 transition-all duration-300 border-2 hover:border-red-500 ${speaker == 2? "bg-red-500 border-red-500" : "bg-neutral-800 border-neutral-800"}`}
      onClick={() => {
        setSpeaker(2);
        callback(2);
      }}
      >Speaker 2</button>
    </div>
  )
}