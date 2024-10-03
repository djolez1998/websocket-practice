import React, { useState, useEffect, useContext } from 'react';
import socket from '../utils/socket';
import axiosInstance from '../utils/axiosInstance';
import { AuthContext } from '../context/AuthContext';

const Chat = () => {
  const { token } = useContext(AuthContext);
  const [rooms, setRooms] = useState(['General', 'Random']);
  const [currentRoom, setCurrentRoom] = useState('General');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const username = localStorage.getItem('username')

  useEffect(() => {
    if (token) {
      socket.emit('joinRoom', { room: currentRoom });
    }

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, [currentRoom, token]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(`/chat/messages/${currentRoom}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [currentRoom, token]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chatMessage', { room: currentRoom, message, user: username }); 
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat Room: {currentRoom}</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}</strong>: {msg.message} <em>{new Date(msg.time).toLocaleTimeString()}</em>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Unesi poruku..."
      />
      <button onClick={sendMessage}>Pošalji</button>
    </div>
  );
};

export default Chat;
