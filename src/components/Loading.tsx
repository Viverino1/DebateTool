export default function Loading(){
  return(
    <div className="flex flex-col space-y-4 justify-center items-center text-2xl bg-neutral-900 text-neutral-100 w-full h-fullw-full h-full animate-pulse">
      <div className="text-6xl">Debate Tool</div>
      <img src="./DebateToolLogo.svg" alt="DebateToolLogo" className="w-[30vh] h-[30vh] rounded-full border-8 border-neutral-100"/>
      <div>Loading...</div>
    </div>
  )
}