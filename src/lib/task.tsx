'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  DocumentData,
  WithFieldValue,
  UpdateData,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "./auth";
import { db } from "./firebase";
import toast from "react-hot-toast";

export interface Task {
  id: string;
  title: string;
  description?: string;
  category?: string;
  completed?: boolean;
  createdAt?: any;
  userId: string;
}


interface TasksContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (taskData: Omit<Task, "id" | "userId">) => Promise<void>;
  updateTask: (taskId: string, updates: UpdateData<DocumentData>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);


export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "tasks"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasksData: Task[] = [];
        querySnapshot.forEach((docSnap) => {
          tasksData.push({
            id: docSnap.id,
            ...(docSnap.data() as Omit<Task, "id">),
          });
        });
        setTasks(tasksData);
        setLoading(false);
      });

      return unsubscribe;
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [user]);

  const addTask = async (taskData: Omit<Task, "id" | "userId">) => {
    if (!user) return;

    const addPromise = addDoc(collection(db, "tasks"), {
      ...taskData,
      userId: user.uid,
      createdAt: serverTimestamp(),
      completed: taskData.completed || false,
    } as WithFieldValue<DocumentData>);

    toast.promise(
      addPromise,
      {
        loading: 'Adding task...',
        success: `Task "${taskData.title}" added successfully! 🎉`,
        error: 'Failed to add task. Please try again.',
      }
    );

    try {
      await addPromise;
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const updateTask = async (
    taskId: string,
    updates: UpdateData<DocumentData>
  ) => {
    const task = tasks.find(t => t.id === taskId);
    const isCompletingTask = updates.completed === true && task?.completed === false;
    const isUncompletingTask = updates.completed === false && task?.completed === true;

    const updatePromise = updateDoc(doc(db, "tasks", taskId), updates);

    let successMessage = 'Task updated successfully! ✨';
    if (isCompletingTask) {
      successMessage = `Task completed! Great job! 🎉`;
    } else if (isUncompletingTask) {
      successMessage = `Task marked as incomplete 📝`;
    }

    toast.promise(
      updatePromise,
      {
        loading: 'Updating task...',
        success: successMessage,
        error: 'Failed to update task. Please try again.',
      }
    );

    try {
      await updatePromise;
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    const deletePromise = deleteDoc(doc(db, "tasks", taskId));

    toast.promise(
      deletePromise,
      {
        loading: 'Deleting task...',
        success: `Task "${task?.title || 'Task'}" deleted successfully! 🗑️`,
        error: 'Failed to delete task. Please try again.',
      }
    );

    try {
      await deletePromise;
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };


  const value: TasksContextType = {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
