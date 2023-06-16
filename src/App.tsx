import Navbar from "./components/Navbar";
import EvidenceCard from "./components/cards/EvidenceCard";

export default function App() {
    const cards = ["id1", "id2", "id3", "id4", "id5", "id6", "id7"];

    return (
        <div className="fixed w-full h-screen bg-neutral-900">
            <div className="absolute flex justify-center items-center -z-50 w-full h-full blur-3xl opacity-20">
                <div className="absolute bg-emerald-700 w-[50vh] h-[50vh] rounded-full -translate-y-1/2 -translate-x-2/3 animate-bg animation-delay-10000"/>
                <div className="absolute bg-emerald-700 w-[50vh] h-[50vh] rounded-full translate-x-full translate-y-1/3 animate-bg animation-delay-20000"/>
                <div className="absolute bottom-0 left-0 bg-emerald-500 w-[50vh] h-[50vh] rounded-full translate-y-1/2 animate-bg animation-delay-30000"/>
                <div className="absolute top-0 right-0 bg-emerald-400 w-[50vh] h-[50vh] rounded-full -translate-y-1/2 translate-x-1/2 animate-bg "/>
            </div>
            <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full">
                <div className="absolute z-10 left-0 top-0 bottom-0">
                    <Navbar/>
                </div>
                <div className="absolute flex flex-wrap z-0 left-20 w-full h-full p-2 overflow-scroll">
                    {cards.map(card => (
                        <div className="w-1/2 h-1/2 p-2">
                            <EvidenceCard ID={card}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}