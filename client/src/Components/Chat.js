import React from 'react';
import { io } from 'socket.io-client'

const socket = io('http://localhost:9000')

function Chat() {
    const [userMessage, setUserMessage] = React.useState('')
    const [messages, setMessages] = React.useState([])

    socket.on('new message', (data) => {
        console.log(data)
        setMessages([...messages, data])
    })

    function handleSubmit(event) {
        event.preventDefault()

        socket.emit('incoming-message', userMessage)

        setMessages([...messages, userMessage])
        setUserMessage('')
    }

    return (
        <div>
            <h2>Chat</h2>
            <div>
                <ul>
                    {messages.map(message => (
                        <li key={message}>{message}</li>
                    ))}
                </ul>
            </div>

            <form onSubmit={handleSubmit}>
                <textarea value={userMessage} onChange={(event) => setUserMessage(event.target.value)}></textarea>
                <button type="submit">Send Message</button>
            </form>
           
        </div>
    )
}

export default Chat;