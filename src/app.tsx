import Chat from "./components/chat"
import { MessagesProvider } from "./context/messagesContext"

const App = () => {
  return (
    <MessagesProvider>
      <Chat />
    </MessagesProvider>
  )
}

export default App
