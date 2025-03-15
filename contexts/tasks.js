import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, useContext, useEffect, useState } from "react";
import * as Notification from "expo-notifications";

const TasksContext = createContext();

export default function TaskContextProvider({ children }) {
  const [tasksFromDb, setTasksFromDb] = useLocalStorage("tasks");
  const [tasks, setTasks] = useState([]);

  // fetch tasks
  useEffect(() => {
    // console.log({ tasksFromDb });
    if (tasksFromDb === "") return;
    try {
      setTasks(JSON.parse(tasksFromDb));
    } catch (error) {
      alert("Error fetching tasks");
    }
  }, [tasksFromDb]);

  // useEffect(() => {
  //   console.log(tasks);
  // }, [tasks]);

  //create new task
  const createTask = (name, schedule, time, notificationId) => {
    const newTask = {
      id: Math.random(),
      name,
      schedule,
      time,
      notificationId,
      created_at: new Date(),
    };

    const newTasksList = [...tasks, newTask];
    setTasks(newTasksList);
    try {
      setTasksFromDb(JSON.stringify(newTasksList));
    } catch (error) {
      alert("Error saving task");
    }
    return true;
  };

  // delete task
  const deleteTask = async (task_id) => {
    const task = tasks.find((task) => task.id === task_id);
    if (!task) return console.log("Task not found");
    await Notification.cancelScheduledNotificationAsync(task.notificationId);
    const others = tasks.filter((task) => task.id !== task_id);
    setTasksFromDb(JSON.stringify(others));
    setTasks(others);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export const useTasksContext = () => useContext(TasksContext);
