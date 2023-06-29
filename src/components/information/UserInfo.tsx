import { useEffect, useState } from "react";
import { getUser } from "../../utils/firebase/auth";
import { User } from "../../utils/types";
import { EnvelopeFill, MegaphoneFill, MortarboardFill } from "react-bootstrap-icons";

export default function UserInfo(props: {uid: string}){
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    getUser(props.uid).then((user) => {
      setUser(user);
      setLoading(false);
    })
  }, []);

  const {
    displayName,
    email,
    speaker,
    school,
    photoURL,
    firstName,
    lastName,
  } = user;

  if(loading){return (
    <div className="w-fit h-fit px-4 py-2 bg-neutral-800 rounded-xl animate-pulse">
      Loading User...
    </div>
  )}

  return(
    <div className="w-fit h-fit flex flex-col space-y-4 rounded-xl overflow-clip bg-neutral-800 p-4">
      <div className="flex space-x-4 items-center-center">
        <img className="h-16 w-16 rounded-full border-2 border-neutral-400" src={photoURL} alt={displayName} />
        <div>
          <div className="text-lg">{displayName}</div>
          <div className="text-md">{firstName} {lastName}</div>
        </div>
      </div>
      <div className="w-full h-px bg-neutral-100"/>
      <div className="flex flex-col space-y-2 text-neutral-400">
        <div className="flex space-x-4 items-center">
          <EnvelopeFill size={25}/>
          <div>{email}</div>
        </div>
        <div className="flex space-x-4 items-center">
          <MegaphoneFill size={25}/>
          <div>Speaker {speaker}</div>
        </div>
        <div className="flex space-x-4 items-center">
          <MortarboardFill size={25}/>
          <div>{school}</div>
        </div>
      </div>
    </div>
  )
}