"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getTaskById, updateTask } from "@/gateways/todo";
import { ITodo } from "@/interfaces/todo";


export default function UpdateTask() {
  const searchParams = useSearchParams();
  const id : number = Number(searchParams.get("id"));
  const router = useRouter();
  const [task, setTask] = useState<ITodo | null>(null);

  useEffect(() => {
    const t = getTaskById(id);
    if (t) setTask(t);
  }, [id]);

  const handleUpdate = () => {
    if (!task) return;
    if (!task.title.trim()) return;
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
    <div className="min-h-screen flex items-center justify-center bg-gray-400 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Modifier la tâche</h1>

        <input
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="w-full border border-gray-300 text-gray-600 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Titre de la tâche"
        />

        <label className="block mb-6 text-gray-700">
  Statut :
  <select
    value={task.completed ? "completed" : "in-progress"}
    onChange={(e) =>
      setTask({ ...task, completed: e.target.value === "completed" })
    }
    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="in-progress">En cours</option>
    <option value="completed">Terminée</option>
  </select>
</label>

       <div className="flex justify-end gap-3 mt-6">
  <button
    onClick={() => router.push("/task")}
    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition cursor-pointer"
  >
    Annuler
  </button>
  <button
    onClick={handleUpdate}
    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
  >
    Enregistrer
  </button>
</div>

      </div>
    </div>
  );
}
