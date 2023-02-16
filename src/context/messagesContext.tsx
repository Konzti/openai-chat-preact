/* eslint-disable no-unused-vars */
import { ComponentChildren, createContext } from "preact"
import { useEffect, useState } from "preact/hooks"
import { get, set } from "idb-keyval"

import { Message } from "@/types"
import { mockMessages } from "@/data/messages"
import { MESSAGES_KEY } from "@/constants"
import { generateRandomId, makeApiRequest } from "@/helpers"

type MessagesContextData = {
  messages: Message[]
  postMessage: (prompt: string) => Promise<void>
  removeMessage: (id: string) => void
  isThinking: boolean
}
export const messagesContext = createContext({} as MessagesContextData)

export const MessagesProvider = ({
  children,
}: {
  children: ComponentChildren
}) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [isThinking, setIsThinking] = useState<boolean>(false)

  const updateMessages = (messages: Message[]) => {
    set(MESSAGES_KEY, messages)
  }
  const addMessage = (message: Message) => {
    setMessages((messages) => [...messages, message])
  }
  const removeMessage = (id: string) => {
    setMessages((messages) => messages.filter((message) => message.id !== id))
  }
  const postMessage = async (prompt: string) => {
    let newMessage: Message = {
      id: generateRandomId(),
      isAi: false,
      text: prompt,
    }
    addMessage(newMessage)
    setIsThinking(true)
    let aiMessage = await makeApiRequest(prompt)
    setIsThinking(false)
    addMessage(aiMessage)
  }

  useEffect(() => {
    get<Message[]>(MESSAGES_KEY).then((result) => {
      if (result) {
        setMessages(result)
      }
    })
  }, [])

  useEffect(() => {
    updateMessages(messages)
  }, [messages])

  return (
    <messagesContext.Provider
      value={{ messages, postMessage, removeMessage, isThinking }}
    >
      {children}
    </messagesContext.Provider>
  )
}
