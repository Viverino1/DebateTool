import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/navigation/Sidebar";
import Home from "./pages/home/Home";

export default function App() {
  return (
    <BrowserRouter>
      <div className="fixed flex w-full h-screen bg-neutral-900">
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}