import { ReactElement } from "react";
import { CollectionFill, FileEarmarkPlusFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

export default function Sidebar(props: {hideAt: string[]}){
  const location = useLocation().pathname;
  const {hideAt} = props;

  var show = true;

  hideAt.forEach(path => {
    if(location.includes(path)){
      show = false;
    }
  });

  if(!show){return;}

  return(
    <div className="group w-25 hover:w-72 h-full flex flex-col space-y-4 bg-neutral-800 p-4
    transition-all duration-300">
      <SidebarElement icon={<img className="w-12 h-12" src="/DebateToolLogo.svg"/>} text="Debate Tool" link="/"/>
      <SidebarElement icon={<CollectionFill size={30}/>} text="View Cards" link="/cards"/>
      <SidebarElement icon={<FileEarmarkPlusFill size={30}/>} text="Create Card" link="/create"/>
    </div>
  )
}

function SidebarElement(props: {icon: ReactElement, text: string, link: string}){
  const location = useLocation();
  const {icon, text, link} = props;
  const navigate = useNavigate();

  function isSelected(){
    const {pathname} = location;
    if(pathname.includes(link)){
      if(pathname != "/" && link == "/"){return false}
      return true;
    }
    return false;
  }

  return(
    <div className="relative w-full h-17">
      <div className={`absolute w-full z-0 h-full blur-lg opacity-50 ${isSelected()? "bg-red-500" : "bg-transparent"}
      transition-all duration-300`}/>

      <button className={`relative z-10 w-full h-full text-neutral-100 overflow-clip rounded-xl ${isSelected()? "bg-red-500" : "bg-transparent"}
      border-2 border-transparent hover:border-red-500 transition-all duration-300`}
      onClick={() => {navigate(link)}}>
        <div className="flex items-center space-x-2 w-72">
          <div className="w-16 h-16 flex justify-center items-center">{icon}</div>
          <div className="text-lg opacity-0 group-hover:opacity-100 transition-all duration-300">{text}</div>
        </div>
      </button>
    </div>
  )
}