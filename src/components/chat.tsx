import { useCallback, useEffect, useRef, useState } from "preact/hooks"

import { useMessages } from "@/hooks/useMessages"
import ChatMessage from "@/components/messages/chatMessage"
import TypingMessage from "./messages/typingMessage"

const Chat = () => {
  const { messages, postMessage, isThinking } = useMessages()
  const [prompt, setPrompt] = useState<string>("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const submit = useCallback(async () => {
    if (prompt.trim().length < 2) return
    setPrompt("")
    await postMessage(prompt)
  }, [prompt, postMessage])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  return (
    <div className="flex flex-col w-full h-screen max-w-[800px] mx-auto">
      <div className="h-[10vh] bg-primaryDark sticky top-0 z-50 flex items-center justify-between px-3">
        <h1 className="text-2xl py-3 text-white">AI Chat</h1>
      </div>

      <div className="flex-1 p-3 bg-green-200 overflow-auto w-full">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            id={message.id}
            isAi={message.isAi}
            text={message.text}
          />
        ))}
        {isThinking ? <TypingMessage /> : null}
        <div ref={messagesEndRef} />
      </div>
      <div className="mb-3 mt-auto shrink-0 flex gap-3 p-3">
        <input
          className="text-black w-full px-3 rounded-lg"
          type="text"
          name="prompt"
          value={prompt}
          autocomplete="off"
          onInput={(e) => {
            setPrompt(e.currentTarget.value)
          }}
        />
        <button
          type="button"
          disabled={isThinking || prompt.trim().length < 2}
          className="p-3 bg-blue-600 text-white rounded-lg w-14 disabled:bg-gray-500 hover:bg-blue-700"
          onClick={submit}
        >
          chat
        </button>
      </div>
    </div>
  )
}

export default Chat
