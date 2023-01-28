import postTask from "@/server/post-task";
import extractText from "@/util/extract-text";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Task } from "../interfaces/Task";

export default function Home() {
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/tasks`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      const data = await res.json()
      setTasks(data);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  //@ts-ignore
  const handleEnterPress = async (e) => {
    const [title, description] = extractText(newTask);

    if (e.key === "Enter") {
      try {
        const res = await postTask(title, description);
        setTasks([...tasks, res]);
        setNewTask('');
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-11/12 md:w-9/12 lg:w-4/6 xl:w-5/12 2xl:w-5/12 mx-auto pt-16 flex flex-col justify-center">
        <input
          type="text"
          value={newTask}
          placeholder="Enter Task Here"
          className="input w-full"
          onChange={(e) => setNewTask(e.currentTarget.value)}
          onKeyDown={(e) => handleEnterPress(e)}
        />
        <div className="mt-16 w-full flex flex-wrap items-center justify-center gap-5">
          {
            tasks.map((task) => (
              <div key={task.id}>
                <Card task={task} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
