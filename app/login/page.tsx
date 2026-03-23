"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface LoginForm {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-around py-32 px-16 bg-white dark:bg-black sm:items-start">

        {/* Card */}
        <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-lg shadow-md p-8 m-auto items-center">
          <h1 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Log In
          </h1>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email
              </label>
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

            {/* Password */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-xs text-violet-600 hover:text-violet-500 transition"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  autoComplete="current-password"
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    if (errors.password)
                      setErrors({ ...errors, password: undefined });
                  }}
                  className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-400 outline-none transition focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                    errors.password
                      ? "border-red-500"
                      : "border-zinc-300 dark:border-zinc-700"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition text-sm"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
              {errors.password && (
                <span className="text-xs text-red-500">{errors.password}</span>
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