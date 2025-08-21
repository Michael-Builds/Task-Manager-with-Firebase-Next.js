import { useState } from "react";

interface Task {
  title: string;
  category: string;
  completed: boolean;
  createdAt: string;
}

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({
        title: title.trim(),
        category,
        completed: false,
        createdAt: new Date().toISOString(),
      });
      setTitle("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-3 items-stretch bg-white shadow-md rounded-xl p-4"
    >
      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Study">Study</option>
        <option value="Health">Health</option>
        <option value="Other">Other</option>
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        Add Task
      </button>
    </form>
  );
}
