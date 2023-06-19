import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/navigation/Sidebar";
import Cards from "./pages/cards/Cards";
import Create from "./pages/create/Create";
import Landing from "./pages/landing/Landing";
import CreateEvidence from "./pages/create/CreateEvidence";
import { useAppSelector } from "./utils/redux/hooks";
import { auth, getUser } from "./utils/firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "./utils/redux/reducers/auth";
import { useState } from "react";
import Login from "./pages/login/Login";
import CreateAccount from "./pages/login/CreateAccount";
import store from "./utils/redux/store";
import { setSide, setTopic } from "./utils/redux/reducers/app";
import { getTopics } from "./utils/firebase/firestore/firestore";

export default function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const [isNewUser, setIsNewUser] = useState(false);

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
          setLoading(false);
        })

      })
    }else{
      setLoading(false);
    }
  })

  if(loading){return <div>Loading</div>}

  if(isNewUser){return <CreateAccount/>}

  if(!isLoggedIn){return <Login/>}

  return (
    <BrowserRouter>
      <div className="fixed flex w-full h-screen bg-neutral-900 text-neutral-100 font-quicksand">
        <Sidebar hideAt={[]}/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/cards" element={<Cards/>}/>
          <Route path="/create">
            <Route index element={<Create/>}/>
            <Route path="evidence" element={<CreateEvidence/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}