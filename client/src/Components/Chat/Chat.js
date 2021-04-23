import React from 'react';
import LoginNav from "../LoginedNavBar"
import Footer from '../Footer'
import './Chat.css';
import  InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import useChat from "../useChat";

const Chat = (props, {token}) => {
    console.log(props)
    const name = props.match.params.name;
    const roomId = props.match.params.roomId; //get the roomid from url
    const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = React.useState(""); 
   
    if(!props.token) {
        throw new Error(`no token provided`)
    }

    const handleNewMessageChange = (event) => {
        event.preventDefault()
        setNewMessage(event.target.value);
      };
    
    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage("");
    };
    console.log(props.user)
    return (
       <div>
          <LoginNav/>
          <div className="outerContainer">
          
              <div className="innerChatContainer">
                  <InfoBar room = {roomId}/>
              
                  <Messages messages={messages} name={name} user={props.user}  />
              <div className="formChat">
                  <input
                  className='inputChat text'
                  value={newMessage}
                  onChange={handleNewMessageChange}
                  placeholder="Write message..."
              />
              <button onClick={handleSendMessage} className="sendButton" style={{background:"linear-gradient(345deg, #A0AAE7 40%, #BA92F3 90%)"}}>
                  Send
              </button>
              </div>
              </div>
          
          </div> 
          <Footer/>
       </div>
       
    )
}

export default Chat;