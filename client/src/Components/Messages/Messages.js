import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import './Messages.css'
import ReactEmoji from 'react-emoji'

const Messages = ({messages, name, user}) => (
    <ScrollToBottom className="messages" debug={false}>
        
        {messages.map((message, i) => 
        <div key={i} className={`message-item ${ message.ownedByCurrentUser ? "my-message" : "received-message"}`}>
           <div>
           { message.ownedByCurrentUser === true ? (
            <div>
                <div className="nameMessage justifyEnd">
                <p className="sentText">{user}</p>
                </div>    
                
            <div className="messageContainer justifyEnd">
              
                <div className="messageBox backgroundGradient">
                    <p className="messageText colorWhite">{message.body }</p>
                </div>
            </div>
           
          
            </div>) : (
            <div>
                 <div className=" nameMessage justifyStart">
                    <p className="sentText .pl-10 ">{name}</p>
                </div> 
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