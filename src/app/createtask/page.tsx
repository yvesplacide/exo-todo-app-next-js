"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addTask } from "@/gateways/todo";
import { Task } from "@/interfaces/todo";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleAdd = () => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    addTask(newTask);
    router.push("/task");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="bg-gray-50 p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">Créer une tâche</h1>
        <div className="flex gap-2">
          <input
            type="text"
            className="border p-2 text-gray-800 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nouvelle tâche"
          />
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
