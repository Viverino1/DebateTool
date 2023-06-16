import { ReactElement } from "react";
export default function Navbar(){
    return(
        <div className="group flex flex-col space-y-4 w-20 hover:w-72 h-screen p-4 bg-neutral-800 overflow-clip
        transition-all duration-300">
            <NavbarElement icon={<img src="./DebateToolLogo.svg"/>} text="Debate Tool" to="/"/>
        </div>
    )
}

function NavbarElement(props: {icon: ReactElement, text: string, to: string}){
    const {icon, text, to} = props;
    return(
        <div className="relative top-0 right-0 left-0 bottom-0 w-full h-12">
            <div className="absolute z-0 top-0 right-0 left-0 bottom-0 w-full h-full rounded-lg bg-emerald-500 blur-md opacity-50"/>
            <div className="absolute z-10 top-0 right-0 left-0 bottom-0 w-full h-full p-2 rounded-lg bg-emerald-500 overflow-clip">
                <div className="flex items-center space-x-2 w-72 h-full">
                    <div className="w-8 h-8">{icon}</div>
                    <div className="text-lg">{text}</div>
                </div>
            </div>
        </div>
    )
}