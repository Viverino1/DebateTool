export default function Tooltip(props: {text: string}){
  const {text} = props;
  return(
    <span className="
    absolute top-11 w-fit px-2 py-1 rounded-md whitespace-nowrap bg-neutral-500 pointer-events-none 
    group-hover:opacity-100 opacity-0 flex justify-center
    transition-all duration-300">
      <div className="absolute -z-10 bg-neutral-500 rotate-45 -translate-y-3 w-4 h-4"/>
      <div>{text}</div>
    </span>
  )
}