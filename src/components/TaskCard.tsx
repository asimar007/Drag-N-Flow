import { TrashIcon } from "../icons/TrashIcon";
import { Task } from "../type";

interface Props {
  task: Task;
}
// TimeStamp: 0:47:20
const TaskCard = ({ task }: Props) => {
  return (
    <div className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative">
      <div className="flex-grow">{task.content}</div>
      <button className="stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2">
        <TrashIcon />
      </button>
    </div>
  );
};

export default TaskCard;
