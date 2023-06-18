import { getValue } from "../../../utils/helpers";

export default function TextInputMedium(props: {placeholder: string, onChange: (value: string) => void, value: string}){
  const {placeholder, onChange, value} = props;
  return(
    <input 
    id={placeholder}
    value={value}
    onChange={() => {onChange(getValue(placeholder, ""));}}
    type="text" 
    placeholder={placeholder}
    className="text-md w-full h-12 rounded-xl bg-neutral-800 px-4 py-2 outline-none placeholder-neutral-400"/>
  )
}