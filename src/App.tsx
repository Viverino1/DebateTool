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

export default function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const [newUser, setNewUser] = useState(false);

  auth.onAuthStateChanged((fbu) => {
    if(fbu){
      getUser(fbu.uid).then((user) => {
        setLoading(false);
        if(user.uid){
          dispatch(setUser(user));
        }else{
          setNewUser(true);
        }
      })
    }else{
      setLoading(false);
    }
  })

  if(loading){return <div>Loading</div>}

  if(newUser){return <CreateAccount/>}

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