import { useDispatch } from "react-redux";
import { getValue } from "../../../utils/helpers";
import { useAppSelector } from "../../../utils/redux/hooks";
import { setTopic } from "../../../utils/redux/reducers/app";

export default function TopicSelector(){
  const dispatch = useDispatch();

  const topics = useAppSelector((state) => (state.app.topics));
  const topic = useAppSelector((state) => state.app.topic);

  return(
    <select
    id="topicSelector"
    className="w-full px-2 py-1 h-full bg-inherit border-2 border-transparent transition-all duration-300
     rounded-xl appearance-none outline-none text-center group-hover:hover:border-red-500 group-hover:border-neutral-500/50"
    value={topic}
    onChange={() => {
      dispatch(setTopic(getValue("topicSelector", "")));
    }}
    >
      {topics.map((t) => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  )
}