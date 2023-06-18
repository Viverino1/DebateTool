import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/navigation/Sidebar";
import Cards from "./pages/cards/Cards";
import Create from "./pages/create/Create";
import Landing from "./pages/landing/Landing";
import CreateEvidence from "./pages/create/CreateEvidence";
import { useAppSelector } from "./utils/redux/hooks";
import { auth, getUser, handleAuthClick } from "./utils/firebase/auth";

export default function App() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  auth.onAuthStateChanged((fbu) => {
    if(fbu){
      getUser(fbu.uid).then((user) => {
        if(user.uid){
          
        }
      })
    }
  })

  if(!isLoggedIn){return <button onClick={() => {handleAuthClick}}>Login</button>}

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