import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:2022");

export default function Dashboard() {
  const userid = localStorage.getItem("userId");
  const [uservalue, setUservalue] = useState(""); 
  const roomId = userid.substring(2, 7); 
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isModelOpened, setIsModelOpened] = useState(false);
  const [isOpened, setOpened] = useState(false);

  const createRoom = () => {
    socket.emit("join_room", roomId);
    alert("Room created successfully");
  };

  const joinRoom = () => {
    if (uservalue) {
      socket.emit("join_room", uservalue);
      alert("Joined room successfully");
    } else {
      alert("Please enter a Room ID");
    }
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    socket.emit("send_message", {
      room: uservalue || roomId,
      messages: message,
      senderid: roomId,
    });

    setMessage("");
  };

  useEffect(() => {
    const handleMessage = (data) => {
      setChat((prevChat) => [...prevChat, { senderid: data.senderid, message: data.message }]);
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, []);

  return (
    <div>
      <div className="container-box">
        <button onClick={() => setIsModelOpened(true)}>Create Room</button>
        {isModelOpened && (
          <div className="model-overlap">
            <div className="model-content">
              <p>Copy the ID to invite your friends</p>
              <p>Room ID: <b>{roomId}</b></p>
              <button onClick={createRoom}>Start Room</button>
              <button className="button" onClick={() => setIsModelOpened(false)}>Close</button>
            </div>
          </div>
        )}
      </div>

      <div className="container-box">
        <button onClick={() => setOpened(true)}>Join Room</button>
        {isOpened && (
          <div className="model-overlap">
            <div className="model-content">
              <input
                type="text"
                placeholder="Enter Room ID"
                value={uservalue}
                onChange={(e) => setUservalue(e.target.value)}
              />
              <button onClick={joinRoom}>Join</button>
              <button className="button" onClick={() => setOpened(false)}>Close</button>
            </div>
          </div>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div>
        {chat.map((item, index) => (
          <p key={index}>
            <strong>{item.senderid}:</strong> {item.message}
          </p>
        ))}
      </div>
    </div>
  );
}
