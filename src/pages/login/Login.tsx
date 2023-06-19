import { ReactElement } from "react";
import { Google } from "react-bootstrap-icons";
import { handleAuthClick } from "../../utils/firebase/auth";

export default function Login(){
  return(
    <div className="flex w-full h-screen text-neutral-300 font-quicksand">
      <div className="relative flex justify-center items-center w-3/4 h-full bg-neutral-800 p-4 overflow-clip">
        <div className="absolute z-0 w-[50vh] h-[40vh] bg-red-500 rounded-full blur-3xl opacity-20"/>
        <div className="absolute top-0 right-0 -translate-x-1/4 -translate-y-2/4 z-0 w-[50vh] h-[50vh] bg-indigo-500 rounded-full blur-3xl opacity-20"/>
        <div className="absolute z-10 w-full h-full flex flex-col space-y-4 items-center justify-center">
          <div className="text-6xl text-red-500">Welcome to Debate Tool</div>
          <div className="text-2xl">From Vivek Maddineni</div>
          <div className="text-lg w-1/2 text-center">This tool was made to unify your public forum debate experience all under one app. That includes cases, cards, contentions, evidence, rebuttals, quotes, rounds, and much more.</div>
        </div>
      </div>
      <div className="flex flex-col text-center space-y-4 justify-center items-center w-1/4 h-full p-4 bg-neutral-900">
        <div className="text-center">
          <div className="text-2xl">Login to your account</div>
          <div className="text-lg text-neutral-300">New here? Click below to sign up.</div>
        </div>
        <div className="w-full">
          <Provider icon={<Google size={30}/>} name="Google" onClick={handleAuthClick}/>
        </div>
      </div>
    </div>
  )
}

function Provider(props: {icon: ReactElement, name: string, onClick: () => void}){
  const {icon, name, onClick} = props;
  return(
    <button
    className="flex items-center  w-full h-20 bg-neutral-800 rounded-xl"
    onClick={onClick}>
      <div className="w-20 h-20 rounded-l-xl bg-red-500 flex justify-center items-center">{icon}</div>
      <div className="text-lg w-full h-full flex items-center justify-center">Login with {name}</div>
    </button>
  )
}