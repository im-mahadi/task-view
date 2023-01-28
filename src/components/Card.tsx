import { Task } from "@/interfaces/Task";
import { useEffect, useState } from "react";
import { AiFillPushpin, AiFillDelete } from "react-icons/ai";
import { BiReset } from "react-icons/bi";

export default function Card({ task }: { task: Task }) {
  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState("radial-progress text-error");
  const [isPinned, setPinned] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      setColor("radial-progress text-success");
    }
    else if (progress === 75) {
      setColor("radial-progress text-primary");
    } else if (progress === 50) {
      setColor("radial-progress text-secondary");
    } else if (progress === 25) {
      setColor("radial-progress text-warning");
    }
    else if (progress === 0) {
      setColor("radial-progress text-error");
    }
  }, [progress]);

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body relative">
        {
          isPinned ? <AiFillPushpin color="purple" size={20} className="absolute top-3 right-3" /> : null
        }

        <h2 className="card-title">{task.title}</h2>
        <p>{task.description}</p>
        <div className="card-actions mt-5 justify-end">
          {
            progress >= 125 ? (
              <div className="flex gap-2">
                <button className="btn btn-warning"><AiFillDelete size={24} /></button>
                <button className="btn btn-secondary" onClick={() => setProgress(0)}><BiReset size={24} /></button>
              </div>
            ) : (
              <button
                className={color}
                // @ts-ignore
                style={{ "--value": progress }}
                onClick={() => setProgress(progress + 25)}
              >
                {progress}%
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}