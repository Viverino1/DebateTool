import { useEffect, useState } from "react";
import { School } from "../../../utils/types";
import { getSchools } from "../../../utils/firebase/firestore/firestore";
import { getValue } from "../../../utils/helpers";

export default function SchoolSelector(props: {callback: (value: string) => void, value: string}){
  const {callback, value} = props;

  const [loading, setLoading] = useState(true);

  const [schools, setSchools] = useState([] as School[]);

  useEffect(() => {
    getSchools().then((schools) => {
      setSchools(schools);
      setLoading(false);
    });
  }, []);

  if(loading){
    return(
      <div className="flex items-center w-full h-12 rounded-xl bg-neutral-800 py-2 px-4 appearance-none outline-none animate-pulse">
        Loading Schools...
      </div>
    )
  }

  return(
    <select
    value={value}
    id="SchoolSelector"
    className="w-full h-12 rounded-xl bg-neutral-800 py-2 px-4 appearance-none outline-none"
    onChange={() => {
      callback(getValue("SchoolSelector", ""));
    }}
    >
      <option value="">Select a School</option>
      {schools.map((school) => (
        <option key={school.name} value={school.name}>{school.name} - {school.district}</option>
      ))}
    </select>
  )
}