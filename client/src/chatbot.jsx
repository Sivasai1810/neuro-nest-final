//peding need to store the history in the datebase
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Close from './assets/close.png'
export default function ChatBot() {
  const navigate=useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("https://neuro-nest.onrender.com/gemini", {
        message: input,
      });

      setMessages([...newMessages, { sender: "bot", text: res.data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { sender: "bot", text: "API error!" }]);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat with Bot</h2>
      <div
        style={{
          border: "1px solid gray",
          height: "300px",
          padding: "10px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <b>{msg.sender}:</b> {msg.text}  
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message..."
        style={{ width: "80%", padding: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px 20px", marginLeft: "10px" }}>
        Send
      </button>
      <div className="closebar">
        <img src={Close} alt="Close" onClick={()=>navigate('/Profile')} />
      </div>
    </div>
  );
}

