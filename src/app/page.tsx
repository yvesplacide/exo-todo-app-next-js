export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-400 flex items-center justify-center p-4">
      <div className="bg-gray-50 shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Bienvenue sur la Todo App 📝
        </h1>
        <ul className="space-y-4">
          <li>
            <a
              href="/createtask"
              className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              ➕ Créer une tâche
            </a>
          </li>
          <li>
            <a
              href="/task"
              className="inline-block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              📋 Voir les tâches
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
