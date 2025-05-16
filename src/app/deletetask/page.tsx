"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTaskById, deleteTask } from "@/gateways/todo";
import { ITodo } from "@/interfaces/todo";

export default function DeleteTask() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = Number(searchParams.get("id"));
  const [task, setTask] = useState<ITodo | null>(null);

  useEffect(() => {
    const t = getTaskById(id);
    if (t) setTask(t);
    else router.push("/task"); // Si tâche introuvable, rediriger
  }, [id, router]);

  const handleDelete = () => {
    if (!task) return;
    deleteTask(task.id);
    router.push("/task");
  };

  const handleCancel = () => {
    router.push("/task");
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-gray/20 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Supprimer la tâche</h2>
        <p className="text-gray-700 mb-2">Voulez-vous vraiment supprimer cette tâche ?</p>
        <p className="font-medium text-red-600 mb-6">{task.title}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition cursor-pointer"
          >
            Annuler
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
