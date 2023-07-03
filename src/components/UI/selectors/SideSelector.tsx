import { useDispatch } from "react-redux";
import { getValue } from "../../../utils/helpers";
import { useAppSelector } from "../../../utils/redux/hooks";
import { setSide } from "../../../utils/redux/reducers/app";

export default function SideSelector(props: {id?: string}){
  const dispatch = useDispatch();

  const side = useAppSelector((state) => state.app.side);

  return(
    <select
    id={`sideSelector${props.id}`}
    className={"w-full px-2 py-1 h-full bg-inherit border-2  transition-all duration-300 rounded-xl appearance-none outline-none text-center border-neutral-700 bg-neutral-800 hover:border-red-500"}
    value={side}
    onChange={() => {
      dispatch(setSide(getValue(`sideSelector${props.id}`, "")));
    }}
    >
      <option value="AFF">AFF</option>
      <option value="NEG">NEG</option>
    </select>
  )
}