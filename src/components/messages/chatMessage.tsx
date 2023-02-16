import BotMessage from "./botMessage"
import userImg from "@/assets/user.png"
import { DeleteOutlined } from "@ant-design/icons"
import { useMessages } from "@/hooks/useMessages"

type ChatMessageProps = {
  id: string
  isAi: boolean
  text: string
}

const ChatMessage = ({ id, isAi, text }: ChatMessageProps) => {
  const { removeMessage } = useMessages()

  return (
    <div id={id} className="flex mb-3 last:mb-0 relative">
      {isAi ? (
        <BotMessage text={text} />
      ) : (
        <div className="w-full bg-slate-700 text-white p-3 rounded-md flex gap-2">
          <img
            src={userImg}
            alt="user"
            className="w-8 h-8 p-1 bg-slate-200 rounded-full"
          />
          {text}
        </div>
      )}
      <button
        className="absolute top-3 right-3 w-8 h-8 p-1 rounded-full cursor-pointer bg-red-200 text-red-700 grid place-items-center"
        aria-label="delete"
        title="delete"
        onClick={() => removeMessage(id)}
      >
        <DeleteOutlined />
      </button>
    </div>
  )
}

export default ChatMessage
