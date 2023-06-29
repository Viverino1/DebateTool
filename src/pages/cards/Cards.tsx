import { useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";
import Loading from "../../components/Loading";
import EvidenceCard from "../../components/cards/EvidenceCard";
import QuoteCard from "../../components/cards/QuoteCard";
import RebuttalCard from "../../components/cards/RebuttalCard";
import { emptyCards, getValue } from "../../utils/helpers";
import { useAppSelector } from "../../utils/redux/hooks";
import { Cards } from "../../utils/types";

export default function (){
  const cards = useAppSelector((state) => state.cards.cards);
  const loading = useAppSelector((state) => state.cards.loading);

  const [searchQuery, setSearchQuery] = useState("");

  const [displayCards, setDisplayCards] = useState(cards);

  useEffect(() => {
    const newCards = JSON.parse(JSON.stringify(emptyCards)) as Cards;
    const query = searchQuery.toLocaleLowerCase();

    cards.evidences.forEach((evidence) => {
      if(
        evidence.title.toLowerCase().includes(query) ||
        evidence.text.toLowerCase().includes(query) ||
        evidence.reasoning.toLowerCase().includes(query) ||
        evidence.sourceName.toLowerCase().includes(query) ||
        evidence.sourceLink.toLowerCase().includes(query)
      ){
        newCards.evidences.push(evidence);
      }
    })

    cards.quotes.forEach((quote) => {
      if(
        quote.title.toLowerCase().includes(query) ||
        quote.quote.toLowerCase().includes(query) ||
        quote.quotee.toLowerCase().includes(query) ||
        quote.reasoning.toLowerCase().includes(query) ||
        quote.sourceName.toLowerCase().includes(query) ||
        quote.sourceLink.toLowerCase().includes(query)
      ){
        newCards.quotes.push(quote);
      }
    })

    cards.rebuttals.forEach((rebuttal) => {
      if(
        rebuttal.title.toLowerCase().includes(query) ||
        rebuttal.text.toLowerCase().includes(query) ||
        rebuttal.rebuttalTo.toLowerCase().includes(query) ||
        rebuttal.reasoning.toLowerCase().includes(query) ||
        rebuttal.sourceName.toLowerCase().includes(query) ||
        rebuttal.sourceLink.toLowerCase().includes(query)
      ){
        newCards.rebuttals.push(rebuttal);
      }
    })

    setDisplayCards(newCards);
    
  }, [cards, searchQuery]);

  const {evidences, quotes, rebuttals} = displayCards;

  if(loading){return <Loading/>}

  return(
    <div className="relative flex flex-col w-full h-full">
      <div className="absolute top-4 z-20 right-4 left-4">
        <div className="text-center w-full h-16 px-4 rounded-xl flex space-x-4 items-center
        backdrop-blur-sm border-2 border-neutral-700 bg-neutral-800/50">
          <Search size={30}/>
          <input type="text" id="search" className="w-full h-full bg-transparent outline-none text-lg" placeholder="Search"
          onChange={() => {
            setSearchQuery(getValue("search", ""));
          }}/>
        </div>
      </div>
      <div className="flex flex-wrap p-2 pt-22 w-full h-full overflow-auto">
        {evidences.map((card) => (
          <div key={card.cardID} className="xl:w-1/3 lg:w-1/2 w-full h-1/2">
            <EvidenceCard data={card}/>
          </div>
        ))}

        {quotes.map((card) => (
          <div key={card.cardID} className="xl:w-1/3 lg:w-1/2 w-full h-1/2">
            <QuoteCard data={card}/>
        </div>
        ))}

        {rebuttals.map((card) => (
          <div key={card.cardID} className="xl:w-1/3 lg:w-1/2 w-full h-1/2">
            <RebuttalCard data={card}/>
        </div>
        ))}
      </div>
    </div>
  )
}