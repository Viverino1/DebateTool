import { ReactElement } from "react";
import { useNavigate } from "react-router";

export default function Sidebar(){
  return(
    <div className="w-20 hover:w-72 h-full bg-neutral-800 p-4
    transition-all duration-300">
      <SidebarElement icon={<img src="./DebateToolLogo.svg"/>} text="Debate Tool" link="/"/>
    </div>
  )
}

function SidebarElement(props: {icon: ReactElement, text: string, link: string}){
  const {icon, text, link} = props;
  const navigate = useNavigate();

  return(
    <button className="w-full h-16 text-neutral-100 overflow-clip"
    onClick={() => {navigate(link)}}>
      <div className="flex items-center space-x-4 w-72">
        <div className="w-12 h-12">{icon}</div>
        <div className="tex-lg">{text}</div>
      </div>
    </button>
  )
}