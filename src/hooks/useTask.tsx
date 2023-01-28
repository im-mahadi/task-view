import { Task } from "@/interfaces/Task";
import { useEffect, useState } from "react";

export default function useTask() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (window.localStorage.getItem("tasks")) {
      setTasks(JSON.parse(window.localStorage.getItem("tasks") as string));
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const updateTask = (id: string, task: Task) => {
    setTasks(tasks.map((task) => task.id === id ? task : task));
  }

  return { tasks, addTask, removeTask, updateTask };
}