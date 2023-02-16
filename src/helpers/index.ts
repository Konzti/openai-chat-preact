/* eslint-disable no-unused-vars */
import { API_ENDPOINT, BASE_URL } from "./../constants/index"
import { AiResponse, Message } from "@/types"

export const generateRandomId = () => {
  const timestamp = Date.now()
  const random = Math.random().toString(8)
  return `id-${timestamp}${random}`
}

export const makeApiRequest = async (prompt: string): Promise<Message> => {
  try {
    const res: Response = await fetch(BASE_URL + API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    })
    const data: AiResponse = await res.json()
    let aiMessage: Message = {
      id: generateRandomId(),
      isAi: true,
      text: data.text,
    }
    return aiMessage
  } catch (error) {
    console.log(error)
    let errorMessage: Message = {
      id: generateRandomId(),
      isAi: true,
      text: "dang, something went wrong",
    }
    return errorMessage
  }
}
