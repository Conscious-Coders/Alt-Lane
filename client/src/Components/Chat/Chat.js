import React from 'react';
import LoginNav from "../LoginedNavBar"
import Footer from '../Footer'
import queryString from 'query-string';

// import io from 'socket.io-client';
import './Chat.css';
// import  InfoBar from '../InfoBar/InfoBar';
// import  Input from '../Input/Input';
// import Messages from '../Messages/Messages';
import useChat from "../useChat";
// import TextContainer from '../TextContainer/TextContainer'
// let socket;

const Chat = (props, {token}) => {
     console.log(props.match.params)
    const roomId = props.match.params.roomId; //get the roomid from url
    console.log(roomId, "room id??")
    const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = React.useState(""); 
    if(!props.token) {
        throw new Error(`no token provided`)
    }

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
      };
    
    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage("");
    };

    // const [name, setName] = useState('');//{currentLoggedInUser}
    // const [room, setRoom] = useState('');//`message plus ${userfromclickedcard}`
    // const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([]);
    // // const [users, setUsers] = useState('') might not need this.
    // const ENDPOINT = process.env.NODE_ENV === 'production' ? 'http://whateveryourfrontndurlis.com' : 'http://localhost:9000';
    // useEffect(() => {
    //     //const {name, room} = queryString.parse(location.search);
    //     socket = io(ENDPOINT,{
    //         withCredentials: true,
    //         extraHeaders: {
    //            Authorization: `Bearer ${token}`
    //         }
    //     });
    //     // setName(name);
    //     // setRoom(room);
    //     socket.emit('connection', (socket)=>{
    //         console.log('connected')
    //     })
    //     console.log(socket);
    //     socket.emit('join', {name, room}, () => {
            
    //     });

    //     return () => {
    //         socket.emit('disconnect', ()=>{

    //         });

    //         socket.off();
    //     }
    // },[ENDPOINT])

    // useEffect(() => {
    //     socket.on('message', (message)=> {
    //         setMessages(messages => [...messages, message]);
    //     });
    

    //     // socket.on("roomData", ({users}) => {
    //     //     setUsers(users);
    //     // });
    //      }, []);
    // //function for sending messages

    // const sendMessage = (e) => {
    //     e.preventDefault();
    //     if(message){
    //         socket.emit('sendMessage', message, () => setMessage(''));
    //     }
    // }
    // console.log(message, messages);
    return (
       <div>
        <LoginNav/>
        <div className="outerContainer">
        
        <div className="innerChatContainer">
        <h1 className="room-name">Room: {roomId}</h1>
        <div className="messages-container">
            <ol className="messages-list">
            {messages.map((message, i) => (
                <li
                key={i}
                className={`message-item ${
                    message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
                >
                {message.body}
                </li>
            ))}
            </ol>
        </div>
        <textarea
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Write message..."
            className="new-message-input-field"
        />
        <button onClick={handleSendMessage} className="send-message-button">
            Send
        </button>
            {/* <InfoBar room={roomId}/>
            <Messages messages={messages} name={name}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/> */}
        </div>
        
        </div> 
            <Footer/>
       </div>
       
    )
}

export default Chat;