"use client";
import { useEffect, useState } from "react";
import { ITodo } from "@/interfaces/todo";
import { updateTask, getStoredTodos } from "@/gateways/todo";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function TaskPage() {
  const [tasks, setTasks] = useState<ITodo[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");
  const [lastAddedId, setLastAddedId] = useState<string | number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const newTasks = getStoredTodos();
    const previousIds = tasks.map((t) => t.id);
    const newOnes = newTasks.filter((t) => !previousIds.includes(t.id));

    if (newOnes.length > 0) {
      setLastAddedId(newOnes[newOnes.length - 1].id);
    } else {
      setLastAddedId(null);
    }

    setTasks(newTasks);
  }, []); // ✅ tableau vide pour n'appeler qu'au montage

  const toggleComplete = (task: ITodo) => {
    const updatedTask = { ...task, completed: !task.completed };
    updateTask(updatedTask);
    setTasks(getStoredTodos());
  };

  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const incompleteCount = tasks.filter((t) => !t.completed).length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-400 px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-gray-200 rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/"
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
          >
            Retour à l&apos;accueil
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Liste des tâches</h1>
          <Link
            href="/createtask"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Créer une nouvelle tâche
          </Link>
        </div>

        <div className="mb-6 flex justify-center gap-6 text-gray-700">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="filter"
              value="all"
              checked={filter === "all"}
              onChange={() => setFilter("all")}
            />
            Toutes ({totalTasks})
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="filter"
              value="incomplete"
              checked={filter === "incomplete"}
              onChange={() => setFilter("incomplete")}
            />
            En cours ⏳({incompleteCount})
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="filter"
              value="completed"
              checked={filter === "completed"}
              onChange={() => setFilter("completed")}
            />
            Terminées ✅ ({completedCount})
          </label>
        </div>

        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-center">Aucune tâche à afficher.</p>
        ) : (
          <table className="min-w-full table-auto border border-gray-300 bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-center">
                <th className="p-3 border-b">Tâche</th>
                <th className="p-3 border-b">Statut</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredTasks.map((task) => (
                  <motion.tr
                    key={task.id}
                    initial={task.id === lastAddedId ? { opacity: 0, y: -10 } : false}
                    animate={task.id === lastAddedId ? { opacity: 1, y: 0 } : false}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50 text-center"
                  >
                    <td className="p-3 border-b">
                      <span
                        className={`font-medium ${
                          task.completed ? "line-through text-gray-400" : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </span>
                    </td>
                    <td className="p-3 border-b">
                      <span
                        onClick={() => toggleComplete(task)}
                        className={`cursor-pointer font-semibold px-2 py-1 rounded-full text-sm ${
                          task.completed
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                        title="Cliquer pour changer le statut"
                      >
                        {task.completed ? "Terminé" : "En cours"}
                      </span>
                    </td>
                    <td className="p-3 border-b">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => router.push(`/updatetask?id=${task.id}`)}
                          className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                        >
                          Éditer
                        </button>
                        <button
                          onClick={() => router.push(`/deletetask?id=${task.id}`)}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition duration-300 cursor-pointer"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => router.push("/delete-all-tasks")}
            disabled={tasks.length === 0}
            className={`px-4 py-2 rounded-lg  
              ${tasks.length === 0
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700 cursor-pointer"}`}
          >
            🗑 Supprimer toutes les tâches
          </button>
        </div>
      </div>
    </div>
  );
}
