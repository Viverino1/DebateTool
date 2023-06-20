import { useState } from "react";

export default function VisibilitySelector(props: {callback: (value: string) => void, value: string}){
  const {callback, value} = props;

  const [visibility, setVisibility] = useState(value);

  return(
    <div className="flex space-x-4 h-fit w-fit">
      <button
      className={`w-fit h-fit rounded-xl px-4 py-2 transition-all duration-300 border-2 hover:border-red-500 ${visibility == "public"? "bg-red-500 border-red-500" : "bg-neutral-800 border-neutral-800"}`}
      onClick={() => {
        setVisibility("public");
        callback("public");
      }}
      >public</button>

      <button
      className={`w-fit h-fit rounded-xl px-4 py-2 transition-all duration-300 border-2 hover:border-red-500 ${visibility == "private"? "bg-red-500 border-red-500" : "bg-neutral-800 border-neutral-800"}`}
      onClick={() => {
        setVisibility("private");
        callback("private");
      }}
      >private</button>
    </div>
  )
}