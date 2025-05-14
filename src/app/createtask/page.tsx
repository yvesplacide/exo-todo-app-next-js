"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addTodo } from "@/gateways/todo";
import { ITodo } from "@/interfaces/todo";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleAdd = () => {
    if (!title.trim()) return;
    const newTask: ITodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    addTodo(newTask);
    router.push("/task");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400 px-4">
  <div className="bg-gray-50 p-6 rounded-2xl shadow-xl w-full max-w-md">
    <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">Créer une tâche</h1>

    <input
      type="text"
      className="border p-2 text-gray-800 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Nouvelle tâche"
    />

    <div className="flex justify-end gap-3">
      <button
        onClick={() => router.push("/task")}
        className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
      >
        Annuler
      </button>
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Ajouter
      </button>
    </div>
  </div>
</div>

  );
}
