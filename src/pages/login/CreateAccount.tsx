import { useState } from "react";
import { auth, createUser } from "../../utils/firebase/auth";
import TextInputMedium from "../../components/UI/textInput/TextInputMedium";
import { User } from "../../utils/types";
import SchoolSelector from "../../components/UI/selectors/SchoolSelector";
import SpeakerSelector from "../../components/UI/selectors/SpeakerSelector";
import RedButton from "../../components/UI/buttons/redButton";

export default function CreateAccount(){

  const fbu = auth.currentUser;

  const [user, setUser] = useState({
    uid: fbu?.uid,
    teamID: "",
    email: fbu?.email,
    photoURL: fbu?.photoURL,
    displayName: fbu?.displayName,
    firstName: "",
    lastName: "",
    school: "",
    speaker: 1,
  } as User)

  const {
    photoURL,
    displayName,
    firstName,
    lastName,
    school,
    speaker,
  } = user;

  return(
    <div className="fixed flex justify-center items-center w-full h-full bg-neutral-900 text-neutral-100 font-quicksand">
      <div className="flex flex-col space-y-4 items-center w-1/2 text-center">
        <img src={photoURL} alt="User Photo" className="w-48 h-48 rounded-full"/>
        <div className="text-5xl">Create Your Debate Tool Account</div>

        <div className="flex w-full space-x-4">
          <TextInputMedium
          placeholder="First Name"
          onChange={(value) => {setUser({...user, ...{firstName: value}})}}
          value={firstName}
          />

          <TextInputMedium
          placeholder="Last Name"
          onChange={(value) => {setUser({...user, ...{lastName: value}})}}
          value={lastName}
          />
        </div>

        <TextInputMedium
        placeholder="Display Name"
        onChange={(value) => {setUser({...user, ...{displayName: value}})}}
        value={displayName}
        />

        <SchoolSelector
        value={school}
        callback={(value) => {setUser({...user, ...{school: value}})}}
        />

        <SpeakerSelector
        value={speaker}
        callback={(value) => {setUser({...user, ...{speaker: value}})}}
        />

        <div className="w-full h-px bg-red-500 rounded-full"/>

        <RedButton
        callback={() => {
          if(firstName && lastName && school && displayName){
            createUser(user).then(() => {
              location.reload();
            })
          }else{
            console.log("fill all fields");
          }
        }}
        text="Create Account"
        />
      </div>

    </div>
  )
}