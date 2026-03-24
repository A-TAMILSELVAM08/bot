import Login from "./login/page";

export default function Page() {
  return (
    
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-row items-center justify-around py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center justify-evenly gap-2 text-center w-full">
          <h1 className="max-w-xxs text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Welcome to my AI assistant, BOT MS. Please log in to continue.
          </h1>
        <Login />
        </div>
        </main>
        </div>
  );
}
