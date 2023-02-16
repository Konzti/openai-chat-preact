import { useEffect, useRef, useState } from "preact/hooks"
import botImg from "@/assets/bot.png"

type BotMessageProps = {
  text: string
}

const BotMessage = ({ text }: BotMessageProps) => {
  const [typedText, setTypedText] = useState<string>("")
  const indexRef = useRef<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (text.length > indexRef.current) {
        setTypedText((prev) => (prev += text.charAt(indexRef.current)))
        indexRef.current++
      }
    }, 30)
    return () => {
      clearInterval(interval)
    }
  }, [text])

  return (
    <div className="w-[100%] break-words whitespace-pre-wrap leading-7 bg-stone-800 text-stone-200 p-3 rounded-md flex gap-2">
      <img
        src={botImg}
        alt="bot"
        className="w-8 h-8 p-1 bg-slate-400 rounded-full"
      />
      {typedText}
    </div>
  )
}

export default BotMessage
