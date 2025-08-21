'use client';

import { useAuth } from "@/lib/auth";
import Head from "next/head";
import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import { LogOut, CheckCircle, Sparkles, User } from "lucide-react";

type AuthMode = "login" | "register";

export default function Home() {
  const { user, logout } = useAuth();
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
        <Head>
          <title>Cloud To-Do App</title>
          <meta name="description" content="Cloud-based to-do application" />
        </Head>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-300/10 to-indigo-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center space-y-8">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-blue-500 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 max-w-2xl w-full space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
            <p className="text-gray-600">You are now logged in.</p>

            <div className="grid gap-6">
              <a
                href="/dashboard"
                className="block rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-xl transition bg-white/90 backdrop-blur-sm"
              >
                <h2 className="text-xl font-semibold">Go to Dashboard →</h2>
                <p className="text-gray-500">
                  Access your to-do list and manage your tasks.
                </p>
              </a>

              <button
                onClick={logout}
                className="flex mt-4 md:cursor-pointer items-center justify-center space-x-2 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition shadow"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
      <Head>
        <title>Cloud To-Do App | Login</title>
        <meta name="description" content="Cloud-based to-do application" />
      </Head>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-300/10 to-indigo-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center space-y-8">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <CheckCircle className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-blue-500 bg-clip-text text-transparent">
            TaskFlow
          </h1>
        </div>
        <p className="text-gray-600">
          Sign in or create an account to get started
        </p>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 py-10 px-6 w-full max-w-xl space-y-6">
          {/* Tabs */}
          <div className="flex justify-center p-1 space-x-2 bg-blue-500 rounded-full">
            <button
              className={`px-4 md:cursor-pointer py-2 rounded-full w-full font-medium transition ${
                authMode === "login"
                  ? "bg-white text-blue-600 shadow"
                  : "bg-transparent text-white"
              }`}
              onClick={() => setAuthMode("login")}
            >
              Login
            </button>
            <button
              className={`px-4 md:cursor-pointer py-2 rounded-full w-full font-medium transition ${
                authMode === "register"
                  ? "bg-white text-blue-600 shadow"
                  : "bg-transparent text-white"
              }`}
              onClick={() => setAuthMode("register")}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <AuthForm mode={authMode} />
        </div>
      </main>
    </div>
  );
}
