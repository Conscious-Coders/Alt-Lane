import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import './Messages.css'
import ReactEmoji from 'react-emoji'

const Messages = ({messages, name}) => (
    <ScrollToBottom className="messages">
        
        {messages.map((message, i) => 
        <div key={i} className={`message-item ${ message.ownedByCurrentUser ? "my-message" : "received-message"}`}>
           <div>
           { message.ownedByCurrentUser === true ? (
            <div>
            <div className="messageContainer justifyEnd">
            <p className="sentText pr-10"></p>
            <div className="messageBox backgroundGradient">
            <p className="messageText colorWhite">{message.body }</p>
            </div>
            </div>
            </div>) : (
            <div>
                <div className="messageContainer justifyStart" >
                <div className="messageBox backgroundLight">
                <p className="messageText colorDark">{ReactEmoji.emojify(message.body )}</p>
                </div>
                </div>

            </div>)
            }
           </div>

        </div>)}
    </ScrollToBottom>

)

export default Messages;