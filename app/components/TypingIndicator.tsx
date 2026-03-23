import botAvatar from "../../public/BOT.png";

const TypingIndicator = () => (
  <div className="flex gap-3 items-end">
    <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center overflow-hidden bg-card border border-border">
      <img src={`${botAvatar}`} alt="BOT MS" className="w-7 h-7 object-contain" />
    </div>
    <div className="bg-chat-bot px-4 py-3 rounded-2xl rounded-bl-md">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  </div>
);

export default TypingIndicator;