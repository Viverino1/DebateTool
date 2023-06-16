import { ReactElement } from "react";

export default function RedButton(props: {icon?: ReactElement, text: string}){
    const {icon, text} = props;

    return(
        <button className="relative top-0 right-0 left-0 bottom-0 w-full h-full">
            <div className="absolute z-0 top-0 right-0 left-0 bottom-0 bg-red-500 rounded-lg blur-md opacity-50"></div>
            <div className="absolute z-10 top-0 right-0 left-0 bottom-0 flex items-center space-x-2 w-full h-full p-2 bg-red-500 rounded-lg">
                <div className="h-full">{icon}</div>
                <div className="text-red-50 text-md font-semibold"> {text}</div>
            </div>
        </button>
    )
}