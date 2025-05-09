"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteTask, getTaskById } from "@/gateways/todo";
import { useEffect, useState } from "react";
import { Task } from "@/interfaces/todo";

export default function DeleteTask() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const [task, setTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = getTaskById(id);
    if (t) setTask(t);
  }, [id]);

  const handleDelete = () => {
    deleteTask(id);
    router.push("/task");
  };

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Tâche non trouvée</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Supprimer la tâche ?</h1>
        <p className="text-gray-800 text-lg mb-6">{task.title}</p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
        >
          Supprimer
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirmation</h2>
            <p className="mb-6">Es-tu sûr de vouloir supprimer cette tâche ?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
