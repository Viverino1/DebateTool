import { useEffect, useState } from "react";
import { User } from "../../../utils/types";
import { getValue } from "../../../utils/helpers";
import { getUsers } from "../../../utils/firebase/auth";

export default function UserSelector(props: {callback: (value: string) => void, value: string}){
  const {callback, value} = props;

  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([] as User[]);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
      setLoading(false);
    });
  }, []);

  if(loading){
    return(
      <div className="flex items-center w-full h-12 rounded-xl bg-neutral-800 py-2 px-4 appearance-none outline-none animate-pulse">
        Loading Users...
      </div>
    )
  }

  return(
    <select
    value={value}
    id="UserSelector"
    className="w-full h-12 rounded-xl bg-neutral-800 py-2 px-4 appearance-none outline-none"
    onChange={() => {
      callback(getValue("UserSelector", ""));
    }}
    >
      <option value="">Select a User</option>
      {users.map((user) => (
        <option key={user.uid} value={user.uid}>{user.displayName} ({user.email})</option>
      ))}
    </select>
  )
}