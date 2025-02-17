import { Column, Id, Task } from "../type";
import { TrashIcon } from "../icons/TrashIcon";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { PlusIcon } from "../icons/PlusIcon";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
  tasks: Task[];
  index: number;
}

function ColumnContainer(props: Props) {
  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
    index = 0,
  } = props;

  const getColumnHeaderColor = (index: number) => {
    const colors = [
      "#FF6B6B", // Red-ish
      "#4ECDC4", // Teal-ish
      "#FFD93D", // Yellow-ish
      "#95D5B2", // Green-ish
      "#8B5CF6", // Purple-ish
    ];
    return colors[index % colors.length];
  };

  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{
          ...style,
          backgroundColor: getColumnHeaderColor(index),
        }}
        className="bg-columnBackgroundColor w-[350px] h-[500px] rounded-md flex flex-col opacity-40 border-2 border-rose-500"
      >
        <div
          className="text-md h-[60px] cursor-grab rounded-t-xl p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between"
          style={{ backgroundColor: getColumnHeaderColor(index) }}
        >
          <div className="flex gap-2">
            <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
              0
            </div>
            {column.title}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[350px] h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          if (!editMode) setEditMode(true);
        }}
        style={{
          ...style,
          backgroundColor: getColumnHeaderColor(index),
        }}
        className="text-md h-[60px] cursor-grab rounded-t-xl p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            0
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteColumn(column.id);
          }}
          className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2"
        >
          <TrashIcon />
        </button>
      </div>
      {/** Column Task Container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/** Column Footer */}
      <button
        className="flex gap-2 items-center border-columnBackgroundColor bprder-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <PlusIcon />
        Add Task
      </button>
    </div>
  );
}

export default ColumnContainer;
