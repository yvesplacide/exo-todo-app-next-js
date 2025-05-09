"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getTaskById, updateTask } from "@/gateways/todo";
import { Task } from "@/interfaces/todo";

export default function UpdateTask() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const t = getTaskById(id);
    if (t) setTask(t);
  }, [id]);

  const handleUpdate = () => {
    if (!task) return;
    updateTask(task);
    router.push("/task");
  };

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Tâche introuvable</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Modifier la tâche</h1>

        <input
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="w-full border border-gray-300 text-gray-600 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Titre de la tâche"
        />

        <label className="flex items-center gap-2 mb-6 text-gray-700">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => setTask({ ...task, completed: e.target.checked })}
            className="accent-green-600 w-5 h-5"
          />
          Marquer comme complétée
        </label>

        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
