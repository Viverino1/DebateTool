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
import { setCards, setSide, setTopic } from "./utils/redux/reducers/app";
import { getCards, getTopics } from "./utils/firebase/firestore/firestore";
import Loading from "./components/Loading";
import { Cards } from "./utils/types";

export default function App() {
  const dispatch = useDispatch();

  const [loading, setLoading1] = useState(true);

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const [isNewUser, setIsNewUser] = useState(false);

  const cards = useAppSelector((state) => state.app.cards);

  async function initialLoad(){
    const topics = await getTopics();

    store.dispatch(setTopic(topics[topics.length - 1]));
    store.dispatch(setSide("AFF"));
    
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

        initialLoad().then(() => {
          setLoading1(false);
        })

      })
    }else{
      setLoading1(false);
    }
  })

  if(loading){return <div className="h-screen bg-neutral-900"><Loading/></div>}

  if(isNewUser){return <CreateAccount/>}

  if(!isLoggedIn){return <Login/>}

  return (
    <BrowserRouter>
      <div className="fixed flex w-full h-screen bg-neutral-900 text-neutral-100 font-quicksand">
        <Sidebar hideAt={[]}/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/cards" element={<CardsPage cards={cards}/>}/>
          <Route path="/cards/*" element={<div className="w-full h-full bg-red-500">Hi</div>}/>
          <Route path="/create">
            <Route index element={<Create/>}/>
            <Route path="evidence" element={<CreateEvidence/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function LoadCards(){
  const user = useAppSelector((state) => state.auth.user);
  const {side, topic} = useAppSelector((state) => state.app);

  useEffect(() => {
    
  })
}