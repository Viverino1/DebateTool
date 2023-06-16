export default function EvidenceCard(props: {ID: string}){
    const {ID} = props;

    return(
        <div className="w-full h-full">
            <div className="w-full h-full p-2 rounded-lg bg-neutral-800 text-neutral-50 backdrop-blur-sm opacity-50">{ID}</div>
        </div>
    )
}