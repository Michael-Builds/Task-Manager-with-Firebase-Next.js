import { useState } from "react";
import { useAuth } from "@/lib/auth";


export default function AuthForm({ mode }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "login") {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-transparent rounded-2xl py-6 space-y-4"
    >
      {error && (
        <div className="text-red-600 bg-red-100 p-2 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-gray-700 font-medium text-left">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="password" className="text-gray-700 font-medium text-left">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full md:cursor-pointer mt-4 py-3 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Processing..."
          : mode === "login"
            ? "Sign In"
            : "Create Account"}
      </button>
    </form>
  );
}
