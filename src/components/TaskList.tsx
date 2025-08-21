import { useState } from "react";

interface Task {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  createdAt: string;
}

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  filter?: string;
}

export default function TaskList({
  tasks,
  onUpdateTask,
  onDeleteTask,
  filter,
}: any) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const filteredTasks = filter
    ? tasks.filter((task:any) => task.category === filter)
    : tasks;

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditCategory(task.category);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditCategory("");
  };

  const saveEditing = () => {
    if (editTitle.trim() && editingId) {
      onUpdateTask(editingId, {
        title: editTitle.trim(),
        category: editCategory,
      });
      cancelEditing();
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No tasks yet. Add one above!
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No tasks in this category.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {filteredTasks.map((task:any) => (
        <li
          key={task.id}
          className="flex flex-col md:flex-row md:items-center justify-between bg-white shadow-sm rounded-lg p-3 border border-gray-200"
        >
          {editingId === task.id ? (
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Study">Study</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </select>
              <div className="flex gap-2">
                <button
                  onClick={saveEditing}
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    onUpdateTask(task.id, { completed: !task.completed })
                  }
                  className="h-4 w-4 text-blue-600"
                />
                <div className="flex flex-col">
                  <span
                    className={`${
                      task.completed ? "line-through text-gray-400" : "text-gray-800"
                    } font-medium`}
                  >
                    {task.title}
                  </span>
                  <span className="text-xs text-gray-500">{task.category}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => startEditing(task)}
                  disabled={task.completed}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
