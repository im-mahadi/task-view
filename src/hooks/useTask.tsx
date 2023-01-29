import { Task } from "@/interfaces/Task";
import { useEffect, useState, useRef } from "react";

export default function useTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  /**
   * Fetch tasks from localStorage when component
   * is mounted for the first time
   */
  useEffect(() => {
    if (window.localStorage.getItem("tasks")) {
      setTasks(JSON.parse(window.localStorage.getItem("tasks") as string));
    }
    setIsDataFetched(true);
  }, [])

  /**
   * Save tasks to localStorage when tasks array is updated
   * and isDataFetched is true (to prevent saving empty array on first render)
   */
  useEffect(() => {
    if (isDataFetched) {
      window.localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [isDataFetched, tasks])

  /**
   * Add task to tasks array
   * @param task Task to add to tasks array
   */
  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  }

  /**
   * Remove task from tasks array by ID
   * @param id Task ID
   */
  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  /**
   * Update task with new values (completePercentage and isPinned)
   * @param id Task ID
   * @param completePercentage 0 - 100 (25% increments) or -1 to ignore
   * @param isPinned true or false or undefined to ignore
   */
  const updateTask = (id: string, completePercentage: number, isPinned?: boolean) => {
    const updatedTask = tasks.find((task) => task.id === id);
    if (updatedTask) {
      if (completePercentage != -1) {
        updatedTask.completePercentage = completePercentage;
      }
      updatedTask.isPinned = isPinned;
      setTasks([...tasks]);
    }
  }

  return { tasks, addTask, removeTask, updateTask };
}