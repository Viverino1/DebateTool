import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/navigation/Sidebar";
import CardsPage from "./pages/cards/Cards";
import Create from "./pages/create/Create";
import Landing from "./pages/landing/Landing";
import CreateEvidence from "./pages/create/CreateEvidence";
import { useAppSelector } from "./utils/redux/hooks";
import { auth, getUser } from "./utils/firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "./utils/redux/reducers/auth";
import { useState, useEffect } from "react";
import Login from "./pages/login/Login";
import CreateAccount from "./pages/login/CreateAccount";
import store from "./utils/redux/store";
import { setSide, setTopic, setTopics } from "./utils/redux/reducers/app";
import { getCards, getTopics } from "./utils/firebase/firestore/firestore";
import Loading from "./components/Loading";
import { setCards, setCardsLoading } from "./utils/redux/reducers/cards";
import EvidenceCardExpanded from "./pages/cards/EvidenceCardExpanded";
import CreateQuote from "./pages/create/CreateQuote";
import QuoteCardExpanded from "./pages/cards/QuoteCardExpanded";
import CreateRebuttal from "./pages/create/CreateRebuttal";
import RebuttalCardExpanded from "./pages/cards/RebuttalCardExpanded";
import Settings from "./pages/settings/Settings";
import { getTeam } from "./utils/firebase/firestore/team";
import { setTeam } from "./utils/redux/reducers/team";
import TeamInvite from "./pages/teamInvite/TeamInvite";
import Rounds from "./pages/rounds/Rounds";

export default function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const [isNewUser, setIsNewUser] = useState(false);

  const cards = useAppSelector((state) => state.cards.cards);

  async function initialLoad(teamID: string){
    const topics = await getTopics();

    const t = topics[topics.length - 1];

    const team = await getTeam(teamID, t, "AFF");

    store.dispatch(setTopics(topics));
    store.dispatch(setTopic(t));
    store.dispatch(setSide("AFF"));
    store.dispatch(setTeam(team));

    return;
  }


  auth.onAuthStateChanged((fbu) => {
    if(fbu){
      getUser(fbu.uid).then((user) => {
        if(user.uid){
          dispatch(setUser(user));
        }else{
          setIsNewUser(true);
        }

        if(loading){
          initialLoad(user.teamID).then(() => {
            setLoading(false);
          })
        }
      })
    }else{
      setLoading(false);
    }
  });

  if(loading){return <div className="h-screen bg-neutral-900"><Loading/></div>}

  if(isNewUser){return <CreateAccount/>}

  if(!isLoggedIn){return <Login/>}

  return (
    <BrowserRouter>
      <LoadData/>
      <div className="fixed flex w-full h-screen bg-neutral-900 text-neutral-100 font-quicksand">
        <Sidebar hideAt={[]}/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/rounds" element={<Rounds/>}/>
          <Route path="/invite/*" element={<TeamInvite/>}/>
          <Route path="/cards">
            <Route index element={<CardsPage/>}/>
            {cards.evidences.map((evidence) => (
              <Route key={evidence.cardID} path={evidence.cardID} element={<EvidenceCardExpanded data={evidence}/>}/>
            ))}
            {cards.quotes.map((quote) => (
              <Route key={quote.cardID} path={quote.cardID} element={<QuoteCardExpanded data={quote}/>}/>
            ))}
            {cards.rebuttals.map((rebuttal) => (
              <Route key={rebuttal.cardID} path={rebuttal.cardID} element={<RebuttalCardExpanded data={rebuttal}/>}/>
            ))}
            <Route path="edit">
              {cards.evidences.map((evidence) => (
                <Route key={evidence.cardID} path={evidence.cardID} element={<CreateEvidence editCard={evidence}/>}/>
              ))}
              {cards.quotes.map((quote) => (
                <Route key={quote.cardID} path={quote.cardID} element={<CreateQuote editCard={quote}/>}/>
              ))}
              {cards.rebuttals.map((rebuttal) => (
                <Route key={rebuttal.cardID} path={rebuttal.cardID} element={<CreateRebuttal editCard={rebuttal}/>}/>
              ))}
            </Route>
          </Route>
          <Route path="/create">
            <Route index element={<Create/>}/>
            <Route path="evidence" element={<CreateEvidence/>}/>
            <Route path="quote" element={<CreateQuote/>}/>
            <Route path="rebuttal" element={<CreateRebuttal/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function LoadData(){
  const dispatch = useDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const {side, topic} = useAppSelector((state) => state.app);

  useEffect(() => {
    dispatch(setCardsLoading(true))
    getCards(topic, side, user).then((cards) => {
      dispatch(setCards(cards));
      dispatch(setCardsLoading(false));
    })

    getTeam(user.teamID, topic, side).then((team) => {
      dispatch(setTeam(team));
    })
  }, [side, topic])

  return null;
}