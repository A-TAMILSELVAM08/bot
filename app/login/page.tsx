"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface LoginForm {
  email: string;
  userName: string;
}

interface FormErrors {
  email?: string;
  userName?: string;
}

export default function Login() {
  const [form, setForm] = useState<LoginForm>({ email: "", userName: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const validation = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.userName){
      newErrors.userName = "UserName is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validation()) return;
    setLoading(true);
    try {
      // Replace with your actual login API call
      await new Promise((res) => setTimeout(res, 1500));
      console.log("Login with:", form);
      router.push("/home");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-5xl flex-col items-center justify-around py-32 px-16 bg-white dark:bg-black sm:items-start">

        {/* Card */}
        <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-lg shadow-md p-8 m-auto items-center">
          <h1 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Log In
          </h1>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email
              </label>
              </div>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                autoComplete="email"
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                className={`w-full rounded-lg border px-3 py-2 text-sm bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-400 outline-none transition focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                  errors.email
                    ? "border-red-500"
                    : "border-zinc-300 dark:border-zinc-700"
                }`}
              />
              {errors.email && (
                <span className="text-xs text-red-500">{errors.email}</span>
              )}
            </div>

            {/* UserName */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="userName"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  UserName
                </label>
              </div>
              <div className="relative">
                <input
                  id="userName"
                  value={form.userName}
                  autoComplete="current-userName"
                  onChange={(e) => {
                    setForm({ ...form, userName: e.target.value });
                    if (errors.userName)
                      setErrors({ ...errors, userName: undefined });
                  }}
                  className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-400 outline-none transition focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                    errors.userName
                      ? "border-red-500"
                      : "border-zinc-300 dark:border-zinc-700"
                  }`}
                />
              </div>
              {errors.userName && (
                <span className="text-xs text-red-500">{errors.userName}</span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              ) : (
                "Sign In"
              )}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}
