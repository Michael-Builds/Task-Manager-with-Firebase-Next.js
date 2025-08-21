'use client'
import { useState, useEffect } from "react";
import Head from "next/head";
import { useAuth } from "@/lib/auth";
import { useTasks } from "@/lib/task";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Clock,
  Plus,
  Filter,
  LogOut,
  User,
  Sparkles,
  Target,
  TrendingUp,
  Calendar
} from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { tasks, addTask, updateTask, deleteTask, loading } = useTasks();
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const todayTasks = tasks.filter(task => {
    const today = new Date().toDateString();
    const taskDate = task.createdAt?.toDate ? task.createdAt.toDate().toDateString() : '';
    return taskDate === today;
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Head>
        <title>Dashboard | TaskFlow</title>
      </Head>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/10 to-pink-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-indigo-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <header className="relative z-10 bg-white/80 backdrop-blur-lg border-b border-white/50 shadow-sm">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-blue-500 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
              </div>
              <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
              <div className="hidden sm:flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-600">Welcome back!</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-gray-50/50 rounded-xl">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700 font-medium">
                  {user.email?.split('@')[0] || 'User'}
                </span>
              </div>

              <button
                onClick={logout}
                className="flex md:cursor-pointer items-center space-x-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-sm text-gray-700 font-medium hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-300 shadow-sm"
              >
                <LogOut className="w-4 h-4 text-red-600" />
                <span className="hidden sm:inline text-red-600">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900">{tasks.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-orange-600">{pendingTasks}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-3xl font-bold text-purple-600">{todayTasks}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Add New Task</h2>
                  <button
                    onClick={() => setShowTaskForm(!showTaskForm)}
                    className="lg:hidden flex items-center justify-center w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
                  >
                    <Plus className={`w-5 h-5 transition-transform duration-300 ${showTaskForm ? 'rotate-45' : ''}`} />
                  </button>
                </div>
              </div>

              <div className={`transition-all duration-300 overflow-hidden ${showTaskForm || window.innerWidth >= 1024 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} lg:max-h-screen lg:opacity-100`}>
                <div className="p-6">
                  <TaskForm onAddTask={addTask} />
                </div>
              </div>
            </div>
          </div>

          {/* Task List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
              {/* Task List Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-6 h-6 text-indigo-600" />
                    <h2 className="text-xl font-bold text-gray-800">Your Tasks</h2>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {tasks.length}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="px-4 py-2 bg-gray-50/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 text-sm font-medium"
                    >
                      <option value="">All Categories</option>
                      <option value="Personal">Personal</option>
                      <option value="Work">Work</option>
                      <option value="Study">Study</option>
                      <option value="Health">Health</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Task List Content */}
              <div className="min-h-96">
                {loading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                      <p className="text-gray-600 font-medium">Loading your tasks...</p>
                    </div>
                  </div>
                ) : tasks.length === 0 ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="text-center space-y-4 max-w-md">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                        <Plus className="w-8 h-8 text-indigo-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">No tasks yet</h3>
                      <p className="text-gray-600">Get started by adding your first task. You've got this! 🚀</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <TaskList
                      tasks={tasks}
                      onUpdateTask={updateTask}
                      onDeleteTask={deleteTask}
                      filter={filter}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}