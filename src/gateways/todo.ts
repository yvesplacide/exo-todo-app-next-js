import { Task } from "@/interfaces/todo";

const STORAGE_KEY = "tasks";

export const getTasks = (): Task[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const addTask = (task: Task) => {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
};

export const updateTask = (updatedTask: Task) => {
  const tasks = getTasks().map(t => t.id === updatedTask.id ? updatedTask : t);
  saveTasks(tasks);
};

export const deleteTask = (id: number) => {
  const tasks = getTasks().filter(t => t.id !== id);
  saveTasks(tasks);
};

export const getTaskById = (id: number): Task | undefined => {
  return getTasks().find(t => t.id === id);
};
