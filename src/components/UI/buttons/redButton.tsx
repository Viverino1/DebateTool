export default function RedButton(props: {callback: () => void, text: string, active?: boolean}){
  const {callback, text} = props;
  const active = typeof props.active == undefined? true : props.active;
  return(
    <button className="w-fit h-fit relative px-4 py-2 rounded-xl bg-red-500 whitespace-nowrap"
    onClick={callback}>
      {text}
      <div className="absolute -z-10 top-0 right-0 left-0 bottom-0 w-full h-full blur-lg opacity-50 bg-red-500"></div>
    </button>
  )
}