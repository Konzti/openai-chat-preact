import { messagesContext } from "@/context/messagesContext"
import { useContext } from "preact/hooks"

export const useMessages = () => {
  const { messages, postMessage, removeMessage, isThinking } =
    useContext(messagesContext)
  return { messages, postMessage, removeMessage, isThinking }
}
