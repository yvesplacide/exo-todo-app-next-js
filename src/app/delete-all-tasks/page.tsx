"use client";
import { useEffect, useState } from "react";
import { saveTasks } from "@/gateways/todo";
import { useRouter } from "next/navigation";

export default function DeleteAllTaskPage() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleDeleteAll = () => {
    localStorage.removeItem("todos");
    saveTasks([]);
    setShowModal(false);
    router.push("/task"); // Rediriger après suppression (ou vers "/")
  };

  const handleCancel = () => {
    router.push("/task");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Confirmer la suppression</h2>
            <p className="mb-6 text-gray-600">Voulez-vous vraiment supprimer toutes les tâches ?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteAll}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
              >
                Oui, supprimer
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
