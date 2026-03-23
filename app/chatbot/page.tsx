// "use client";
// import Image from "next/image";
// import bot from "../../public/bot-avatar.png";
// import React from "react";
// import { askBot } from "@/service/bot_api";

// export default function Chatbot() {
//   const [question, setQusetion] = React.useState("")
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setQusetion(event.target.value);
//   }
//   const handleSubmit = async() => {
//     console.log(question);
//     await askBot({query : question})
    
//   }
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-around py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <div className="flex flex-row items-center gap-6 text-center sm:items-start sm:text-left">
//           <Image
//           src={bot}
//           alt="bot logo"
//           width={100}
//           height={20}
//           priority
//           justify-content="center"
//         />
//         <div className="flex flex-col">
//           <h1 className="max-w-xxs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             Hi, I'm BOT MS - your AI assistant.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             How can I help you?
//           </p>
//         </div>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row justify-around w-full">
//           <input
//             type="text"
//             placeholder="Ask me anything..."
//             onChange={handleChange}
//             className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
//           />
//           <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={handleSubmit}>
//             Send
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Send } from "lucide-react";
import ChatMessage from "../components/ui/ChatMessage";
import TypingIndicator from "../components/TypingIndicator";
import { askBot } from "@/service/bot_api";
import bot from "../../public/bot-avatar.png";

type Msg = { role: "user" | "assistant"; content: string };

export default function Home() {
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = input.trim();

    if (!trimmed || isLoading) return;

    const userMsg: Msg = { role: "user", content: trimmed };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await askBot({query : trimmed}) ;
      console.log(response);
      

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-4 bg-card border-b border-border shadow-sm">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
          <Image
            src={bot}
            alt="BOT MS"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>

        <div>
          <h1 className="text-lg font-semibold text-foreground">BOT MS</h1>
          <p className="text-xs text-muted-foreground">AI Assistant • Online</p>
        </div>

        <div className="ml-auto w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
      </header>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4">
            <Image
              src={bot}
              alt="BOT MS"
              width={96}
              height={96}
              className="object-contain"
            />

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Hi, I'm BOT MS
              </h2>

              <p className="text-muted-foreground mt-1">
                Your AI assistant. How can I help you today?
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}

        {isLoading && <TypingIndicator />}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 bg-card border-t border-border"
      >
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="rounded-xl h-12 w-12 p-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
