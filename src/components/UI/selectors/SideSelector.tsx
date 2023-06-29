import { useDispatch } from "react-redux";
import { getValue } from "../../../utils/helpers";
import { useAppSelector } from "../../../utils/redux/hooks";
import { setSide } from "../../../utils/redux/reducers/app";

export default function SideSelector(){
  const dispatch = useDispatch();

  const side = useAppSelector((state) => state.app.side);

  return(
    <select
    id="sideSelector"
    className="w-full px-2 py-1 h-full bg-inherit border-2 border-transparent transition-all duration-300
     rounded-xl appearance-none outline-none text-center group-hover:hover:border-red-500 group-hover:border-neutral-500/50"
    value={side}
    onChange={() => {
      dispatch(setSide(getValue("sideSelector", "")));
    }}
    >
      <option value="AFF">AFF</option>
      <option value="NEG">NEG</option>
    </select>
  )
}