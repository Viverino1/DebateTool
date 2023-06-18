import { getValue } from "../../../utils/helpers";

export default function TopicSelector(props: {callback: (value: string) => void}){
  const {callback} = props;
  const topics = ["HSR", "GPC", "RTW"];
  return(
    <select
    id="topicSelector"
    className="w-full px-4 py-2 h-12 bg-neutral-800 rounded-xl appearance-none outline-none"
    onChange={() => {
      callback(getValue("topicSelector", ""));
    }}
    >
      {topics.map((topic) => (
        <option value={topic}>{topic}</option>
      ))}
    </select>
  )
}