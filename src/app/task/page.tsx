"use client";
import { useEffect, useState } from "react";
import { Task } from "@/interfaces/todo";
import { getTasks, deleteTask, updateTask } from "@/gateways/todo";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const router = useRouter();

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const confirmDelete = (id: string) => {
    deleteTask(id);
    setTasks(getTasks());
    setTaskToDelete(null);
  };

  const toggleComplete = (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed };
    updateTask(updatedTask);
    setTasks(getTasks());
  };

  return (
    <div className="min-h-screen bg-gray-400 px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-xl bg-gray-200 rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Liste des tâches</h1>
          <Link
            href="/createtask"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Ajouter
          </Link>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">Aucune tâche pour le moment.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                    className="accent-blue-600 w-5 h-5"
                  />
                  <p
                    className={`font-medium ${
                      task.completed ? "line-through text-gray-400" : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/updatetask?id=${task.id}`)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => setTaskToDelete(task)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal de suppression */}
      {taskToDelete && (
        <div className="fixed inset-0 bg-red-500 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirmation</h2>
            <p className="mb-6 text-gray-700">Voulez vous supprimer la tâche suivante ?</p>
            <p className="mb-6 font-medium text-red-600">{taskToDelete.title}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setTaskToDelete(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={() => confirmDelete(taskToDelete.id)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
