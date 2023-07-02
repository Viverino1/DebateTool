import { getValue } from "../../../utils/helpers";

export default function TextArea(props: {placeholder: string, onChange: (value: string) => void, value: string}){
  const {placeholder, onChange, value} = props;
  return(
    <textarea 
    id={placeholder}
    value={value}
    onChange={() => {onChange(getValue(placeholder, ""));}} 
    placeholder={placeholder}
    className="text-md w-full h-full resize-none rounded-xl bg-neutral-800/50 border-2 border-neutral-700 p-4 outline-none placeholder-neutral-400"/>
  )
}