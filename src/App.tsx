import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="fixed w-full h-screen bg-neutral-900">
        <div className="absolute flex justify-center items-center -z-50 w-full h-full blur-3xl opacity-20">
          <div className="absolute bg-emerald-700 w-[50vh] h-[50vh] rounded-full -translate-y-1/2 -translate-x-2/3 animate-bg"/>
          <div className="absolute bg-emerald-700 w-[50vh] h-[50vh] rounded-full translate-x-full translate-y-1/3 animate-bg"/>
          <div className="absolute bottom-0 left-0 bg-emerald-500 w-[50vh] h-[50vh] rounded-full translate-y-1/2 animate-bg"/>
          <div className="absolute top-0 right-0 bg-emerald-400 w-[50vh] h-[50vh] -translate-y-1/2 translate-x-1/2 animate-bg"/>
        </div>
        <div>
          <Navbar/>
        </div>
    </div>
  )
}