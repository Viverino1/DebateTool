import { getValue } from "../../../utils/helpers";

export default function VisibilitySelector(props: {callback: (value: string) => void, value: string}){
  const {callback, value} = props;

  const options = ["public", "school", "team", "private"];
  return(
    <select 
    className="w-full h-12 rounded-xl bg-neutral-800 py-2 px-4 appearance-none outline-none" 
    id="visibilitySelector"
    value={value}
    onChange={() => {
      callback(getValue("visibilitySelector", ""));
    }}
    >
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  )
}