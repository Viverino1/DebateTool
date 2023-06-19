import { useEffect, useState } from "react";
import { getContentions } from "../../../utils/firebase/firestore/team"
import { Contention } from "../../../utils/types"
import { getValue } from "../../../utils/helpers";

export default function ContentionSubpointSelector(props: {onChange: (contention: number, subpoint: number) => void, value: {contention: number, subpoint: number}}){
  const {onChange, value} = props;
  
  const contentions: Contention[] = getContentions();

  const [cont, setCont] = useState(value.contention);
  const [sub, setSub] = useState(value.subpoint);

  useEffect(() => {
    onChange(cont, sub);
  }, [cont, sub])

  return(
    <div className="flex space-x-4 w-full h-12">
      <select
      onChange={() => {
        const newCont = Number(getValue("contentionSelector", ""));
        if(newCont < 0){setSub(-3)}
        setCont(newCont);
      }}
      id="contentionSelector"
      value={value.contention}
      className="w-1/2 h-full outline-none appearance-none rounded-xl bg-neutral-800 px-4 py-2">
        <option value={-3}>No Contention</option>
        <option value={-2}>Intro</option>
        <option value={-1}>Conclusion</option>
        {contentions.map((contention, index) => (
          <option key={index} value={index}>{contention.text}</option>
        ))}
      </select>

      <select
      onChange={() => {
        setSub(Number(getValue("subpointSelector", "")));
      }}
      id="subpointSelector"
      value={value.subpoint}
      className="w-1/2 h-full outline-none appearance-none rounded-xl bg-neutral-800 px-4 py-2">
        <option value={-3}>No Subpoint</option>
        {cont >= 0? contentions[cont].subpoints.map((subpoint, index) => (
          <option key={index} value={index}>{subpoint}</option>
        )) : null}
      </select>
    </div>
  )
}