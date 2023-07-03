export default function RoundPage(props: {roundID: string}){
  return(
    <div className="w-full h-full p-2 text-neutral-100">
      <div className="relative w-full h-full rounded-xl overflow-clip border-2 border-neutral-700">
        <div className="absolute z-0 top-0 right-0 left-0 bottom-0 bg-neutral-800  opacity-50">
          <div className="w-[30vh] h-[30vh] bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"/>
        </div>

        <div className="absolute z-10 top-0 right-0 left-0 bottom-0 w-full h-full flex flex-col p-4">
          <div className="w-full h-fit text-sm">
            <div className="w-fit h-fit bg-red-500">{}</div>
          </div>

          <div className="w-full h-full">{props.roundID}</div>
        </div>
      </div>
    </div>
  )
}