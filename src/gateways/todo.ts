import { ITodo } from "@/interfaces/todo";

const STORAGE_KEY = "tasks";

export const getStoredTodos = (): ITodo[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveTasks = (tasks: ITodo  []) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const addTodo = (task: ITodo) => {
  const tasks = getStoredTodos();
  tasks.push(task);
  saveTasks(tasks);
};

export const updateTask = (updatedTask: ITodo) => {
  const tasks = getStoredTodos().map(t => t.id === updatedTask.id ? updatedTask : t);
  saveTasks(tasks);
};

export const deleteTask = (id: number) => {
  const tasks = getStoredTodos().filter(t => t.id !== id);
  saveTasks(tasks);
};

export const getTaskById = (id: number): ITodo | undefined => {
  return getStoredTodos().find(t => t.id === id);
};
