import { Task } from "@/interfaces/Task";
import { useEffect, useState } from "react";
import { AiFillPushpin, AiFillDelete } from "react-icons/ai";
import { BiReset } from "react-icons/bi";

export default function Card({ task, removeTask, updateTask }: {
  task: Task,
  removeTask: (id: string) => void,
  updateTask: (id: string, completePercentage: number, isPinned?: boolean) => void
}) {
  const [color, setColor] = useState("radial-progress text-error");

  /**
   * Set color of radial progress bar based on
   * completePercentage value of task object
   */
  useEffect(() => {
    if (task.completePercentage === 100) {
      setColor("radial-progress text-success");
    }
    else if (task.completePercentage === 75) {
      setColor("radial-progress text-primary");
    } else if (task.completePercentage === 50) {
      setColor("radial-progress text-secondary");
    } else if (task.completePercentage === 25) {
      setColor("radial-progress text-warning");
    }
    else if (task.completePercentage === 0) {
      setColor("radial-progress text-error");
    }
  }, [task.completePercentage]);

  return (
    <div className="card h-56 bg-base-100 shadow-2xl">
      <div className="card-body relative">
        <AiFillPushpin
          color={task.isPinned ? "red" : "#dfd9d7"}
          size={30}
          className="absolute top-3 right-3"
          onClick={() => { updateTask(task.id, -1, !task.isPinned); }}
        />
        <p className="text-4xl text-pink-600 font-bold font-mono absolute -top-2 -left-8 -rotate-45 bg-yellow-100 p-1 rounded-md">{task.createdAt}th</p>
        <p className="card-title">{task.title}</p>
        <p >{task.description}</p>
        <div className="card-actions mt-5 justify-end">
          {
            task.completePercentage > 100 ? (
              <div className="flex gap-2">
                <button onClick={() => removeTask(task.id)} className="btn btn-warning"><AiFillDelete size={24} /></button>
                <button className="btn btn-secondary" onClick={() => {
                  updateTask(task.id, 0);
                }}
                >
                  <BiReset size={24} />
                </button>
              </div>
            ) : (
              <button
                className={color}
                // @ts-ignore
                style={{ "--value": task.completePercentage }}
                onClick={() => {
                  updateTask(task.id, task.completePercentage + 25);
                }}
              >
                <span className="font-bold">{task.completePercentage}%</span>
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}