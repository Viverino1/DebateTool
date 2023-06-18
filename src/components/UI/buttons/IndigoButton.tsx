export default function IndigoButton(props: {callback: () => void, text: string, }){
  const {callback, text} = props;
  return(
    <button className="w-fit h-fit relative px-4 py-2 bg-indigo-500 rounded-xl"
    onClick={callback}>
      {text}
      <div className="absolute -z-10 top-0 right-0 left-0 bottom-0 w-full h-full blur-lg opacity-50 bg-indigo-500"></div>
    </button>
  )
}