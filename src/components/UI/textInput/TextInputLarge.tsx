import { getValue } from "../../../utils/helpers";

export default function TextInputLarge(props: {placeholder: string, onChange: (value: string) => void, value: string}){
  const {placeholder, onChange, value} = props;
  return(
    <input 
    id={placeholder}
    value={value}
    onChange={() => {onChange(getValue(placeholder, ""));}}
    type="text" 
    placeholder={placeholder}
    className="w-full h-16 text-xl rounded-xl bg-neutral-800/50 border-2 border-neutral-700 px-4 py-2 outline-none placeholder-neutral-400"/>
  )
}