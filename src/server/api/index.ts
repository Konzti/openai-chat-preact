import { Router } from "express"
import { Configuration, OpenAIApi } from "openai"
import dotenv from "dotenv"

dotenv.config()

const API_KEY = process.env.API_KEY

const configuration = new Configuration({
  apiKey: API_KEY,
})
const openai = new OpenAIApi(configuration)

const api = Router()

api.post("/prompt", async (req, res) => {
  const { prompt } = req.body

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" })
  }

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 2000,
      temperature: 0,
    })
    const text = response.data.choices[0].text

    if (!text) {
      return res.status(400).json({ error: "No text found" })
    }

    res.json({ text })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ error: "Something went wrong" })
  }
})

export { api }
