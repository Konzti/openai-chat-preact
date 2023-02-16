import botImg from "@/assets/bot.png"

const TypingMessage = () => {
  return (
    <div className="w-[100%] break-words leading-7 bg-stone-800 text-stone-200 p-3 rounded-md flex items-center gap-2">
      <img
        src={botImg}
        alt="bot"
        className="w-8 h-8 p-1 bg-slate-400 rounded-full"
      />
      <div className="flex gap-1 animate-pulse">
        <div className="h-2 w-2 bg-white rounded-full" />
        <div className="h-2 w-2 bg-white rounded-full" />
        <div className="h-2 w-2 bg-white rounded-full" />
      </div>
    </div>
  )
}

export default TypingMessage
