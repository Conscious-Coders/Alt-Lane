import React from "react";
import LoginNav from "../LoginedNavBar";
import Footer from "../Footer";
import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Messages from "../Messages/Messages";
import useChat from "../useChat";

const Chat = (props) => {
  const name = props.match.params.name;
  const roomId = props.match.params.roomId; // get the roomid from url
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState("");

  if (!props.token) {
    throw new Error("no token provided");
  }

  const handleNewMessageChange = (event) => {
    event.preventDefault();
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div>
      <LoginNav />
      <div className="chatAnimPlane d-flex justify-content-around align-items-center">
        <img src="../dm.gif" alt="plane left" />
        <h2>Chat Room</h2>
        <img src="../dmRight.gif" alt="plane right" />
      </div>
      <div className="outerContainer d-flex align-items-start ">
        <div className="chatAnim d-flex  justify-content-start col-3 align-items-center">
          <img src="../threePeople.gif" alt="people waving" />
        </div>
        <div className="innerChatContainer col-6">
          <InfoBar room={roomId} />
          <Messages messages={messages} name={name} user={props.user} />
          <div className="formChat">
            <input
              className="inputChat text"
              value={newMessage}
              onChange={handleNewMessageChange}
              placeholder="Write message..."
            />
            <button
              onClick={handleSendMessage}
              className="sendButton"
              style={{
                background: "linear-gradient(345deg, #A0AAE7 40%, #BA92F3 90%)",
              }}
            >
              Send
            </button>
          </div>
        </div>
        <div className="chatAnim d-flex justify-content-end col-3">
          <img src="../mentoring.gif" alt="people waving" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
