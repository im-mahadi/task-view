import useTask from "@/hooks/useTask";
import extractText from "@/util/extract-text";
import { useState } from "react";
import Card from "../components/Card";

export default function Home() {
  const [newTask, setNewTask] = useState<string>('');
  const { tasks, addTask, removeTask, updateTask } = useTask();

  const handleEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const [title, description] = extractText(newTask);

      addTask({
        id: title + Math.random().toString(36).slice(2, 9),
        title,
        description,
        createdAt: new Date().toISOString(),
        completePercentage: 0,
        isPinned: false
      });

      setNewTask('');
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
                <Card task={task} removeTask={removeTask} updateTask={updateTask} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
