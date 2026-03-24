"use client";
import Image from "next/image";
import bot from "../../public/BOT.png";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const router = useRouter()
  const handleSubmit = async(page:string) => {
    router.push(`/${page}`);
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-around py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-row items-center justify-evenly gap-6 text-center w-full">
          <Image
          src={bot}
          alt="bot logo"
          width={100}
          height={20}
          priority
          justify-content="center"
        />
        <div className="flex flex-col">
          <h1 className="max-w-xxs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Hi, I'm BOT MS - your AI assistant.
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            
          </p>
        </div>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row justify-around w-full">
          <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={()=>handleSubmit("chatbot")}>
            Click to Chat
          </button>
        </div>
        
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row justify-around w-full">
          <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={()=>handleSubmit("trainbot")}>
            Click to Train
          </button>
        </div>
      </main>
    </div>
  );
}
