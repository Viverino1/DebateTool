export default function TextInputMedium(props: {placeholder: string, onChange: (value: string) => void, value: string}){
  const {placeholder, onChange, value} = props;
  return(
    <input 
    value={value}
    onChange={(e) => {onChange(e.target.value);}}
    type="text" 
    placeholder={placeholder}
    className="text-md w-full h-12 rounded-xl bg-neutral-800/50 border-2 border-neutral-700 px-4 py-2 outline-none placeholder-neutral-400"/>
  )
}